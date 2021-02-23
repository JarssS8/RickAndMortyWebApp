from django.urls import path

from characters.views import characters_list, character_detail, load_more_characters, change_characters_sort, \
    get_filter_characters

urlpatterns = [
    path('list', characters_list, name='characters-list'),
    path('detail/<int:api_id>', character_detail, name='character-detail'),
    path('load-more-characters', load_more_characters, name='load-more-characters'),
    path('change-characters-sort', change_characters_sort, name='change-characters-sort'),
    path('get-filter-characters', get_filter_characters, name='get-filter-characters')
]
