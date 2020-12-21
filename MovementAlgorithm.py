import csv
import pandas as pd
from matplotlib import pyplot as plt
import seaborn as sns
import numpy as np
import sys
import operator


class DTwpAlgo:
    """
    These are the list of global variables used throughout the 
    application.
    """
    file = ""
    cCSVfName = ""
    dateData = []
    timeData = []
    locationData = []
    pattern = []
    occurrence = []
    classificationList = []

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
                stringA = self.locationData[i]
                stringB = self.locationData[i+1]
                stringC = self.locationData[i+2]
                stringD = self.locationData[i+3]

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
                stringA = self.locationData[i]
                stringB = self.locationData[i+1]
                stringC = self.locationData[i+2]
                stringD = self.locationData[i+3]
                stringE = self.locationData[i+4]
                stringF = self.locationData[i+5]
                stringG = self.locationData[i+6]
                stringH = self.locationData[i+7]
                stringI = self.locationData[i+8]




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
            stringA = self.locationData[i]
            stringB = self.locationData[i+1]
            stringC = self.locationData[i+2]
            stringD = self.locationData[i+3]
            if((stringA == stringC) and stringB == stringD):
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

        pacingOccur = 0
        lappingOccur = 0
        directOccur =0
        randomOccur = 0
        i=0#iterator
        while(i<(len(self.locationData))):
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

        self.classificationList.append(randomOccur)
        self.classificationList.append(directOccur)
        self.classificationList.append(lappingOccur)
        self.classificationList.append(pacingOccur)


 
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

        with open(self.cCSVfName,"r") as csv_file2:
            csv_reader2 = csv.reader(csv_file2,delimiter=',')
            for lines2 in csv_reader2:
                self.pattern.append(lines2[0])
                self.occurrence.append(lines2[1])


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
        plt.show()

               
    def WriteCSV(self):
        """
        This function will write the results of the data to the
        newly created the CSV file to later be sorted by the 
        sorting method.

        Args:
            self: Allows connection to the global variables.

        Returns:
            Nothing, only writes the new CSV file and saves. 

        Exception:
            None.

        """

        with open(self.cCSVfName,'w',newline = '') as f:
            thewriter=csv.writer(f)
            thewriter.writerow(['Pacing',self.classificationList[3]])
            thewriter.writerow(['Lapping',self.classificationList[2]])
            thewriter.writerow(['Random',self.classificationList[0]])
            thewriter.writerow(['Direct',self.classificationList[1]])

    def DataEvaluation(self):
        """
        This function presents the results of the data to the console.

        Args:
            self: Allows connection to the global variables.

        Returns:
            Nothing, simply prints the data out to the console.

        Exception:
            None.

        """

        print("Here is a list of all the occurrences and their total count on the data:")
        print("----------------------------------------------------")
        print("Direct Movement Occurrences:%s" % self.classificationList[1])
        print("----------------------------------------------------")
        print("Lapping Movement Occurrence:%s" % self.classificationList[2])
        print("----------------------------------------------------")
        print("Pacing Movement Occurrence:%s" % self.classificationList[3])
        print("----------------------------------------------------")
        print("Random Movement Occurrences:%s" % self.classificationList[0])
        print("----------------------------------------------------")



    def CSVsorter(self):
        """
        This function is used to sort the newly made .CSV file and 
        rewrites in sorting it from least amount of occurrences to 
        most amount.

        Args:
            self: Allows connection to the global variables.

        Returns:
            Nothing, only writes the the newly sorted .CSV file.

        Exception:
            None.

        """

        data = csv.reader(open(self.cCSVfName),delimiter=',')
        sortedlist = sorted(data,key= lambda x: int(x[1]))

        with open(self.cCSVfName,'w',newline ='') as f:
            fileWriter = csv.writer(f,delimiter=',')
            for row in sortedlist:
                fileWriter.writerow(row)
    

    def main(self):
        """
        This function is the main method, this is where the user can
        choose the option that suits their dataset from Days worth to 
        a Years worth of data. To be properly analyzed, displayed, and 
        represented for the user to understand.

        Args:
            self: Allows connection to the global variables.

        Returns:
            All of the outputs from the methods used in this class
            to properly display results and graphs.

        Exception:
            None.

        """

        UserInput = 0
        print("1: Analyze a Day worth of data from a .CSV file")
        print("2: Analyze a Month worth of data from a .CSV file")
        print("3: Analyze a Year worth of data from a .CSV file")
        print("4: Exit Console")
        print("\n")
        UserInput = input("What would you like to do?(Choose between 1->4): ")
        if(UserInput == "1"):
                FileInput = input(("Enter the .CSV as it's title shows along with the (.csv) extension: "))
                self.file = FileInput
                with open(self.file,"r") as csv_file:
                 csv_reader = csv.reader(csv_file, delimiter=',')
                 for lines in csv_reader:
                    self.dateData.append(lines[0])
                    self.timeData.append(lines[1])
                    self.locationData.append(lines[2])

                self.dateData.pop(0)
                self.timeData.pop(0)
                self.locationData.pop(0)

                self.classification()
                WriteCSVfName = input("Please enter the name for the new results CSV with the (.csv) extension: ")
                print("\n")
                self.cCSVfName = WriteCSVfName
                self.WriteCSV()
                self.DataEvaluation()
                self.CSVsorter()
                self.PlottingMachine()

        if(UserInput == "2"):
                FileInput = input(("Enter the .CSV as it's title shows along with the (.csv) extension: "))
                self.file = FileInput
                with open(self.file,"r") as csv_file:
                 csv_reader = csv.reader(csv_file, delimiter=',')
                 for lines in csv_reader:
                    self.dateData.append(lines[0])
                    self.timeData.append(lines[1])
                    self.locationData.append(lines[2])

                self.dateData.pop(0)
                self.timeData.pop(0)
                self.locationData.pop(0)

                self.classification()
                WriteCSVfName = input("Please enter the name for the new results CSV with the (.csv) extension: ")
                print("\n")
                self.cCSVfName = WriteCSVfName
                self.WriteCSV()
                self.DataEvaluation()
                self.CSVsorter()
                self.PlottingMachine()
        if(UserInput == "3"):
                FileInput = input(("Enter the .CSV as it's title shows along with the (.csv) extension: "))
                self.file = FileInput
                with open(self.file,"r") as csv_file:
                 csv_reader = csv.reader(csv_file, delimiter=',')
                 for lines in csv_reader:
                    self.dateData.append(lines[0])
                    self.timeData.append(lines[1])
                    self.locationData.append(lines[2])

                self.dateData.pop(0)
                self.timeData.pop(0)
                self.locationData.pop(0)

                self.classification()
                WriteCSVfName = input("Please enter the name for the new results CSV with the (.csv) extension: ")
                print("\n")
                self.cCSVfName = WriteCSVfName
                self.WriteCSV()
                self.DataEvaluation()
                self.CSVsorter()
                self.PlottingMachine()
        if(UserInput == "4"):
            print("Goodbye!")
            sys.exit(0)
          
        

algo = DTwpAlgo()
algo.main()



