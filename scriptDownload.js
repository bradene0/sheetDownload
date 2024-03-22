import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

def download_google_sheet(sheet_url, local_filename):
    # Define the scope
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

    # Load credentials
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)

    # Authorize client
    client = gspread.authorize(creds)

    # Open the Google Sheet
    sheet = client.open_by_url(sheet_url)

    # Download the sheet as Excel file
    sheet.export(local_filename, format='xlsx')

    print("Sheet downloaded successfully as Excel!")

# Example usage:
sheet_url = 'https://docs.google.com/spreadsheets/d/your_sheet_id/edit#gid=0'
local_filename = 'sheet.xlsx'
download_google_sheet(sheet_url, local_filename)