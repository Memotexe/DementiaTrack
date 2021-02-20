import csv
import pandas as pd
from matplotlib import pyplot as plt
import seaborn as sns
import numpy as np
import sys
import operator
import io
import os
import json


class MovementAlgorithm:
    """
    These are the list of global variables used throughout the 
    application.
    """
    locationData = []
    sortedLocationData = []

    def isDirect(self,i):
        """
        This function is the determanent on whether or not  the set of
        locational data points follow the system on whether or not
        a patient or subject is going in a "direct" movement throughout
        the environment.

        Args:
            self: Allows connection to the global variables.
            i: the increment variable of the list of data.

        Returns:
            True if the it follows the logic.
            False if it doesn't follow.

        Exception:
            List out of bounds which means there isnt enough data to
            make a decision so it returns false.

        """
        try:
                stringA = self.sortedLocationData[i]
                stringB = self.sortedLocationData[i+1]
                stringC = self.sortedLocationData[i+2]
                stringD = self.sortedLocationData[i+3]

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
                    return True
                return False
        except:
            return False

    def isLapping(self,i):
        """
        This function is the determanent on whether or not  the set of
        locational data points follow the system on whether or not
        a patient or subject is going in a "Lapping" motion throughout
        the environment.

        Args:
            self: Allows connection to the global variables.
            i: the increment variable of the list of data.

        Returns:
            True if the it follows the logic.
            False if it doesn't follow.

        Exception:
            List out of bounds which means there isnt enough data to
            make a decision so it returns false.

        """

        try:
                stringA = self.sortedLocationData[i]
                stringB = self.sortedLocationData[i+1]
                stringC = self.sortedLocationData[i+2]
                stringD = self.sortedLocationData[i+3]
                stringE = self.sortedLocationData[i+4]
                stringF = self.sortedLocationData[i+5]
                stringG = self.sortedLocationData[i+6]
                stringH = self.sortedLocationData[i+7]
                stringI = self.sortedLocationData[i+8]




                if(((stringA != stringB) and (stringA != stringE) and
                        (stringA != stringF) and (stringA != stringC) and
                        (stringD != stringB) and (stringD != stringE) and
                        (stringD != stringF) and (stringD != stringC)and 
                        (stringB == stringF) and (stringC == stringE)) 
                        or ((stringA == stringD == stringF == stringI) 
                                and (stringB == stringG) 
                                and (stringC == stringH) 
                                and (self.locationNodeCheck(i) == True))):
                    return True


                return False
        except:
            return False


        

    def isPacing(self,i):
        """
        This function is the determanent on whether or not  the set of
        locational data points follow the system on whether or not
        a patient or subject is going in a "Pacing" motion throughout
        the environment.

        Args:
            self: Allows connection to the global variables.
            i: the increment variable of the list of data.

        Returns:
            True if the it follows the logic.
            False if it doesn't follow.

        Exception:
            List out of bounds which means there isnt enough data to
            make a decision so it returns false.

        """

        try:            
            stringA = self.sortedLocationData[i]
            stringB = self.sortedLocationData[i+1]
            stringC = self.sortedLocationData[i+2]
            stringD = self.sortedLocationData[i+3]
            if((stringA == stringC) and (stringB == stringD)):
                return True

            return False
        except:
            return False
            



    def classification(self):
        """
        This is the classification function this takes all the boolean results
        from the the 3 "is" functions being direct, lapping, and pacing, and stores
        the results into 4 integer variables all representing if the pattern occurs
        that data is then saved to a list globally using the self functionality of 
        classes.

        Args:
            self: Allows connection to the global variables

        Returns:
            None

        Variable Declarations:
            self.classificationList appends the occurrences data to be accessed
            later.

        Exception:
            None

        """
     #   occurenceList = []
      #  pacingOccur = 0
    #    lappingOccur = 0
   #     directOccur =0
  #      randomOccur = 0
 #       i=0#iterator
#        while(i<(len(self.sortedLocationData))):
            #if(self.isPacing(i)):
              #  pacingOccur = pacingOccur + 1
             #   i = i+1
            #    continue
           # if(self.isLapping(i)):
          #      lappingOccur = lappingOccur + 1
         #       i = i+1
        #        continue
       #     if(self.isDirect(i)):
      #          directOccur = directOccur +1
     #           i = i+1
    #            continue
   #         
  #          randomOccur = randomOccur +1
 #           i=i+1
#
    #    occurenceList.append(pacingOccur)
   #     occurenceList.append(lappingOccur)
  #      occurenceList.append(directOccur)
 #       occurenceList.append(randomOccur)
#
#        return occurenceList

 
    def PlottingMachine(self):
        """
        This function will plot the results data from analyzing it
        and present a graph.

        Args:
            self: Allows connection to the global variables.

        Returns:
            Nothing, only displays the graph.

        Exception:
            None.

        """

        objects = []
        objects = self.pattern
        y_pos = np.arange(len(objects))
        performance = []
        performance = self.occurrence
        plt.bar(objects,performance,align = 'center',alpha =0.5)
        plt.xticks(y_pos,objects)
        plt.ylabel('Amount of Occurrences')
        plt.xlabel('Patterns')
        plt.title('Report of Data')
        plt.savefig(buf, format='png')

        return buf



    def MovementAlgo(data):
        locationData = []
        sortedLocationData = []
        for i in data:
            locationData.append(i)

        #Remove anything without m, and then run the classification method and then the 
        #graph one.
        print(locationData)

        occurenceList = []
        pacingOccur = 0
        lappingOccur = 0
        directOccur =0
        randomOccur = 0
        i=0#iterator
        while(i<(len(self.sortedLocationData))):
            if(self.isPacing(i)):
                pacingOccur = pacingOccur + 1
                i = i+1
                continue
            if(self.isLapping(i)):
                lappingOccur = lappingOccur + 1
                i = i+1
                continue
            if(self.isDirect(i)):
                directOccur = directOccur +1
                i = i+1
                continue
            
            randomOccur = randomOccur +1
            i=i+1

        occurenceList.append(pacingOccur)
        occurenceList.append(lappingOccur)
        occurenceList.append(directOccur)
        occurenceList.append(randomOccur)       

        return occurenceList
