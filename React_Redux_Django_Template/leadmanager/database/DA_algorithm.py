import pandas as pd
import io
from pyspcalt import *

def MiAnomalies(data):
    df = pd.DataFrame(data=data, columns=['bed_to_toilet_begin', 'sleep_begin', 'leave_home_begin'])

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary['violation-points']

    return buf, anomalies

def ArAnomalies(data):
    df = pd.DataFrame(data=data, columns=['Bed_to_Toilet_begin', 'meal_Preparation_begin', 'Housekeeping_begin', 'Eating_begin', 'Leave_Home_begin', 'Sleeping_begin', 'relax_begin', 'Wash_Dishes_begin', 'Work_begin', 'respirate_begin'])

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary['violation-points']

    return buf, anomalies
    
def RaAnomalies(data):
    df = pd.DataFrame(data=data, columns=['Bed_to_Toilet_begin', 'meal_Preparation_begin', 'Housekeeping_begin', 'Eating_begin', 'Leave_Home_begin', 'Sleeping_begin', 'relax_begin', 'Wash_Dishes_begin', 'Work_begin', 'respirate_begin'])

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary['violation-points']

    return buf, anomalies