from django.http import HttpResponse
from django.shortcuts import render
import requests
import math
from django.core import serializers
from django.http import JsonResponse

from .models import Character

characters_url = 'https://rickandmortyapi.com/api/character'
characters_per_page = 12


def character_detail(request, api_id):
    context = {
        'character': Character.objects.get(pk=api_id),
    }
    return HttpResponse(render(request, 'character_detail_view.html', context=context))


def characters_list(request):
    get_new_characters()
    characters = Character.objects.all().order_by('api_id')[:characters_per_page]
    context = {
        'characters': characters,
    }
    return HttpResponse(render(request, 'characters_list_view.html', context=context))


def get_new_characters():
    count = requests.get(characters_url).json()['info']['count']
    characters_count = Character.objects.count()
    if characters_count < count:
        page_to_start = math.trunc(characters_count / 20) + 1
        last_id = Character.objects.order_by('api_id').last().api_id
        pages = requests.get(characters_url).json()['info']['pages']
        for i in range(page_to_start - 1, pages):
            pages = {'page': str(page_to_start)}
            characters = requests.get(characters_url, params=pages).json()['results']
            for character in characters:
                if character['id'] > last_id:
                    character_data = Character(
                        api_id=character['id'],
                        name=character['name'],
                        status=True if character['status'] == 'Alive' else False,
                        gender=character['gender'],
                        image=character['image'],
                    )
                    character_data.save()
            page_to_start = page_to_start + 1


def load_more_characters(request):
    offset = int(request.GET['offset'])
    characters = Character.objects.all().order_by('api_id')[offset:characters_per_page + offset]
    count_characters = Character.objects.count()
    data = {
        'characters': serializers.serialize('json', characters),
        'countCharacters': count_characters
    }
    return JsonResponse(data)
