import pandas as pd
import os
import io
from datetime import datetime
from pyspc import *

def DAAnomalies(data):
    df = pd.DataFrame(data=data)

    print(df)

    s = spc(df)

    a = s + cusum(std=2) + rules()

    buf = io.BytesIO()
    a.save("whatever.png")

    anomalies = s.summary[0]['violation-points']

    return buf, anomalies
