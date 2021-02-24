from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect

from .forms import SignUpForm


def signup_view(request):
    form = SignUpForm(request.POST)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return redirect('home')
    return render(request, 'registration/signup.html', {'form': form})


def check_user(request):
    username = request.GET['username']
    user = User.objects.filter(username=username).count()
    data = {
        'exists': (user > 0),
    }
    return JsonResponse(data)
