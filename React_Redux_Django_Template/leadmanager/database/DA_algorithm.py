import pandas as pd
import os
import io
from datetime import datetime
from pyspc import *

def DAAnomalies(data):
    df = pd.DataFrame(data=data, columns=['stage', 'UniqueStage'])

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()
    a.save('C:/Users/Ryan/Github/DementiaTrack/React_Redux_Django_Template/leadmanager/frontend/tests/images/ANOMALY.png')

    anomalies = s.summary[0]['violation-points']

    return buf, anomalies
