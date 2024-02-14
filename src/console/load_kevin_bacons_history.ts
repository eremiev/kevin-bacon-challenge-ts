/**
 * DO NOT MODIFY THIS FILE
 */

import {loadHistory} from "../loadHistory.js";
import {LoadHistoryRequest} from "../requests.js";
import {Option, program} from "commander";

const depthOption = new Option('-d, --depth <degrees>', 'degrees of separation')
  .choices(['1', '2', '3'])
  .makeOptionMandatory(true);

program.addOption(depthOption).option('-v, --verbose', 'verbose output').allowExcessArguments(false);
program.parse(process.argv);

const options = program.opts();

const request: LoadHistoryRequest = {
  depth: options.depth,
  verbose: options.verbose
};
const response = await loadHistory(request);

console.log(`${response.actorCount} actors tangentially connected to Kevin Bacon are loaded`);
