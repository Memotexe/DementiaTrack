1.) Create a Pipenv in the React_Redux_Django_Template:
	- pipenv shell
2.) Install Pipfile packages:
	- pipenv install
3.) Install Dependencies for npm
	- npm -c *This will install the dependencies from the package-lock.json*
	- If you get issues with this ^ , perform this instead after a npm install:
		- npm i -D webpack-cli@4.2.0
4.) In one command line run *While in the Directory that has the .py file specified* :
	- python manage.py runserver 
		"The way this works is this will run the server so you can access the http link
		 on your browser of choice" -Chase
5.) In another command line run *While in the Directory that has webpack.config.js *:
	- npm run dev
		"This will allow you to make updates to the page without constantly compiling,
		 in other words, when you make a change and save, it will auto update the site
		 when you refresh the page." -Chase
