import { readFileSync, writeFileSync } from 'fs';

let capitalize = text => text[0].toUpperCase() + text.substring(1);

export default () => {
   let abbrs = JSON.parse(readFileSync('./data/formats/main.json', 'utf8'));
   let degrees = JSON.parse(readFileSync('./data/abbrincode/degrees.json', 'utf8'));

   let alphabet = 'abcdefghijklmnopqrstuvwxyz';

   let list = '## List\n';
   let main = '';

   let section = (title, filterCb) => {
      list += `[${capitalize(title)}](#${title})`;
      main += `\n### ${capitalize(title)}\n\n`;

      let abbrsOfLetter = abbrs.filter(filterCb);

      for (let abbrObj of abbrsOfLetter) {
         main += `- ${abbrObj.word}`;

         for (let abbr of abbrObj.abbrs) {
            main += ` • ${degrees[abbr.degree]} ${abbr.abbr}`;

            if (abbr.degree === 'yellow') main += ` { ${abbr.context} }`;
         }

         main += '\n';
      }
   };

   // sections
   list += '- ';

   section('numbers', val => val.word.match(/\d/));

   list += '\n- ';

   for (let letter of alphabet) {
      section(letter, val => letter === val.word[0]);

      list += ' ';
   }

   // abbrs length
   main += `\n<br/>\n\n---\n\n<br/>\n\n${abbrs.length} abbrs in the list.`;

   let header = readFileSync('./data/abbrincode/header.md', 'utf8');
   let footer = readFileSync('./data/abbrincode/footer.md', 'utf8');

   writeFileSync('../abbreviations-in-code/README.md', `${header}\n${list}\n${main}\n${footer}`, 'utf8');
};