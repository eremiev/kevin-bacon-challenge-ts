import {DegreesAwayRequest} from "./requests.js";
import {DegreesAwayResponse} from "./responses.js";
import {fetchData} from "./actorRepository.js";
import {Graph} from "./Graph.js";
import {ACTOR_NAME} from "./loadHistory.js";

export async function degreesAway(request: DegreesAwayRequest): Promise<DegreesAwayResponse> {
    // TODO: implement using only local storage stored during the call to ./load_kevin_bacons_history.sh

    // Fetch data
    const data = await fetchData();

    // Build a graph with the provided data
    const graph = new Graph(data);

    // Capitalize first letters of the requested name
    const capitalizedName = request.name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    // Calculate the degrees of separation between the current actor and the target actor (capitalizedName)
    return graph.degreesOfSeparation(ACTOR_NAME, capitalizedName);
}