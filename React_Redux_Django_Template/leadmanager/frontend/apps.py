from django.apps import AppConfig

"""
This class is to give the frontend part of the web application its
libraries and properties. This is from the django library 
known as AppConfig. This is where the properties get pulled from.
"""
class FrontendConfig(AppConfig):
    name = 'frontend'
