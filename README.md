# DementiaTrack
# Senior Design Research/Application Project

# This project runs using python 3.8, please use this version to avoid issues

# 1.) Create a Pipenv in the React_Redux_Django_Template:
	- pipenv shell
# 2.) Install Pipfile packages:
	- pipenv install
    - If you get issues try pipenv install --skip-lock
# 3.) Install Dependencies for npm
	- npm -c *This will install the dependencies from the package-lock.json*
	- If you get issues with this ^ , perform this instead after a npm install:
		- npm i -D webpack-cli@4.2.0
# 4.) In one command line run *While in the Directory that has the .py file specified* :
	- python manage.py runserver 
		"The way this works is this will run the server so you can access the http link
		 on your browser of choice" -Chase
# 5.) In another command line run *While in the Directory that has webpack.config.js *:
	- npm run dev
		"This will allow you to make updates to the page without constantly compiling,
		 in other words, when you make a change and save, it will auto update the site
		 when you refresh the page." -Chase
# 6.) To run application in pair with MySQL
    - Install MySQL, when installing you can set the password to 'password' and the
      application will be operable once the server is started and data is added. or if you set a different
      password it will need changed in the settings.py file under leadmanager
    - In regards to adding data to the MySQL server simply open MySQL Workbench and create the schema dementia_track
      then import all necessary data files
#7.) To run email on overview
    -First create file under leadmanager/database called emailpassword.txt and put in '3&MSugsWHGbi2txh'
    -Change reciever address on line 45 in api.py to whatever email address you want to send to.