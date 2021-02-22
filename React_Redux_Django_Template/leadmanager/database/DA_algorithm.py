import pandas as pd
import os
import io
from datetime import datetime
from pyspc import *
from datetime import datetime

def DAAnomalies(data):
    df = pd.DataFrame(data=data)
    """
    x = 0
    while x < len(data):
        #print(data[x], "\n")
        x += 1
    dates = data.index.strftime("%Y/%m/%d %h:%m:%s")
    print(dates)
    """
    date = pd.DataFrame(data=data, columns=['date'])
    df = pd.DataFrame(data=data, columns=['bed_to_toilet_begin', 'sleep_begin', 'leave_home_begin'])

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()

    a.save(buf)

    anomalies = s.summary[0]['violation-points']

    print(date)

    pd.to_datetime(date)

    anomalyDateList = []
    i = 0
    
    while i < len(anomalies):
        if(anomalies[i] == True):
            anomalyDateList.append({"Time" : date[anomalies[i]], "Temperature" : s.temp[i]})

        i += 1


    return buf, anomalyDateList
    
    
    
