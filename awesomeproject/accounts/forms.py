from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from captcha.fields import CaptchaField


class RegisterForm(UserCreationForm):
    email = forms.EmailField(label = "Email")
    fullname = forms.CharField(label = "Введите полное имя")
    captcha = CaptchaField(label = "Проверка на робота")
    class Meta:
        model = User
        fields = ("username", "fullname", "email", )
    
    