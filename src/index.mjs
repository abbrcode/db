import { readFileSync } from 'fs';

import yaml from 'js-yaml';

let db = readFileSync('./data/main.abbr.yml', 'utf8');

let list = yaml.load(db);

// main.json
import json from './json.mjs';

json(list);