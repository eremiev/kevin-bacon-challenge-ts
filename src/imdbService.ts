import {ImdbSimulator} from "@apeloquin-agilysys/imdb-simulator";

interface Actor {
    id: string;
    name: string;
}

interface Movie {
    id: string;
    title: string;
    year: number;
}

/**
 Retrieves the filmography of an actor using the ImdbSimulator class and returns a map of movies.
 @param actorId - The id of the actor whose filmography is to be retrieved.
 @returns A promise that resolves to a Map containing the movies associated with the actor's filmography.
 */
export async function getMovies(actorId: string): Promise<Map<string, Movie>> {

    const imdbSimulator = new ImdbSimulator();
    const movies = new Map<string, Movie>();

    return new Promise(async (resolve, reject) => {
        try {
            const filmography = await imdbSimulator.getAllFilmography(actorId);
            if (filmography) {
                for (const film of filmography.filmography) {
                    const movieId = film.id.split("/").filter((str: string) => str.startsWith("tt"))[0];
                    if (!movies.has(movieId)) {
                        movies.set(movieId, {id: movieId, title: film.title, year: film.year});
                    }
                }
            }
            resolve(movies);
        } catch (e) {
            reject(new Error("Something went wrong!"));
        }
    });
}

/**
 * This function takes an array of movie ids and returns a map of actors who have appeared in those movies as the top cast,
 * along with their name and imdb id.
 * @param movieId - Movie id
 * @returns A promise that resolves with a map of actors who have appeared in those movies
 * as the top cast, along with their name and imdb id.
 */
export async function getMovieTopCast(movieId: string): Promise<Map<string, Actor>> {

    const imdbSimulator = new ImdbSimulator();
    const actors = new Map<string, Actor>();

    return new Promise(async (resolve, reject) => {
        try {
            const topCast = await imdbSimulator.getTopCast(movieId);
            if (topCast) {
                for (const cast of topCast) {
                    const actorId = cast.split("/").filter((str: string) => str.startsWith("nm"))[0];
                    const actorFilmography = imdbSimulator.getAllFilmography(actorId);
                    const actorName = actorFilmography?.base.name;
                    if (!actors.has(actorId)) {
                        actors.set(actorId, {id: actorId, name: actorName});
                    }
                }
            }
            resolve(actors);
        } catch (e) {
            reject(new Error("Something went wrong!"));
        }
    });
}