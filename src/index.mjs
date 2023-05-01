import { readFileSync, writeFileSync } from 'fs';

import yaml from 'js-yaml';

let db = readFileSync('./data/main.abbr.yml', 'utf8');

let list = yaml.load(db);

// format translations

// main.json
writeFileSync('./data/formats/main.json', JSON.stringify(list, null, 3), 'utf8');

// abbrincode README
import abbrincode from './abbrincode.mjs';

abbrincode();