import pandas as pd
from pycaret.anomaly import *
import os
from matplotlib import *
import io
from adtk.data import validate_series
from adtk.detector import InterQuartileRangeAD
from adtk.visualization import plot
from datetime import datetime

def BathroomTripAnomalies(data, timeOfDay):
    df = pd.DataFrame(data, columns=['Date', timeOfDay])

    setup(df, numeric_features=[timeOfDay], ignore_features=['Date'], silent=True)

    lof = create_model('lof')

    lof_predict = predict_model(lof, data=df)
    anomalies = lof_predict[lof_predict.Anomaly == 1]

    buf = io.BytesIO()

    lof_predict.plot().get_figure().savefig(buf, format='png')

    return buf, anomalies.values

def TemperatureAnomalies(data):
    s = pd.DataFrame(data=data, columns=['Times', 'Temp'])

    format = '%Y-%m-%d %H:%M:%S'
    s['Times'] = pd.to_datetime(s['Times'], format=format)
    s = s.set_index('Times')

    s = validate_series(s)

    iqr_ad = InterQuartileRangeAD(c=5)
    anomalies = iqr_ad.fit_detect(s)

    dates = anomalies.index.strftime("%Y/%m/%d %h:%m:%s")

    anomalyDateList = []
    i = 0

    while i < len(anomalies['Temp']):
        if anomalies['Temp'][i] == True:
            anomalyDateList.append({ "Time" : dates[i], "Temperature" : s.Temp[i] })

        i += 1

    buf = io.BytesIO()
    p = plot(s, anomaly=anomalies, ts_linewidth=1, ts_markersize=3, anomaly_markersize=5, anomaly_color='red', anomaly_tag="marker")
    p[0].get_figure().savefig(buf, format='png')

    return buf, anomalyDateList
