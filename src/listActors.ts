import {ListActorsRequest} from "./requests.js";
import {ListActorsResponse} from "./responses.js";
import {fetchData} from "./actorRepository.js";
import {ACTOR_NAME} from "./loadHistory.js";
import {Graph} from "./Graph.js";

export async function listActors(request: ListActorsRequest): Promise<ListActorsResponse> {
    // TODO: implement using only local storage stored during the call to ./load_kevin_bacons_history.sh

    // Fetch data
    const data = await fetchData();

    // Build a graph with the provided data
    const graph = new Graph(data);

    // Remove the current actor from the graph
    graph.getAdjacencyList().delete(ACTOR_NAME);

    // Retrieve the list of actors in the graph by getting the keys of its adjacency list, or assign an empty array if the list is undefined
    const actors = [...graph.getAdjacencyList().keys()] || [];

    return {actors};
}