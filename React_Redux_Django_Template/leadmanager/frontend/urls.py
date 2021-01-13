from django.urls import path
from . import views

# """
# This is so the the application can look to find where the views and urls
# are located in the file directory.

# """
urlpatterns = [
    path('', views.index)
]
