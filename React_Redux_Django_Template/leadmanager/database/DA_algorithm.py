import pandas as pd
import io
from pyspcalt import *

def DAAnomalies(data):
    date = pd.DataFrame(data=data, columns=['date'])
    df = pd.DataFrame(data=data, columns=['bed_to_toilet_begin', 'sleep_begin', 'leave_home_begin'])

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary['violation-points']

    return buf, anomalies
    
    
    
