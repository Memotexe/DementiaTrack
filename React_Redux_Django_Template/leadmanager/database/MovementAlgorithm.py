import pandas as pd
from matplotlib import pyplot as plt
import seaborn as sns
import numpy as np
import re, os, io, operator, sys, csv
from .UTI_algorithms import BathroomTripAnomalies
#Check this!


class MovementAlgorithm:
            
    def MovementAlgo(data):
        algo = MovementAlgorithm()
        locationDF = pd.DataFrame(data=data, columns=['Date','Location'])
        locationParsed = []
        dateParsed = []

        locationParsed = locationDF.Location.tolist()
        dateParsed = locationDF.Date.tolist()

        
        janList=[]
        febList=[]
        marList=[]
        aprList=[]
        mayList=[]
        junList=[]
        julList=[]
        augList=[]
        sepList=[]
        octList=[]
        novList=[]
        decList=[]

        occurenceList = []
        pacingOccur = 0
        lappingOccur = 0
        directOccur =0
        randomOccur = 0
        i=0#iterator
        

        #direct 
        while(i<(len(locationParsed))):
            try:
                stringA =locationParsed[i]
                stringB =locationParsed[i+1]
                stringC =locationParsed[i+2]
                stringD =locationParsed[i+3]

                if((stringA != stringB) and
                        (stringA != stringC) and
                        (stringA != stringD) and 
                        (stringB != stringC) and
                        (stringB != stringD) and
                        (stringB != stringA) and
                        (stringC != stringB) and
                        (stringC != stringD) and
                        (stringC != stringA) and
                        (stringD != stringA) and
                        (stringD != stringB) and
                        (stringD != stringC)):
                    directOccur=directOccur + 1
                    occurenceList.append('Direct')
                    if(dateParsed[i].startswith('11/')):
                            novList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('12/')):
                            decList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('1/')):
                            janList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('2/')):
                            febList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('3/')):
                            marList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('4/')):
                            aprList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('5/')):
                            mayList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('6/')):
                            junList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('7/')):
                            julList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('8/')):
                            augList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('9/')):
                            sepList.append('Direct')
                            i=i+1
                            continue
                    if(dateParsed[i].startswith('10/')):
                            octList.append('Direct')
                            i=i+1
                            continue

                else:
                    i=i+1
            except:
                break

        #Lapping Occurence Algo
        j=0
        while(j<(len(locationParsed))):
            try:
                stringA = locationParsed[j]
                stringB = locationParsed[j+1]
                stringC = locationParsed[j+2]
                stringD = locationParsed[j+3]
                stringE = locationParsed[j+4]
                stringF = locationParsed[j+5]
                stringG = locationParsed[j+6]
                stringH = locationParsed[j+7]
                stringI = locationParsed[j+8]




                if(((stringA != stringB) and (stringA != stringE) and
                        (stringA != stringF) and (stringA != stringC) and
                        (stringD != stringB) and (stringD != stringE) and
                        (stringD != stringF) and (stringD != stringC)and 
                        (stringB == stringF) and (stringC == stringE)) 
                        or ((stringA == stringD == stringF == stringI) 
                                and (stringB == stringG) 
                                and (stringC == stringH))):
                    lappingOccur = lappingOccur+1
                    occurenceList.append('Lapping')

                    if(dateParsed[j].startswith('11/')):
                            novList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('12/')):
                            decList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('1/')):
                            janList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('2/')):
                            febList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('3/')):
                            marList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('4/')):
                            aprList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('5/')):
                            mayList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('6/')):
                            junList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('7/')):
                            julList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('8/')):
                            augList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('9/')):
                            sepList.append('Lapping')
                            j=j+1
                            continue
                    if(dateParsed[j].startswith('10/')):
                            octList.append('Lapping')
                            j=j+1
                            continue

                else:
                    j=j+1

            except:
                break



       #Pacing 
        k=0
        while(k<(len(locationParsed))):
            try:
                stringA = locationParsed[k]
                stringB = locationParsed[k+1]
                stringC = locationParsed[k+2]
                stringD = locationParsed[k+3]
                if(stringA == stringC) and (stringB == stringD):
                    pacingOccur = pacingOccur+1
                    occurenceList.append('Pacing')
                    if(dateParsed[k].startswith('11/')):
                            novList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('12/')):
                            decList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('1/')):
                            janList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('2/')):
                            febList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('3/')):
                            marList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('4/')):
                            aprList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('5/')):
                            mayList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('6/')):
                            junList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('7/')):
                            julList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('8/')):
                            augList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('9/')):
                            sepList.append('Pacing')
                            k=k+1
                            continue
                    if(dateParsed[k].startswith('10/')):
                            octList.append('Pacing')
                            k=k+1
                            continue

                else:
                    k=k+1

            except:
                break
    
        



        #Random Occurence Algo
        l=0
        while(l<(len(locationParsed))):
            try:
                stringA = locationParsed[l]
                stringB = locationParsed[l+1]
                stringC = locationParsed[l+2]
                stringD = locationParsed[l+3]
                stringE = locationParsed[l+4]
                stringF = locationParsed[l+5]
                stringG = locationParsed[l+6]
                stringH = locationParsed[l+7]
                stringI = locationParsed[l+8]

                if( not(((stringA == stringC) and (stringB == stringD)) or
                        (((stringA != stringB) and (stringA != stringE) and
                        (stringA != stringF) and (stringA != stringC) and
                        (stringD != stringB) and (stringD != stringE) and
                        (stringD != stringF) and (stringD != stringC)and 
                        (stringB == stringF) and (stringC == stringE)) 
                        or ((stringA == stringD == stringF == stringI) 
                                and (stringB == stringG) 
                                and (stringC == stringH))) or ((stringA != stringB) and
                        (stringA != stringC) and
                        (stringA != stringD) and 
                        (stringB != stringC) and
                        (stringB != stringD) and
                        (stringB != stringA) and
                        (stringC != stringB) and
                        (stringC != stringD) and
                        (stringC != stringA) and
                        (stringD != stringA) and
                        (stringD != stringB) and
                        (stringD != stringC)))):
                                    randomOccur = randomOccur +1
                                    occurenceList.append('Random')
                                    if(dateParsed[l].startswith('11/')):
                                        novList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('12/')):
                                        decList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('1/')):
                                        janList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('2/')):
                                        febList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('3/')):
                                        marList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('4/')):
                                        aprList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('5/')):
                                        mayList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('6/')):
                                        junList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('7/')):
                                        julList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('8/')):
                                        augList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('9/')):
                                        sepList.append('Random')
                                        l=l+1
                                        continue
                                    if(dateParsed[l].startswith('10/')):
                                        octList.append('Random')
                                        l=l+1
                                        continue

                else:
                    l=l+1
            except:
                break

        # this is only here because the graph this generates resets everything in case the Daily Activity algorithm runs first
        res = BathroomTripAnomalies([{'Date': '1989-11-21', 'Day': 10}, {'Date': '1989-11-21', 'Day': 10}, {'Date': '1989-11-21', 'Day': 10}], 'Day')

        plt.figure(figsize=(6.4,3.8))
        sns_plot = sns.countplot(y=novList)
        sns_plot.set(title="November")
        plt.legend(labels=[])
        bytes_image = io.BytesIO()
        plt.savefig(bytes_image, format='png')
        plt.clf()

        plt.figure(figsize=(6.4,3.8))
        sns_plot2 = sns.countplot(y=decList)
        sns_plot2.set(title="December")
        plt.legend(labels=[])
        bytes_image2 = io.BytesIO()
        plt.savefig(bytes_image2, format='png')
        plt.clf()
      
        plt.figure(figsize=(6.4,3.8))
        sns_plot3 = sns.countplot(y=janList)
        sns_plot3.set(title="January")
        plt.legend(labels=[])
        bytes_image3 = io.BytesIO()
        plt.savefig(bytes_image3, format='png')
        plt.clf()

        plt.figure(figsize=(6.4,3.8))
        sns_plot4 = sns.countplot(y=febList)
        sns_plot4.set(title="February")
        plt.legend(labels=[])
        bytes_image4 = io.BytesIO()
        plt.savefig(bytes_image4, format='png')
        plt.clf()

        plt.figure(figsize=(6.4,3.8))
        sns_plot5 = sns.countplot(y=marList)
        sns_plot5.set(title="March")
        plt.legend(labels=[])
        bytes_image5 = io.BytesIO()
        plt.savefig(bytes_image5, format='png')
        plt.clf()




        total = pacingOccur + lappingOccur + directOccur + randomOccur
        pacingOccur = str(round(((pacingOccur / total) * 100), 2))
        lappingOccur = str(round(((lappingOccur / total) * 100), 2))
        directOccur = str(round(((directOccur / total) * 100), 2))
        randomOccur = str(round(((randomOccur / total) * 100),2))

        
                
        return pacingOccur, lappingOccur, directOccur, randomOccur, bytes_image, bytes_image2, bytes_image3, bytes_image4, bytes_image5
