const xlsx = require("xlsx");
const fs = require("fs");

class ExcelImportService {
  static importExcelAsJsonData(filePath) {
    // Read the file
    const workbook = xlsx.readFile(filePath);

    // Assuming the first sheet is the one we want
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    return jsonData;
  }
}

module.exports = ExcelImportService;
