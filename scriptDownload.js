import requests
from datetime import datetime
import os
from urllib.parse import urlparse, parse_qs

def download_sheets_as_excel(sheet_urls, folder_path):
    for index, sheet_url in enumerate(sheet_urls, start=1):
        # Extract Google Sheet ID from URL
        parsed_url = urlparse(sheet_url)
        query_params = parse_qs(parsed_url.query)
        sheet_id = query_params.get('id', [''])[0]

        if not sheet_id:
            print(f"Error: Google Sheet ID not found in URL: {sheet_url}")
            continue

        # Generate filename with current date and sheet title
        current_date = datetime.now().strftime('%Y-%m-%d')
        sheet_title = sheet_url.split('/')[-2]  # Extract sheet title from URL
        filename = f"{sheet_title}_{current_date}_{index}.xlsx"
        local_filename = os.path.join(folder_path, filename)

        # Construct the export URL for Excel format
        export_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=xlsx"

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