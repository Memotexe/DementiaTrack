from django.urls import path
from .api import DatabaseAPI

urlpatterns = [
    path('api/database/test', DatabaseAPI.get)
]