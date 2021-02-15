from django.db import models
from django.db.models.query import QuerySet


# Create your models here.

class ArubaManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(Time='12:03:50 AM')


class Aruba(models.Model):
    date = models.TextField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    time = models.TextField(db_column='Time', blank=True, null=True)  # Field name made lowercase.
    location = models.TextField(db_column='Location', blank=True, null=True)  # Field name made lowercase.
    sensor = models.TextField(db_column='Sensor', blank=True, null=True)  # Field name made lowercase.
    stage = models.TextField(db_column='Stage', blank=True, null=True)  # Field name made lowercase.
    be = models.TextField(db_column='BE', blank=True, null=True)  # Field name made lowercase.

    objects = models.Manager()
    arubaM = ArubaManager()

    class Meta:
        db_table = 'aruba'

    def __str__(self):
        return self.name


class Milan(models.Model):
    date = models.TextField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    time = models.TextField(db_column='Time', blank=True, null=True)  # Field name made lowercase.
    location = models.TextField(db_column='Location', blank=True, null=True)  # Field name made lowercase.
    sensor = models.TextField(db_column='Sensor', blank=True, null=True)  # Field name made lowercase.
    stage = models.TextField(db_column='Stage', blank=True, null=True)  # Field name made lowercase.
    be = models.TextField(db_column='BE', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'milan'


class Temperature(models.Model):
    times = models.TextField(db_column='Times', blank=True, null=True)  # Field name made lowercase.
    temp = models.FloatField(db_column='Temp', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'temperature'
