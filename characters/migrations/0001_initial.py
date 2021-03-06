# Generated by Django 3.1.4 on 2021-02-12 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('api_id', models.IntegerField(primary_key=True, serialize=False, verbose_name='Id on API')),
                ('name', models.CharField(max_length=50, verbose_name='Name')),
                ('status', models.BooleanField(verbose_name='Alive')),
                ('gender', models.CharField(max_length=50, verbose_name='Gender')),
                ('image', models.CharField(max_length=200, verbose_name='Image')),
            ],
            options={
                'verbose_name': 'Character',
                'verbose_name_plural': 'Characters',
                'ordering': ['name'],
            },
        ),
    ]
