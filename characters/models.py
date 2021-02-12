from django.db import models


# Create your models here.

class Character(models.Model):
    api_id = models.IntegerField('Id on API', primary_key=True)
    name = models.CharField('Name', max_length=50)
    status = models.BooleanField('Alive')
    gender = models.CharField('Gender', max_length=50)
    image = models.CharField('Image', max_length=200)

    class Meta:
        verbose_name = 'Character'
        verbose_name_plural = 'Characters'
        ordering = ['name']

    def __str__(self):
        return self.name
