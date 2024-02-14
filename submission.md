
# Submission


## Completed tasks:

### Created actorRepository.ts file
This file is responsible for saving and fetching actors' data. This allows us to 
store and retrieve information about actors as needed.

### Created actorRepository.test.ts file
This file tests the logic for storing and fetching the data. This ensures that the actorRepository.ts 
file is working as expected and that we are able to properly store and retrieve actor data.

### Created imdbService.ts file
This file integrates with the IMDB simulator API and enables us to obtain information 
about movies for specific actors, as well as top casts for a specific movie. 
This allows us to easily retrieve data about actors and movies.

### Created Graph.ts class
This class contains the main logic for the calculation. Once we have the necessary data, 
the Graph class helps us to build a graph. We can then use this graph to calculate degrees 
of separation between actors. This is the core functionality of the application.

### Created storage folder
Because the data needs to be stored locally, I created a storage folder where data is stored 
in a JSON file. This enables us to store and retrieve data as needed.