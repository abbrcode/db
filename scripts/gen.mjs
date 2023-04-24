import { readFileSync, writeFileSync } from 'fs';
import yaml from 'js-yaml';

let db = readFileSync('./main.abbr.yml', 'utf8');

let obj = yaml.load(db);

writeFileSync('./formats/main.json', JSON.stringify(obj, null, 3), 'utf8');