require('dotenv').config();

const XLSX = require('xlsx');
const pool = require('./config/db');
const fs = require('fs');
const path = require('path');

const datasetFolder = process.env.DATASET_FOLDER || path.join(__dirname, 'dataset');

async function importFiles() {

    try {

        const files = fs.readdirSync(datasetFolder);

        for (const file of files) {

            if ( file.endsWith('.xls') || file.endsWith('.xlsx') || file.endsWith('.ods')) {

                console.log(`\nReading ${file}`);

                const workbook = XLSX.readFile(
                    path.join(datasetFolder, file)
                );

                const sheetName = workbook.SheetNames[0];

                const data = XLSX.utils.sheet_to_json(
                    workbook.Sheets[sheetName]
                );

                const values = [];

                for (const row of data) {

                    const state =
                        row['STATE NAME'] || '';

                    const district =
                        row['DISTRICT NAME'] || '';

                    const subdistrict =
                        row['SUB-DISTRICT NAME'] || '';

                    const village =
                        row['Area Name'] || '';

                    // Skip invalid rows
                    if (
                        district === state ||
                        subdistrict === state ||
                        village === state
                    ) {
                        continue;
                    }

                    values.push([
                        state,
                        district,
                        subdistrict,
                        village
                    ]);
                }

                console.log(
                    `${file} -> total valid rows: ${values.length}`
                );

                const chunkSize = 2000;

                for (
                    let i = 0;
                    i < values.length;
                    i += chunkSize
                ) {

                    const chunk =
                        values.slice(i, i + chunkSize);

                    const query = `
                        INSERT INTO villages_data
                        (state,district,sub_district,village)
                        VALUES
                        ${chunk.map((_, index) => {

                            const base = index * 4;

                            return `(
                                $${base + 1},
                                $${base + 2},
                                $${base + 3},
                                $${base + 4}
                            )`;

                        }).join(',')}
                        ON CONFLICT DO NOTHING
                    `;

                    const flatValues = chunk.flat();

                    try {

                        await pool.query(query, flatValues);

                        console.log(
                            `${file} -> inserted ${Math.min(i + chunk.length, values.length)} rows`
                        );

                    } catch(err) {

                        console.log(
                            `Error in ${file}:`,
                            err.message
                        );
                    }
                }

                console.log(`${file} COMPLETED`);
            }
        }

        console.log('\nALL FILES IMPORTED SUCCESSFULLY');

        process.exit();

    } catch(err) {

        console.log('IMPORT ERROR:', err.message);
    }
}

importFiles();