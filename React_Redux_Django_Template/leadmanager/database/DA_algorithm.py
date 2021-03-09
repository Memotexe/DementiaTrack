import pandas as pd
import io
from pyspcalt import *

def MiAnomalies(data):
    df = pd.DataFrame(data=data, columns=['Morning_Meds', 'Watch_TV', 'Chores', 'Read', 'Eve_Meds', 'Meditate'])

    s = spc(df)

    a = s + cusum(std=1.5) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary['violation-points']

    return buf, anomalies

def ArAnomalies(data):
    df = pd.DataFrame(data=data, columns=['meal_preparation_begin', 'housekeeping_begin', 'eating_begin', 'relax_begin', 'wash_dishes_begin', 'respirate_begin'])

    s = spc(df)

    a = s + cusum(std=1.5) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary['violation-points']

    return buf, anomalies
    
def RaAnomalies(data):
    df = pd.DataFrame(data=data, columns=['meal_preparation_begin', 'housekeeping_begin', 'eating_begin', 'relax_begin', 'wash_dishes_begin', 'respirate_begin'])

    s = spc(df)

    a = s + cusum(std=1.5) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary['violation-points']

    return buf, anomalies