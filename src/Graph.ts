import {getMovieTopCast, getMovies} from "./imdbService.js";
import {LinkedMovie, DegreesAwayResponse} from "./responses.js";
import {Movie} from "./actorRepository.js";

/**
 * This class represents a graph data structure where nodes are
 * actors and edges are movies in which two actors appear together.
 */
export class Graph {

    /**
     * Adjacency list of the graph where each actor is a key and the value is a list
     * of movies in which this actor appears with other actors.
     * @private
     */
    private adjacencyList: Map<string, Movie[]>;

    /**
     * Constructor to create an instance of Graph class.
     * If a Map object is provided, it is used to initialize the adjacency list.
     * @param graph
     */
    constructor(graph: Map<string, Movie[]> = new Map()) {
        this.adjacencyList = graph;
    }

    /**
     * Adds a new node/actor to the graph if it doesn't already exist.
     * @param node
     */
    addNode(node: string) {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    /**
     * Adds an undirected edge between two actors and a movie in which they appear together.
     * @param source
     * @param destination
     * @param movie
     * @param year
     */
    addEdge(source: string, destination: string, movie: string, year: number): void {
        // Adds the nodes if they are not already present in the graph.
        this.addNode(source);
        this.addNode(destination);
        // Adds the movie to the adjacency list of both actors.
        this.adjacencyList.get(source)!.push({title: movie, year: year, cast: destination});
        this.adjacencyList.get(destination)!.push({title: movie, year: year, cast: source});
    }

    /**
     * Returns the adjacency list of the graph.
     */
    getAdjacencyList() {
        return this.adjacencyList;
    }

    /**
     Fills the graph with movies from the given actor, up to a certain depth level.
     @param actor - An object containing the actor's id and name.
     @param depth - The maximum number of levels to traverse from the actor.
     @returns A promise that resolves when the graph is filled with all movies and actors up to the given depth.
     */
    async fillGraphWithActorMovies(actor: { id: string, name: string }, depth: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const queue = [{actorId: actor.id, actorName: actor.name, level: 0}];
            const visited = new Set<string>([actor.name]);

            while (queue.length > 0) {
                const {actorId, actorName, level} = queue.shift()!;
                if (level >= depth) {
                    continue;
                }
                const actorMovies = await getMovies(actorId);
                if (!actorMovies.size) {
                    continue;
                }
                for (const movie of actorMovies.values()) {
                    const topCast = await getMovieTopCast(movie.id);
                    if (!topCast.size) {
                        continue;
                    }
                    for (const cast of topCast.values()) {
                        if (!cast) {
                            continue;
                        }
                        const coActorName = cast.name;
                        if (coActorName && !visited.has(coActorName)) {
                            visited.add(coActorName);
                            this.addNode(coActorName);
                            this.addEdge(actorName, coActorName, movie.title, movie.year);
                            queue.push({actorId: cast.id, actorName: coActorName, level: level + 1});
                        }
                    }
                }
            }
            resolve();
        });
    }

    /**
     Calculates the degrees of separation between two actors in the graph.
     @param startNode The name of the starting actor node.
     @param endNode The name of the target actor node to reach.
     @returns DegreesAwayResponse An object with the degrees of separation and an array of linked movies between the two actors.
     */
    degreesOfSeparation(startNode: string, endNode: string): DegreesAwayResponse {
        const linkedMovies: LinkedMovie[] = [];
        const visited: { [actor: string]: boolean } = {};
        const queue: { actor: string; distance: number; movie: LinkedMovie | null; parent: any | null }[] = [];
        queue.push({actor: endNode, distance: 0, movie: null, parent: null});

        while (queue.length > 0) {
            const {actor, distance, movie, parent} = queue.shift()!;

            if (visited[actor]) {
                continue;
            }

            visited[actor] = true;
            if (actor === startNode) {
                // Construct linked movies array based on parent nodes and visited actors
                const visitedNamesArray = Object.keys(visited);
                let lastActor: string = actor;
                const degrees = distance - 1;

                for (let i = 0; i < visitedNamesArray.length; i++) {
                    for (const movie of this.getAdjacencyList().get(visitedNamesArray[i]) ?? []) {
                        if (movie.cast == visitedNamesArray[i + 1]) {
                            lastActor = movie.cast;
                            linkedMovies.push({
                                title: movie.title,
                                year: movie.year,
                                innerActor: movie.cast,
                                outerActor: visitedNamesArray[i]
                            });
                        }
                        if (!visitedNamesArray[i + 1] && movie.cast == lastActor) {
                            linkedMovies.push({
                                title: movie.title,
                                year: movie.year,
                                innerActor: actor,
                                outerActor: movie.cast
                            });
                        }
                    }
                }

                return {degrees, movies: linkedMovies.reverse()};
            }

            for (const movie of this.getAdjacencyList().get(actor) ?? []) {
                const coActor = movie.cast;
                if (!visited[coActor]) {
                    const linkedMovie: LinkedMovie = {
                        title: movie.title,
                        year: movie.year,
                        innerActor: movie.cast,
                        outerActor: actor
                    };
                    queue.push({actor: coActor, distance: distance + 1, movie: linkedMovie, parent: {actor, movie}});
                }
            }
        }

        return {degrees: -1};
    }
}