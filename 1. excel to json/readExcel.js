var xlsx = require("xlsx");
var fs = require("fs");
var data = "excelFile.xlsx";

//read the file using workbook(wb)
var wb = xlsx.readFile(data);

//read sheet from the workbook
var sheetName = wb.SheetNames[0];

var sheetValue = wb.Sheets[sheetName];
//console.log(sheetValue);
var excelData = xlsx.utils.sheet_to_json(sheetValue);
fs.writeFileSync('./excelExport.json', JSON.stringify(excelData, null, 2));
console.log(excelData);
