function downloadSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var fileId = ss.getId();
  var url = "https://docs.google.com/spreadsheets/d/" + fileId + "/export?format=xlsx"; // change 'xlsx' to 'csv' if you prefer CSV format

  var token = ScriptApp.getOAuthToken();
  var response = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  var fileName = ss.getName() + ".xlsx"; // change extension to '.csv' if using CSV format
  var blob = response.getBlob();
  blob.setName(fileName);
  
  // hardcoded folder path to save the file
  var folderPath = "/MyFolder/Subfolder"; // Change this to your desired folder path
  
  // save the file to the specified folder
  var folder = DriveApp.getFoldersByName(folderPath);
  if (folder.hasNext()) {
    folder.next().createFile(blob);
    SpreadsheetApp.getUi().alert('File downloaded successfully!');
  } else {
    SpreadsheetApp.getUi().alert('Folder not found. Please make sure the folder path is correct.');
  }
}
