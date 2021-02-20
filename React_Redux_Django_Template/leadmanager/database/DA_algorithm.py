import pandas as pd
import os
import io
from datetime import datetime
from pyspc import *
from datetime import datetime

def DAAnomalies(dat):
    #print(dat['ï»¿date'])
    df = pd.DataFrame(data=dat, columns=['bed_to_toilet_begin', 'sleep_begin', 'leave_home_begin'])

    #print(df)

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()
    buf = a.save("C:/Users/Ryan/Github/DementiaTrack/React_Redux_Django_Template/leadmanager/frontend/tests/images/milan-occ.png")
    buf = "C:/Users/Ryan/Github/DementiaTrack/React_Redux_Django_Template/leadmanager/frontend/tests/images/milan-occ.png"

    anomalies = s.summary[0]['violation-points']

    return buf, anomalies