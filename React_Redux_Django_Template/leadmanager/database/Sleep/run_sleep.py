import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import io


def run_sleep(json_data, table):
    df = pd.DataFrame(json_data)
    TableName = table

    avgPTA = 0.0
    totalPTA = 0.0
    totalWB = 0
    for occur in df['Percent Time Asleep']:
        totalPTA += occur

    avgPTA = round(totalPTA / df['Percent Time Asleep'].size, 1)

    for occur in df['Number of Wake Bouts']:
        totalWB += occur

    result = [avgPTA, totalWB]

    x = df['Day']
    y = df['Percent Time Asleep']
    col = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    threshold = 72.5
    plt.figure()
    plt.title(TableName + " Sleep for Month")
    plt.xlabel("Days of Month")
    plt.ylabel("Percent Time Asleep")

    below_threshold = y <= threshold
    above_threshold = np.logical_not(below_threshold)
    plt.yticks(col)
    plt.plot(x, y)
    plt.axhline(y=threshold, color='r', linestyle='-')
    plt.scatter(x[below_threshold], y[below_threshold], color='r', marker='o')
    plt.scatter(x[above_threshold], y[above_threshold], color='b', marker='o')

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.clf()

    return result, buf
