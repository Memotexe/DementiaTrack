from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

"""
This is for when the accounts want to login,logout,register, and for authentication by knox.
It will link to the js that is tailored to the subject of the file, like the login screen or
the register screen.
"""

urlpatterns = [
        path('api/auth', include('knox.urls')),
        path('api/auth/register', RegisterAPI.as_view()),
        path('api/auth/login', LoginAPI.as_view()),
        path('api/auth/user', UserAPI.as_view()),
        path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')


]
