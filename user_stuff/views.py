from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

def profile(request):
    def character_detail(request, api_id):
        context = {
            'character': Character.objects.get(pk=api_id),
        }
        return HttpResponse(render(request, 'character_detail_view.html', context=context))

