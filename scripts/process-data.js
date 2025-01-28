const csv = require('csvtojson');
const fs = require('fs');

const TSV_TO_PROCESS = [
    'art',
    'vehicles',
    'scouts',
    'radio',
    'camps',
];

async function main() {
    await Promise.all(TSV_TO_PROCESS.map(async (fileName) => {
        const jsonArray = await csv({delimiter:'\t'}).fromFile(`data/2024/WWW Content 2024 - ${fileName}.tsv`);
        fs.writeFile(`src/data/${fileName}.json`, JSON.stringify(jsonArray), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing ${fileName}.json`, err);
            } else {
                console.log(`Generated ${fileName}.json`);
            }
        });
    }));

    const events = JSON.parse(await fs.readFileSync('data/2024/WWW Content 2024 - events.json'));
    fs.writeFile('src/data/events.json', JSON.stringify(events['coalesce']['coalesce']), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing events.json`, err);
        } else {
            console.log(`Generated events.json`);
        }
    });
}


main();
