import requests
from datetime import datetime

def download_sheets_as_excel(sheet_urls, folder_path):
    for sheet_url in sheet_urls:
        # Generate filename with current date
        current_date = datetime.now().strftime('%Y-%m-%d')
        local_filename = f"{folder_path}/sheet_{current_date}.xlsx"

        # Construct the export URL for Excel format
        export_url = sheet_url.replace('/edit#gid=', '/export?format=xlsx&gid=')

        # Download the sheet as Excel file
        response = requests.get(export_url)
        if response.status_code == 200:
            with open(local_filename, 'wb') as f:
                f.write(response.content)
            print(f"Sheet downloaded successfully as Excel: {sheet_url}")
        else:
            print(f"Error downloading sheet: {sheet_url}, Status code: {response.status_code}")

# Example usage:
sheet_urls = [
    'https://docs.google.com/spreadsheets/d/your_sheet_id_1/edit#gid=0',
    'https://docs.google.com/spreadsheets/d/your_sheet_id_2/edit#gid=0',
    # Add more sheet URLs as needed
]
folder_path = '/path/to/save/backup'
download_sheets_as_excel(sheet_urls, folder_path)