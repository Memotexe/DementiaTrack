from django.shortcuts import render

"""
This is the main html file that is rendered so when the 
web application is ran, this will be displayed as the 
display for the application.
"""

def index(request):
    return render(request, 'frontend/index.html')
