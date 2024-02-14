/**
 * DO NOT MODIFY THIS FILE
 */

import {degreesAway} from "../degreesAway.js";
import {DegreesAwayRequest} from "../requests.js";
import {program} from "commander";

program.argument('name', 'name of actor').option('-v, --verbose', 'verbose output').allowExcessArguments(false);
program.parse(process.argv);

const options = program.opts();
const name = program.args[0];

const request: DegreesAwayRequest = {
  name,
  verbose: options.verbose
};
const response = await degreesAway(request);

const degrees = response.degrees;
if (degrees < 0) {
  console.log(`${degrees} degrees.  ${name}, is unknown`);
} else {
  console.log(`${degrees} degrees`);
  const movies = response.movies;
  if (movies) {
    for (const movie of movies) {
      console.log(`${movie.title} date ${movie.year || "unknown"} ${movie.innerActor}, ${movie.outerActor}`);
    }
  }
}
