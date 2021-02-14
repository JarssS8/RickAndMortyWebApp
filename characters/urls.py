from django.urls import path

from characters.views import characters_list, character_detail

urlpatterns = [
    path('list', characters_list, name='characters-list'),
    path('detail/<int:api_id>', character_detail, name='character-detail')
]
