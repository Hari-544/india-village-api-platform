const XLSX = require('xlsx');
const pool = require('./config/db');
const fs = require('fs');
const path = require('path');

const datasetFolder =
'C:\\Users\\hari4\\Downloads\\all-india-villages-master-list-excel\\dataset';

async function importFiles() {

    const files = fs.readdirSync(datasetFolder);

    for (const file of files) {

        if (file.endsWith('.xls') || file.endsWith('.xlsx')) {

            console.log(`Reading ${file}`);

            const workbook = XLSX.readFile(
                path.join(datasetFolder, file)
            );

            const sheetName = workbook.SheetNames[0];

            const data = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName]
            );

            for (const row of data) {

    const state = row['STATE NAME'] || '';
    const district = row['DISTRICT NAME'] || '';
    const subdistrict = row['SUB-DISTRICT NAME'] || '';
    const village = row['Area Name'] || '';

    // Skip invalid header/group rows
    if (
        district === state ||
        subdistrict === state ||
        village === state
    ) {
        continue;
    }

    try {

        await pool.query(
            `INSERT INTO villages_data
            (state,district,sub_district,village)
            VALUES($1,$2,$3,$4)`,
            [
                state,
                district,
                subdistrict,
                village
            ]
        );

    } catch(err) {
        console.log(err.message);
    }
}

            console.log(`${file} imported`);
        }
    }

    console.log('ALL FILES IMPORTED');
}

importFiles();