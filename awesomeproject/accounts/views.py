import re

from django.shortcuts import render
from django.views.generic import CreateView, TemplateView
from accounts.forms import RegisterForm
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.http import HttpResponse, JsonResponse
import datetime
import json
from django.contrib.auth import authenticate, login, logout

# Create your views here.


class Login(LoginView):
    template_name = "registration/login.html"

def check_logged_in(request):
    if request.user.is_authenticated:
        return JsonResponse([True], safe=False)
    return JsonResponse([False], safe=False)

def log_out(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse([True], safe=False)
    return JsonResponse([False], safe=False)

def login_user(request):
    username = json.loads(request.body)['username']
    password = json.loads(request.body)['password']
    #current_users = User.objects.filter(username=username)
    #if len(current_users) == 0:
    #    return JsonResponse([False], safe=False)
    #result = current_users[0].check_password(password)
    #print(login, password, result)
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse([True], safe=False)
    return JsonResponse([False], safe=False)


def registration(request):
    try:
        json_request_body = json.loads(request.body)
        username = json_request_body['username']
        password1 = json_request_body['password1']
        password2 = json_request_body['password2']
        email = json_request_body['email']
        fullname = json_request_body['fullname']
        if request.method == 'POST':
            if (password1 == password2):
                group = Group.objects.get(name='trainUser')
                user = User.objects.create_user(username, email, password1)
                user.groups.add(group)
                return JsonResponse([True], safe=False)
        return JsonResponse([False], safe=False)
    except:
        return JsonResponse([False], safe=False)


def signup(request):
    if request.method == 'POST':
        user_form = RegisterForm(request.POST)
        if user_form.is_valid():
            # Create a new user object but avoid saving it yet
            new_user = user_form.save(commit=False)
            # Set the chosen password
            new_user.set_password(user_form.cleaned_data['password1'])
            # Save the User object
            new_user.save()
            return render(request, 'registration/profile.html', {'new_user': new_user})
    else:
        user_form = RegisterForm()
    return render(request, 'registration/signup.html', {'user_form': user_form})


@login_required
def profile(request):
    hour = datetime.datetime.now().time().hour
    if hour >= 23 or hour < 5:
        greeting = ('Доброй ночи', 'Почему не спите?')
    elif hour >= 5 and hour < 12:
        greeting = 'Доброе утро'
    elif hour >= 12 and hour < 16:
        greeting = 'Добрый день'
    elif hour >= 16 and hour < 23:
        greeting = 'Добрый вечер'
    else:
        greeting = ''
    return render(request, 'registration/profile.html',
                  {
                      'greeting': greeting
                  })
