from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .UTI_algorithms import BathroomTripAnomalies
from .UTI_algorithms import TemperatureAnomalies
import base64

class DatabaseAPI(generics.GenericAPIView):

    @api_view(('GET',))
    def get(request):
        value = request.GET.get('q', 'default value if not found')

        if (value == "Bathroom"):
            value = BathroomTripAnomalies()
        else:
            value = TemperatureAnomalies()

        img = base64.b64encode(value[0].getvalue()).decode()

        anomalies = value[1]

        return Response({
            "Image": img,
            "Anomalies": anomalies
        })
