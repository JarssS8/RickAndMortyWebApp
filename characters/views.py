from django.http import HttpResponse
from django.shortcuts import render
import requests
import math

from .models import Character

characters_url = 'https://rickandmortyapi.com/api/character'


def characters_list(request):
    get_characters()
    return HttpResponse("List of characters")


def get_characters():
    count = requests.get(characters_url).json()['info']['count']
    characters_count = Character.objects.count()
    if characters_count < count:
        page_to_start = math.trunc(characters_count/20) + 1
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
