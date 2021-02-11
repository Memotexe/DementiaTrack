import pandas as pd
from pycaret.anomaly import *
import os
from matplotlib import *
import io
from adtk.data import validate_series
from adtk.detector import InterQuartileRangeAD
from adtk.visualization import plot

def BathroomTripAnomalies():
    pre = os.path.dirname(os.path.realpath(__file__))
    fname = 'bathroom_data.csv'

    df = pd.read_csv(os.path.join(pre, fname))
    df.columns = ['Day', 'Night']

    setup(df, numeric_features=['Day', 'Night'], silent=True)

    lof = create_model('lof')

    lof_predict = predict_model(lof, data=df)
    anomalies = lof_predict[lof_predict.Anomaly == 1]

    buf = io.BytesIO()

    lof_predict.plot().get_figure().savefig(buf, format='png')

    return buf, anomalies.values

def TemperatureAnomalies():
    pre = os.path.dirname(os.path.realpath(__file__))
    fname = 'temp_data.csv'

    s = pd.read_csv(os.path.join(pre, fname), index_col='Times', parse_dates=True, squeeze=True)

    s = validate_series(s)

    iqr_ad = InterQuartileRangeAD(c=5)
    anomalies = iqr_ad.fit_detect(s)

    dates = anomalies.index.strftime("%Y/%m/%d %h:%m:%s")

    anomalyDateList = []
    i = 0

    while i < len(anomalies):
        if anomalies[i] == True:
            anomalyDateList.append([dates[i], s[i]])

        i += 1

    buf = io.BytesIO()
    p = plot(s, anomaly=anomalies, ts_linewidth=1, ts_markersize=3, anomaly_markersize=5, anomaly_color='red', anomaly_tag="marker")
    p[0].get_figure().savefig(buf, format='png')

    return buf, anomalyDateList
