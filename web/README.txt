
Deploy and Run
==============

1 nodejs, npm need to be installed and in %path%

2 Restore npm packages
	Run in cmd.exe or terminal  "npm install"

3 Configure webservice URL
	Edit web\js\services\DataLoad.service.js
	Change this._baseServiceUrl = 'http://hotels.com/'; to point to the deployed WebApi
	
4 Build the web distribution
	Run  "npm run build"
	This step is needed for
	- compiling ES6 and JSX to ES5
	- bundling JS files
	- copying static files
	- injecting scripts and css into the boilerplate index.html
	
5 Open dist/index.html in a browser

Project structure
================
Uses the react/flux infrastructure.

/js
	/components	-> UI react components
	/actions	-> actions triggered by the UI and service
	/stores		-> stores, holding the state of the application
	/services	-> wrapper over the HTTP service call
	/dispatcher	-> the application dispatcher
	/constants	-> event/action type constants
	app.js		-> reactjs application entry point


/gulp			-> build scripts
gulpFile.js		-> build entry point

/ui-prototype	-> UI prototype, plain HTML+bootstrap

/images			-> images
