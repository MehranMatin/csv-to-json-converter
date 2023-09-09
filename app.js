const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv').parse;
const FileSystem = require('fs');

// Create a new folder
const timestamp = Date.now(); // Get the current timestamp
const folderName = `output_folder_${timestamp}`;
FileSystem.mkdirSync(folderName);

CSVToJSON()
  .fromFile('./inputData.csv')
  .then((source) => {
    console.log(source);

    // optional to add extra row data to the json
    source.push({});

    // save as json data
    const jsonData = JSON.stringify(source);
    FileSystem.writeFileSync(`./${folderName}/destinationJSON.json`, jsonData);

    // resave as refactored csv
    const csv = JSONToCSV(source, {
      fields: ['name', 'storageArea', 'unitOfMeasure', 'supplier']
    });
    FileSystem.writeFileSync(`./${folderName}/destinationCSV.csv`, csv);
  });
