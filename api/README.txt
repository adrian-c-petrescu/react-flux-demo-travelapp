
Deploy and run
==============

1. Visual Studio >= 2012 needs to be installed

2. Open Hotels.sln, restore Nuget packages, build

3. Deploy. Do either of these steps
	IIS - add new website, pointing to /api/Hotels folder
	Run the Hotels project from VS (Ctrl+F5)
	
4. Configure /web/js/service/Dataload.service.js with the API base URL (e.g. http://localhost/)


Project structure
=================
Plain WebApi project, with 3 layers

- Controllers (/api/Hotels/Controllers) - thin, delegating the data retrieval and filtering logic
- Logic (/api/Hotels/Code/Logic) - builds and applies the filter, builds the output DTO
- Persistence (/api/Hotels/Code/Persistence) - singleton repository that deserializes the json file to a strong-type model
- Data (/api/Hotels/App_Data) - contains the JSON file

Other
======
Users common libraries - Autofac for Dependency injection, NUnit for unit tests
