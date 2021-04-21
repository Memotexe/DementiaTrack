from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .UTI_algorithms import BathroomTripAnomalies
from .UTI_algorithms import TemperatureAnomalies
from .UTI_algorithms import GetCombinedGraph
from .DA_algorithm import MiAnomalies
from .DA_algorithm import ArAnomalies
from .DA_algorithm import RaAnomalies
from .Sleep.run_sleep import run_sleep
from .Sleep.sleep import SleepPy
from .MovementAlgorithm import MovementAlgorithm
import base64
import mysql.connector
from datetime import datetime
from .Sleep.utils import import_dummy_data
import json
from dateutil import parser
from PIL import Image
import os
import matplotlib as mpl
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

mpl.rcParams['lines.markersize'] = 4

class DatabaseAPI(generics.GenericAPIView):
    @api_view(('POST',))
    def sendEmail(request, *args, **kwargs):
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)

        the_dir = os.path.dirname(__file__)
        rel_path = "emailpassword.txt"

        with open(os.path.join(the_dir, rel_path)) as f:
            lines = f.readlines()

        mail_content = body_data['Message']

        sender_address = 'dementiatrack@gmail.com'
        sender_pass = lines[0]
        receiver_address = 'perrbm04@pfw.edu'

        message = MIMEMultipart()
        message['From'] = sender_address
        message['To'] = receiver_address
        message['Subject'] = 'Alert From DementiaTrack' 
        message.attach(MIMEText(mail_content, 'html'))

        session = smtplib.SMTP('smtp.gmail.com', 587)
        session.starttls() 
        session.login(sender_address, sender_pass) 
        text = message.as_string()
        session.sendmail(sender_address, receiver_address, text)
        session.quit()

        return Response({
            "Result": "Email Sent"
        })

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
        row_headers = [x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        cursor.close()
        cnx.close()

        return Response({
            "Test": json.dumps(json_data)
        })

    @api_view(('GET',))
    def getUTI(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password',
                                      host='127.0.0.1',
                                      database='dementia_track')
        cursor = cnx.cursor()

        start = request.GET.get('startdate', '2000-11-01')
        end = request.GET.get('enddate', '2000-11-01')
        dataTypeToRun = request.GET.get('dataTypeToRun', 'Normal')

        dateStart = datetime.strptime(start, "%Y-%m-%d").strftime("%#m/%#d/%#Y")
        dateEnd = datetime.strptime(end, "%Y-%m-%d").strftime("%#m/%#d/%#Y")

        if (dataTypeToRun == 'Normal'):
            query = ("SELECT * FROM temp_data_normal")
        elif (dataTypeToRun == 'Abnormal'):
            query = ("SELECT * FROM temp_data_abnormal")
        else:
            query = ("SELECT * FROM temp_data_random")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data_temp = []
        for result in rv:
            json_data_temp.append(dict(zip(row_headers, result)))

        if (dataTypeToRun == 'Normal'):
            query = ("SELECT date_format(Date, '%m/%d/%Y') as Date, Day, Night from bathroom_normal")
        elif (dataTypeToRun == 'Abnormal'):
            query = ("SELECT date_format(FDate, '%m/%d/%Y') as Date, Time, Location FROM aruba "
                 "WHERE (Location = 'M029') AND (FDate BETWEEN '2010-11-10' AND '2010-12-10')")
        else:
            query = ("SELECT date_format(Date, '%m/%d/%Y') as Date, Day, Night from bathroom_random")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data_bathroom = []
        for result in rv:
            json_data_bathroom.append(dict(zip(row_headers, result)))

        cursor.close()
        cnx.close()

        dataDay = []
        dataNight = []

        startDate = json_data_bathroom[0]['Date']
        
        if (dataTypeToRun == 'Normal' or dataTypeToRun == 'Random'):
            for row in json_data_bathroom:
                dataDay.append({ 'Date': row['Date'], 'Day': row['Day'] })
                dataNight.append({ 'Date': row['Date'], 'Night': row['Night'] })

        elif (dataTypeToRun == 'Abnormal'):
            datesDay = []
            datesNight = []

            for hit in json_data_bathroom:
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

        resultTemp = TemperatureAnomalies(json_data_temp)
        imageTemp = base64.b64encode(resultTemp[0].getvalue()).decode()

        resultDay = BathroomTripAnomalies(dataDay, 'Day')
        resultNight = BathroomTripAnomalies(dataNight, 'Night')

        imgDay = base64.b64encode(resultDay[0].getvalue()).decode()
        anomaliesDay = resultDay[1]

        imgNight = base64.b64encode(resultNight[0].getvalue()).decode()
        anomaliesNight = resultNight[1]

        combinedResult = GetCombinedGraph(json_data_temp, dataDay, dataNight)
        combinedGraph = base64.b64encode(combinedResult.getvalue()).decode()

        return Response({
            "DayImg": imgDay,
            "DayAnomalies": anomaliesDay,
            "NightImg": imgNight,
            "NightAnomalies": anomaliesNight,
            "TempAnomalies": resultTemp[1],
            "TempImg": imageTemp,
            "CombinedGraph": combinedGraph,
            "StartDate": startDate
        })

    @api_view(('GET',))
    def getSleep(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password',
                                      host='127.0.0.1',
                                      database='dementia_track')
        cursor = cnx.cursor()

        query = ("SELECT * FROM normal_sleep_month")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        normal_result, normal_buf = run_sleep(json_data, "Normal")
        normal_img = base64.b64encode(normal_buf.getvalue()).decode()

        query = ("SELECT * FROM bad_sleep_month")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        bad_result, bad_buf = run_sleep(json_data, "Abnormal")
        bad_img = base64.b64encode(bad_buf.getvalue()).decode()

        query = ("SELECT * FROM random_sleep_month")

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        random_result, random_buf = run_sleep(json_data, "Random")
        random_img = base64.b64encode(random_buf.getvalue()).decode()

        cursor.close()
        cnx.close()

        return Response({
            "Normal_Image": normal_img,
            "Bad_Image": bad_img,
            "Random_Image": random_img,
            "Normal_Anomalies": normal_result,
            "Bad_Anomalies": bad_result,
            "Random_Anomalies": random_result
        })

    @api_view(('GET',))    
    def getDAMi(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password', host='127.0.0.1', database='dementia_track')    
        query = ("SELECT * FROM milan_occ ")

        cursor = cnx.cursor()
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers

        rv = cursor.fetchall()

        json_data = []
        date = []
        mMeds = []
        tv = []
        chores = []
        read = []
        eMeds = []
        meditate = []
        startDate = []
        i = 0

        for result in rv:
            if i == 0:
                startDate = result[0]
                i += 1
            json_data.append(dict(zip(row_headers, result)))
            date.append(result[0])
            mMeds.append(result[1])
            tv.append(result[2])
            chores.append(result[3])
            read.append(result[4])
            eMeds.append(result[5])
            meditate.append(result[6])

        cursor.close()
        cnx.close()
        
        result = MiAnomalies(json_data)
        image = base64.b64encode(result[0].getvalue()).decode()

        return Response({
            "Image": image,
            "Anomalies": result[1],
            "Date": date, 
            "Morn_Meds": mMeds,
            "WatchTV": tv,
            "Chores": chores,
            "Read": read,
            "Eve_Meds": eMeds,
            "Meditate": meditate,
            "StartDate": startDate
        })

    @api_view(('GET',))
    def getDAAr(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password', host='127.0.0.1', database='dementia_track')        
        query = ("SELECT * FROM aruba_occ ")

        cursor = cnx.cursor()
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        
        rv = cursor.fetchall()

        json_data = []
        date = []
        meal = []
        house = []
        eat = []
        relax = []
        dishes = []
        resp = []

        startDate = []
        i = 0
        for result in rv:
            if i == 0:
                startDate = result[0]
                i += 1
            json_data.append(dict(zip(row_headers, result)))
            date.append(result[0])
            meal.append(result[1])
            house.append(result[2])
            eat.append(result[3])
            relax.append(result[4])
            dishes.append(result[5])
            resp.append(result[6])

        cursor.close()
        cnx.close()
        
        result = ArAnomalies(json_data)
        image = base64.b64encode(result[0].getvalue()).decode()

        return Response({
            "Image": image,
            "Anomalies": result[1],
            "Date": date, 
            "Meal" : meal,
            "Housekeeping" : house,
            "Eating" : eat,
            "Relax" : relax,
            "Dishes" : dishes,
            "Respirate" : resp,
            "StartDate": startDate
        })

    @api_view(('GET',))
    def getDARa(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password', host='127.0.0.1', database='dementia_track')        
        query = ("SELECT * FROM rand_occ ")

        cursor = cnx.cursor()
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        
        rv = cursor.fetchall()

        json_data = []
        date = []
        meal = []
        house = []
        eat = []
        relax = []
        dishes = []
        resp = []
        
        startDate = []
        i = 0
        for result in rv:
            if i == 0:
                startDate = result[0]
                i += 1
            json_data.append(dict(zip(row_headers, result)))
            date.append(result[0])
            meal.append(result[1])
            house.append(result[2])
            eat.append(result[3])
            relax.append(result[4])
            dishes.append(result[5])
            resp.append(result[6])

        cursor.close()
        cnx.close()
        
        result = RaAnomalies(json_data)
        image = base64.b64encode(result[0].getvalue()).decode()

        return Response({
            "Image": image,
            "Anomalies": result[1],
            "Date": date, 
            "Meal" : meal,
            "Housekeeping" : house,
            "Eating" : eat,
            "Relax" : relax,
            "Dishes" : dishes,
            "Respirate" : resp,
            "StartDate": startDate
        })

    @api_view(('GET',))
    def getLocations(request, *args, **kwargs):
        cnx1 = mysql.connector.connect(user = 'root', password='password', host='127.0.0.1', database='dementia_track')

        cursor1 = cnx1.cursor()

        dataTypeToRun = request.GET.get('dataTypeToRun')

        if(dataTypeToRun == 'Normal'):
            query = ("SELECT Date, Location FROM aruba WHERE Location like 'M%'")
        elif(dataTypeToRun == 'Abnormal'):
            query = ("SELECT Date, Location FROM aruba_abn WHERE Location like 'M%'")
        else:
            query = ("SELECT Date, Location FROM aruba_rad WHERE Location like 'M%'")

        cursor1.execute(query)
        row_headers = [x[0] for x in cursor1.description]  # this will extract row headers
        rv = cursor1.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))


        cursor1.close()
        cnx1.close()
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
                "novPacingPer" : result[9],
                "novLappingPer" : result[10],
                "novDirectPer" : result[11],
                "novRandomPer" : result[12],

                "decPacingPer" : result[13],
                "decLappingPer" : result[14],
                "decDirectPer" : result[15],
                "decRandomPer" : result[16],

                "janPacingPer" : result[17],
                "janLappingPer" : result[18],
                "janDirectPer" : result[19],
                "janRandomPer" : result[20],

                "febPacingPer" : result[21],
                "febLappingPer" : result[22],
                "febDirectPer" : result[23],
                "febRandomPer" : result[24],

                "marPacingPer" : result[25],
                "marLappingPer" : result[26],
                "marDirectPer" : result[27],
                "marRandomPer" : result[28],


                

        })

    @api_view(('GET',))
    def getSleepSelect(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password',
                                      host='127.0.0.1',
                                      database='dementia_track')
        cursor = cnx.cursor()
        
        dataTypeToRun = request.GET.get('dataTypeToRun')
        tableTitle = ""
        color = ""

        if (dataTypeToRun == 'Normal'):
            query = ("SELECT * FROM normal_sleep_month")
            tableTitle = "Normal"
            color = "green"
        elif (dataTypeToRun == 'Abnormal'):
            query = ("SELECT * FROM bad_sleep_month")
            tableTitle = "Abnormal"
            color = "red"
        else:
            query = ("SELECT * FROM random_sleep_month")
            tableTitle = "Random"
            color = "yellow"

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  # this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        result, buf = run_sleep(json_data, tableTitle)
        img = base64.b64encode(buf.getvalue()).decode()

        cursor.close()
        cnx.close()

        return Response({
            "Color": color,
            "Anomalies": result
        })
