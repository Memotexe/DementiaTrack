from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
import mysql.connector
from datetime import datetime
import json


class DatabaseAPI(generics.GenericAPIView):

    @api_view(('GET',))
    def get(request, *args, **kwargs):
        cnx = mysql.connector.connect(user='root', password='password',
                                      host='127.0.0.1',
                                      database='dementia_track')
        cursor = cnx.cursor()

        start = request.GET.get('startdate', '1/1/2000')
        end = request.GET.get('enddate', '1/1/2021')

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
