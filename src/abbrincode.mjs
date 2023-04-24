import { readFileSync, writeFileSync } from 'fs';

export default () => {
   let list = JSON.parse(readFileSync('./data/formats/main.json', 'utf8'));
   let degrees = JSON.parse(readFileSync('./data/abbrincode/degrees.json', 'utf8'));

   let text = '';
   let section = '';

   for (let obj of list) {
      let capitalLetter = obj.word[0];

      if (capitalLetter.match(/\d/)) capitalLetter = 'Number';

      if (section !== capitalLetter) {
         section = capitalLetter;

         text += `\n### ${section[0].toUpperCase() + section.substring(1)}\n\n`;
      }

      //
      text += `- ${obj.word}`;

      for (let abbr of obj.abbrs) {
         text += ` • ${degrees[abbr.degree]} ${abbr.abbr}`;

         if (abbr.degree === 'yellow') text += ` { ${abbr.context} }`;
      }

      text += '\n';
   }

   text += '\n';

   let header = readFileSync('./data/abbrincode/header.md', 'utf8');
   let footer = readFileSync('./data/abbrincode/footer.md', 'utf8');

   writeFileSync('../abbreviations-in-code/README.md', header + text + footer, 'utf8');
};