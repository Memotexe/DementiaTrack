import pandas as pd
from matplotlib import pyplot as plt
import seaborn as sns
import numpy as np
import re, os, io, operator, sys, csv
#Check this!


class MovementAlgorithm:
            
    def MovementAlgo(data):
        algo = MovementAlgorithm()
        locationDF = pd.DataFrame(data=data, columns=['Location'])
        locationUnParsed = []
        locationParsed = []

        locationUnParsed = locationDF.Location.tolist()

        for i in locationUnParsed:
            x = re.findall("^M", i)
            if x:
                locationParsed.append(i)
                   
        occurenceList = []
        pacingOccur = 0
        lappingOccur = 0
        directOccur =0
        randomOccur = 0
        i=0#iterator
        

        #Pacing Occurence Algo
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
                    pacingOccur=pacingOccur + 1
                    occurenceList.append('Pacing')
                    i=i+1
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
                    j=j+1
                else:
                    j=j+1

            except:
                break



        #Direct Occurence Algo
        k=0
        while(k<(len(locationParsed))):
            try:
                stringA = locationParsed[k]
                stringB = locationParsed[k+1]
                stringC = locationParsed[k+2]
                stringD = locationParsed[k+3]
                if((stringA == stringC) and (stringB == stringD)):
                    directOccur = directOccur+1
                    occurenceList.append('Direct')
                    k=k+1
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
                                    l=l+1
                                    randomOccur = randomOccur +1
                                    occurenceList.append('Random')

                else:
                    l=l+1
            except:
                break


        sns_plot = sns.countplot(x=occurenceList)
        bytes_image = io.BytesIO()
        plt.savefig(bytes_image, format='png')
        bytes_image.seek(0)
        total = pacingOccur + lappingOccur + directOccur + randomOccur
        pacingOccur = str(round(((pacingOccur / total) * 100), 2))
        lappingOccur = str(round(((lappingOccur / total) * 100), 2))
        directOccur = str(round(((directOccur / total) * 100), 2))
        randomOccur = str(round(((randomOccur / total) * 100),2))

        
                
        return pacingOccur, lappingOccur, directOccur, randomOccur, bytes_image
