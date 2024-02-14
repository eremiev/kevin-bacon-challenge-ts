import {LoadHistoryRequest} from "./requests.js";
import {LoadHistoryResponse} from "./responses.js";
import {saveData} from "./actorRepository.js";
import {Graph} from "./Graph.js";

export const ACTOR_ID = "nm0000102";
export const ACTOR_NAME = "Kevin Bacon";

export async function loadHistory(request: LoadHistoryRequest): Promise<LoadHistoryResponse> {
    // TODO: implement using imdb-simulator; store storage locally necessary to support calls to
    //  ./list_actors_names_we_know.sh and ./degrees_away_from_kevin_bacon.ts

    // Use the ImdbSimulator which mocks two endpoints of the IMDB API
    //
    // https://rapidapi.com/apidojo/api/imdb8/specs
    //   /actors/get-all-filmography
    //   /title/get-top-cast
    //
    // This is an intentionally constrained dataset, there are a limited number of actorIds and titleIds that will give
    // responses; when you request outside of that list the method will return undefined and that should be considered the
    // end of that traversal (i.e. the actor has no additional movies or the movie has no additional cast).
    //
    // Example start:
    // const imdbSimulator = new ImdbSimulator();
    // const filmography = imdbSimulator.getAllFilmography(KEVIN_BACON_ACTOR_ID);

    // Build a Graph
    const graph = new Graph();

    // Fill the graph with the data
    await graph.fillGraphWithActorMovies({id: ACTOR_ID, name: ACTOR_NAME}, request.depth);

    // Save the data locally
    saveData([...graph.getAdjacencyList()].sort());

    // Remove the current actor from the graph
    graph.getAdjacencyList().delete(ACTOR_NAME);

    return {actorCount: graph.getAdjacencyList().size};
}