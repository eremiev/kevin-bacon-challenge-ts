/**
 * DO NOT MODIFY THIS FILE
 */

import {listActors} from "../listActors.js";
import {ListActorsRequest} from "../requests.js";
import {program} from "commander";

program.option('-v, --verbose', 'verbose output').allowExcessArguments(false);
program.parse(process.argv);

const options = program.opts();

const request: ListActorsRequest = {
  verbose: options.verbose
};
const response = await listActors(request);

const actors = response.actors;
if (actors) {
  for (const actor of actors) {
    console.log(actor);
  }
} else {
  console.log("No actors found. Please load the storage.")
}