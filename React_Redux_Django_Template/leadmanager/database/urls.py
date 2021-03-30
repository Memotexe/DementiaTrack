from django.urls import path
from .api import DatabaseAPI

urlpatterns = [
    path('api/database/test', DatabaseAPI.get),
    path('api/database/uti', DatabaseAPI.getUTI),
    path('api/database/dailyMi', DatabaseAPI.getDAMi),
    path('api/database/dailyAr', DatabaseAPI.getDAAr),
    path('api/database/dailyRa', DatabaseAPI.getDARa),
    path('api/database/move', DatabaseAPI.getLocations),
    path('api/database/sleep', DatabaseAPI.getSleep),
    path('api/database/sleepSelect', DatabaseAPI.getSleepSelect)
]

