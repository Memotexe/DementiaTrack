from rest_framework import serializers
from .models import Aruba, Milan, Temperature


class ArubaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aruba
        fields = ('date', 'time', 'location', 'sensor', 'stage', 'be')


class MilanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milan
        fields = ('date', 'time', 'location', 'sensor', 'stage', 'be')


class TemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temperature
        fields = ('time', 'temp')
