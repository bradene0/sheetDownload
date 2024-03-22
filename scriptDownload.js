import requests

def download_google_sheet_as_excel(sheet_url, local_filename):
    # Construct the export URL for Excel format
    export_url = sheet_url.replace('/edit#gid=', '/export?format=xlsx&gid=')

    # Download the sheet as Excel file
    response = requests.get(export_url)
    if response.status_code == 200:
        with open(local_filename, 'wb') as f:
            f.write(response.content)
        print("Sheet downloaded successfully as Excel!")
    else:
        print("Error:", response.status_code)

# Example usage:
sheet_url = 'https://docs.google.com/spreadsheets/d/your_sheet_id/edit#gid=0'
local_filename = 'sheet.xlsx'
download_google_sheet_as_excel(sheet_url, local_filename)