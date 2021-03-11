from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .UTI_algorithms import BathroomTripAnomalies
from .UTI_algorithms import TemperatureAnomalies
from .DA_algorithm import DAAnomalies
from .MovementAlgorithm import MovementAlgorithm
import base64
import mysql.connector
from datetime import datetime
import json
from dateutil import parser
from PIL import Image
import os
import matplotlib as mpl

mpl.rcParams['lines.markersize'] = 4

class DatabaseAPI(generics.GenericAPIView):

    @api_view(('GET',))
    def get(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password',
                                      host='127.0.0.1',
                                      database='dementia_track')
        cursor = cnx.cursor()

        start = request.GET.get('startdate', '2000-01-01')
        end = request.GET.get('enddate', '2021-01-01')

        dateStart = datetime.strptime(start, "%Y-%m-%d").strftime("%#m/%#d/%#Y")
        dateEnd = datetime.strptime(end, "%Y-%m-%d").strftime("%#m/%#d/%#Y")

        query = ("SELECT * FROM aruba "
                 "WHERE Date BETWEEN '" + dateStart + "' AND '" + dateEnd + "'")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        # data = []
        # for (entry) in cursor:
        #     data.append(entry)

        cursor.close()
        cnx.close()

        # original stuff in this
        # value = request.GET.get('q', 'default value if not found')

        return Response({
            "Test": json.dumps(json_data)
        })

    @api_view(('GET',))
    def getBathroomTrips(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password',
                                      host='127.0.0.1',
                                      database='dementia_track')
        cursor = cnx.cursor()

        start = request.GET.get('startdate', '2000-11-01')
        end = request.GET.get('enddate', '2000-11-01')

        dateStart = datetime.strptime(start, "%Y-%m-%d").strftime("%#m/%#d/%#Y")
        dateEnd = datetime.strptime(end, "%Y-%m-%d").strftime("%#m/%#d/%#Y")


        ## NEED TO ADD BACK DATE FILTER ##


        query = ("SELECT Date, Time, Location FROM aruba "
                 "WHERE (Location = 'M029')")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        cursor.close()
        cnx.close()
        
        datesDay = []
        dataDay = []
        datesNight = []
        dataNight = []

        for hit in json_data:
            current = parser.parse(hit['Date'] + ' ' + hit['Time'])
            midnight = parser.parse(hit['Date'] + ' ' + '0:00:00')
            fouram = parser.parse(hit['Date'] + ' ' + '4:00:00')

            # initialize the date if not added yet
            if hit['Date'] not in datesDay:
                datesDay.append(hit['Date'])
                dataDay.append({'Date' : hit['Date'], 'Day' : 0})

            # initialize the date if not added yet
            if hit['Date'] not in datesNight:
                datesNight.append(hit['Date'])
                dataNight.append({'Date' : hit['Date'], 'Night' : 0})

            # if night time
            if current > midnight and current < fouram:
                i = 0
                while (i < len(datesNight)):
                    if (datesNight[i] == hit['Date']):
                        dataNight[i]['Night'] = dataNight[i]['Night'] + 1
                        break
                    
                    i += 1
            # if day time
            else:
                i = 0
                while (i < len(datesDay)):
                    if (datesDay[i] == hit['Date']):
                        dataDay[i]['Day'] = dataDay[i]['Day'] + 1
                        break
                    
                    i += 1

        # divide each by 2 to account for the ON / OFF calls
        for hit in dataDay:
            hit['Day'] = hit['Day'] / 2

        for hit in dataNight:
            hit['Night'] = hit['Night'] / 2

        resultDay = BathroomTripAnomalies(dataDay, 'Day')
        resultNight = BathroomTripAnomalies(dataNight, 'Night')

        imgDay = base64.b64encode(resultDay[0].getvalue()).decode()
        anomaliesDay = resultDay[1]

        imgNight = base64.b64encode(resultNight[0].getvalue()).decode()
        anomaliesNight = resultNight[1]

        return Response({
            "DayImg": imgDay,
            "DayAnomalies": anomaliesDay,
            "NightImg": imgNight,
            "NightAnomalies": anomaliesNight
        })

    @api_view(('GET',))
    def getTemp(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password',
                                      host='127.0.0.1',
                                      database='dementia_track')
        cursor = cnx.cursor()

        start = request.GET.get('startdate', '2000-11-01')
        end = request.GET.get('enddate', '2000-11-01')

        dateStart = datetime.strptime(start, "%Y-%m-%d").strftime("%#m/%#d/%#Y")
        dateEnd = datetime.strptime(end, "%Y-%m-%d").strftime("%#m/%#d/%#Y")

        ## NEED TO ADD BACK DATE FILTER ##

        query = ("SELECT * FROM temperature")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        cursor.close()
        cnx.close()

        result = TemperatureAnomalies(json_data)
        image = base64.b64encode(result[0].getvalue()).decode()

        return Response({
            "Image": image,
            "Anomalies": result[1]
        })

    @api_view(('GET',))
    def getDA(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password', host='127.0.0.1', database='dementia_track')        
        query = ("SELECT * FROM milan_occ ")

        cursor = cnx.cursor()
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        
        rv = cursor.fetchall()

        json_data = []
        date = []
        bed = []
        sleep = []
        leave = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
            date.append(result[0])
            bed.append(result[1])
            sleep.append(result[3])
            leave.append(result[5])

        cursor.close()
        cnx.close()
        
        result = DAAnomalies(json_data)
        image = base64.b64encode(result[0].getvalue()).decode()

        return Response({
            "Image": image,
            "Anomalies": result[1],
            "Date": date, 
            "Bed" : bed, 
            "Sleep" : sleep, 
            "Leave" : leave
        })

        """ Testing Purposes:
        print("\n\n\n\n\n\n")
        print(json_data)
        print("\n\n\n\n\n\n")
        """

    #WILL NEED TO HAVE ALL IMPORT NEW TABLES FOR THIS NEW API CALL
    @api_view(('GET',))
    def getLocations(request, *args, **kwargs):
        cnx = mysql.connector.connect(user = 'root', password='password', host='127.0.0.1', database='dementia_track')

        cursor = cnx.cursor()

        #Need To Set Date to Format of 01/1/20XX

        dataTypeToRun = request.GET.get('dataTypeToRun')

        if(dataTypeToRun == 'Normal'):
            query = ("SELECT Date, Location FROM aruba WHERE Location like 'M%'")
        elif(dataTypeToRun == 'Abnormal'):
            query = ("SELECT Date, Location FROM aruba_abn WHERE Location like 'M%'")
        else:
            query = ("SELECT Date, Location FROM aruba_rad WHERE Location like 'M%'")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))


        cursor.close()
        cnx.close()
        result = MovementAlgorithm.MovementAlgo(json_data)


       
        image1 = base64.b64encode(result[4].getvalue()).decode()
        image2 = base64.b64encode(result[5].getvalue()).decode()
        image3 = base64.b64encode(result[6].getvalue()).decode()
        image4 = base64.b64encode(result[7].getvalue()).decode()
        image5 = base64.b64encode(result[8].getvalue()).decode()
        

        return Response({
                "Pacing" : result[0],
                "Lapping": result[1],
                "Direct" : result[2],
                "Random" : result[3],
                "Image1" : image1,
                "Image2" : image2,
                "Image3" : image3,
                "Image4" : image4,
                "Image5" : image5,

        })
