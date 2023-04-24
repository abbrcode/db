import { writeFileSync } from 'fs';

export default list => writeFileSync('./data/formats/main.json', JSON.stringify(list, null, 3), 'utf8');