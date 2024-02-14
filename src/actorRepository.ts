import fs from "fs";

export interface Movie {
    title: string;
    year: number;
    cast: string;
}

/**
 * Define a function to save data to a JSON file
 * @param data
 * @param path
 */
export function saveData(data: {}, path: string = "storage/actors.json"): boolean {
    try {
        if (typeof data !== "object" || data === null) {
            throw new Error("Data must be an object");
        }
        const jsonString = JSON.stringify(data);
        fs.writeFileSync(path, jsonString);

        return true;
    } catch (e) {

        return false;
    }
}

/**
 * Define an asynchronous function to fetch data from a
 * JSON file and return it as a `Map` of `Movie` arrays
 * @param path
 */
export async function fetchData(path: string = "storage/actors.json"): Promise<Map<string, Movie[]>> {

    return new Promise((resolve, reject) => {
        try {
            const graphData = new Map<string, Movie[]>();
            const jsonStrings = fs.readFileSync(path, "utf-8");
            const data = JSON.parse(jsonStrings);

            for (const [actor, connections] of data) {
                for (const {title, year, cast} of connections) {
                    const existingDestination = graphData.get(actor);
                    if (existingDestination) {
                        existingDestination.push({title, year, cast});
                    } else {
                        graphData.set(actor, [{title, year, cast}]);
                    }
                }
            }
            resolve(graphData);
        } catch (e) {
            reject(new Error("Something went wrong!"));
        }
    });
}