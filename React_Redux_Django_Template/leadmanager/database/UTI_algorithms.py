import pandas as pd
from pycaret.anomaly import *
import os
from matplotlib import *
from matplotlib import pyplot as plt
import io
from adtk.data import validate_series
from adtk.detector import InterQuartileRangeAD
from adtk.visualization import plot
from datetime import datetime

fsize = (20, 6)

def BathroomTripAnomalies(data, timeOfDay):
    cleanedData = []

    for d in data:
        if d[timeOfDay] < 25:
            cleanedData.append(d)

    df = pd.DataFrame(cleanedData, columns=['Date', timeOfDay])

    setup(df, numeric_features=[timeOfDay], ignore_features=['Date'], silent=True)

    lof = create_model('lof')

    lof_predict = predict_model(lof, data=df)
    anomalies = lof_predict[lof_predict.Anomaly == 1]

    buf = io.BytesIO()
    
    formattedData = []

    for n in cleanedData:
        formattedData.append(n[timeOfDay])

    anomalyData = lof_predict['Anomaly']
    graphAnomalies = []

    i = 0
    while i < len(anomalyData):
        if (anomalyData[i] == 1):
            graphAnomalies.append(formattedData[i])
        else:
            graphAnomalies.append(0)

        i += 1

    yRange = []

    increment = 2
    maxY = max(formattedData)

    if timeOfDay == "Night":
        increment = 1
        maxY = 10

    i = 0
    while i <= maxY:
        yRange.append(i)
        i += increment

    x = []

    i = 0
    while i < len(formattedData):
        x.append(i)
        i += 1

    plt.clf()

    plt.figure(figsize=fsize)
    plt.bar(x, formattedData)
    plt.bar(x, graphAnomalies, color="red")
    plt.legend([timeOfDay + " Trips", 'Anomalies'], loc="upper left")
    plt.gca().yaxis.grid(True)
    plt.gca().xaxis.grid(False)
    plt.yticks(yRange)
    plt.gca().xaxis.grid(False)
    plt.ylabel('Trips')
    plt.xlabel(timeOfDay)
    plt.title(timeOfDay + " Bathroom Trips")
    plt.savefig(buf, format='png')

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

    anomalyDatesGraph = []
    anomalyTempGraph = []

    for point in anomalyDateList:
        anomalyDatesGraph.append(point["Time"])
        anomalyTempGraph.append(point["Temperature"])


    plt.clf()

    plt.figure(figsize=fsize)
    plt.plot(s, label="Temperature")
    plt.scatter(anomalyDatesGraph, anomalyTempGraph, color="red", s=100)
    plt.legend(['Temperature', 'Anomalies'], loc="best")
    plt.ylabel('Temperature')
    plt.xlabel('Date')
    plt.title("All Data")
    plt.yticks([96, 97, 98, 99, 100, 101, 102, 103])
    plt.gca().xaxis.grid(False)
    plt.savefig(buf, format="png")

    return buf, anomalyDateList

def GetCombinedGraph(tempData, bathroomDataDay, bathroomDataNight):
    cleanedDataDay = []
    cleanedDataNight = []

    i = 0
    while i < len(bathroomDataDay):
        if (bathroomDataDay[i]['Day'] < 25):
            cleanedDataDay.append(bathroomDataDay[i])
        else:
            cleanedDataDay.append({'Date': bathroomDataDay[i]['Date'], 'Day': 8})

        cleanedDataNight.append(bathroomDataNight[i])

        i += 1

    dayData = []
    nightData = []
    temps = []
    dates = []

    for t in tempData:
        temps.append(t['Temp'])
        dates.append(t['Times'])

    for d in cleanedDataDay:
        dayData.append(d['Day'])

    for n in cleanedDataNight:
        nightData.append(n['Night'])

    size_per_day = round(len(tempData) / len(dayData))

    bathroom_data_day_over_temp_scale = []
    bathroom_data_night_over_temp_scale = []

    i = 0
    while i < len(dayData):
        j = 0
        while j < size_per_day:
            bathroom_data_day_over_temp_scale.append(dayData[i])
            bathroom_data_night_over_temp_scale.append(nightData[i])
            j += 1
        
        i += 1

    length_gap = len(tempData) - len(bathroom_data_day_over_temp_scale)

    if (length_gap > 0):
        i = 0
        while i < length_gap:
            bathroom_data_day_over_temp_scale.append(dayData[len(dayData)])
            bathroom_data_night_over_temp_scale.append(nightData[len(nightData)])
            i += 1
    else:
        i = 0
        while i < abs(length_gap):
            bathroom_data_day_over_temp_scale.pop()
            bathroom_data_night_over_temp_scale.pop()
            i += 1

    unique_dates = []

    for d in dates:
        if d not in unique_dates:
            unique_dates.append(d)

    plt.clf()

    plt.figure(figsize=fsize)
    plt.subplot(2, 1, 1)
    plt.plot(temps, label="Temperature")
    plt.legend(['Temperature'], loc="best")
    plt.ylabel('Temperature')
    plt.title("All Data")
    plt.xticks([])
    plt.yticks([96, 97, 98, 99, 100, 101, 102, 103])

    plt.subplot(2, 1, 2)
    plt.plot(unique_dates, bathroom_data_day_over_temp_scale, label="Day Trips", color="green")
    plt.plot(unique_dates, bathroom_data_night_over_temp_scale, label="Night Trips", color="orange")
    plt.legend(['Day Trips', 'Night Trips'], loc="best")
    plt.ylabel('Trips')
    plt.xlabel('Date')
    plt.gca().xaxis.grid(False)

    buf = io.BytesIO()
    plt.savefig(buf, format="png")

    plt.clf()

    return buf