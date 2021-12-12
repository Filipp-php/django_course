from django.urls import path, include
from . import views
from accounts.views import Login
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('profile/', views.profile, name="profile"),
    path('login/', Login.as_view(), name = 'login'),
    path('logout/', LogoutView.as_view(template_name = "registration/logout.html"), name = 'logout'),
    path('signup/', views.signup, name='signup'),
]