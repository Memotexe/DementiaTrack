import pandas as pd
import os
import io
from datetime import datetime
from pyspc import *
from datetime import datetime

def DAAnomalies(data):
    df = pd.DataFrame(data=data)

    x = 0
    while x < len(data):
        #print(data[x], "\n")
        x += 1
    dates = data.index.strftime("%Y/%m/%d %h:%m:%s")
    print(dates)
    
    """
    df = pd.DataFrame(data=data, columns=['bed_to_toilet_begin', 'sleep_begin', 'leave_home_begin'])

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()

    a.save(buf)

    print(s.data)

    anomalies = s.summary[0]['violation-points']

    #dates = anomalies[0]['violation-points'] .strftime("%Y/%m/%d %h:%m:%s")
    #print(anomalies)
    #print(dates)

    anomalyDateList = []
    i = 0
    """
    """
    while i < len(anomalies):
        if(anomalies[i] == True):
            anomalyDateList.append({"Time" : anomalies[i], "Temperature" : s.temp[i]})

        i += 1
    """

    #print(anomalyDateList)
    #print(buf)

    return buf, anomalyDateList
    
    
    
    
    
    
    """
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
    """