import { readFileSync, writeFileSync } from 'fs';

import yaml from 'js-yaml';

let db = readFileSync('./data/main.abbr.yml', 'utf8');

let list = yaml.load(db);

// main.json
writeFileSync('./data/formats/main.json', JSON.stringify(list, null, 3), 'utf8');

// abbr-in-code
import abbrincode from './abbrincode.mjs';

abbrincode();