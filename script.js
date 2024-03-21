function copySheetToNewSpreadsheet() { 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var newSS = SpreadsheetApp.create("Copy of " + ss.getName());
  var sheets = ss.getSheets();
  sheets.forEach(function(sheet) {
    var newSheet = newSS.insertSheet();
    sheet.copyTo(newSheet);
    newSheet.setName(sheet.getName());
  });
  newSS.deleteSheet(newSS.getSheetByName("Sheet1"));
}
