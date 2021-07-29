from django.contrib import admin
from django.urls import path, include

# """
# This is the directory for the web application so that the path to the .js files
# are found to be accessed and displayed.
# """


urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('leads.urls')),
    path('', include('accounts.urls')),
    path('', include('database.urls'))
]
