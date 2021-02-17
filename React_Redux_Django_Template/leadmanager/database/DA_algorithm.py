import pandas as pd
from pycaret.anomaly import *
import os
from matplotlib import *
import io
from adtk.data import validate_series
from adtk.detector import InterQuartileRangeAD
from adtk.visualization import plot
from datetime import datetime

def DAAnomalies(data, timeOfDay):
    df = pd.DataFrame(data, columns=['Date', timeOfDay])

    setup(df, numeric_features=[timeOfDay], ignore_features=['Date'], silent=True)

    lof = create_model('lof')

    lof_predict = predict_model(lof, data=df)
    anomalies = lof_predict[lof_predict.Anomaly == 1]

    buf = io.BytesIO()

    lof_predict.plot().get_figure().savefig(buf, format='png')

    return buf, anomalies.values
