from django.contrib import admin
from user_stuff.models import LikesPerUser


class LikesPerUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')
    filter_horizontal = ('liked_characters',)


admin.site.register(LikesPerUser, LikesPerUserAdmin)
