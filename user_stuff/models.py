from django.db import models
from django.contrib.auth.models import User

from characters.models import Character


# Create your models here.
class LikesPerUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    liked_characters = models.ManyToManyField(Character)

    class Meta:
        verbose_name = 'Like'
        verbose_name_plural = 'Likes'

    def __str__(self):
        return f'{self.user} like {self.liked_characters}'
