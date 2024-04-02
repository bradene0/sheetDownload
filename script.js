function makeCopy() {
var formattedDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd' 'HH:mm:ss");
var name = SpreadsheetApp.getActiveSpreadsheet().getName() + " Copy " + formattedDate;
var destination = DriveApp.getFolderById("15zslK7yZx5sUL2cL1Xjhe7cU53rAYngl");
var file = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId())
file.makeCopy(name, destination);
}
//Currently not working