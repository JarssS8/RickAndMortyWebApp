from django.urls import path

from characters.views import characters_list

urlpatterns = [
    path('list', characters_list, name='characters-list'),
]
