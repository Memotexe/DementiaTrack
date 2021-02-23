import pandas as pd
import os
import io
from datetime import datetime
from pyspc import *
from datetime import datetime

def DAAnomalies(data):
    date = pd.DataFrame(data=data, columns=['date'])
    df = pd.DataFrame(data=data, columns=['bed_to_toilet_begin', 'sleep_begin', 'leave_home_begin'])

    #df = df.set_index('date')

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary[0]['violation-points']

    return buf, anomalies
    
    
    
