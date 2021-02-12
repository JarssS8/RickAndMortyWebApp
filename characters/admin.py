from django.contrib import admin

from characters.models import Character


class CharacterAdmin(admin.ModelAdmin):
    list_display = ('api_id', 'name', 'status', 'gender')
    exclude = ['image']


admin.site.register(Character, CharacterAdmin)
