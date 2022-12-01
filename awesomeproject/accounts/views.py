from django.shortcuts import render
from django.views.generic import CreateView, TemplateView
from accounts.forms import RegisterForm
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
import datetime
# Create your views here.

    
class Login(LoginView):
    template_name = "registration/login.html"
    
    
   
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
                        'greeting' : greeting
                    })