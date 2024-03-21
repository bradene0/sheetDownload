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
  
  // prompt user to download the file
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
    'Download File',
    'Enter the download location (e.g., /Downloads) where you want to save the file:',
    ui.ButtonSet.OK_CANCEL
  );

  // if user clicks OK, save the file
  if (result.getSelectedButton() == ui.Button.OK) {
    var folderPath = result.getResponseText();
    var folder = DriveApp.getFoldersByName(folderPath);
    if (folder.hasNext()) {
      folder.next().createFile(blob);
      ui.alert('File downloaded successfully!');
    } else {
      ui.alert('Folder not found. Please make sure the folder path is correct.');
    }
  }
}
