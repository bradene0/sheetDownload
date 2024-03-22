import requests
from datetime import datetime
import os
import zipfile

def download_sheets_as_excel(sheet_urls, folder_path):
    files_to_zip = []
    for index, sheet_url in enumerate(sheet_urls, start=1):
        # Generate filename with current date and sheet index
        current_date = datetime.now().strftime('%Y-%m-%d')
        filename = f"sheet{index}_{current_date}.xlsx"
        local_filename = os.path.join(folder_path, filename)

        # Construct the export URL for Excel format
        export_url = sheet_url.replace('/edit#gid=', '/export?format=xlsx&gid=')

        # Download the sheet as Excel file
        response = requests.get(export_url)
        if response.status_code == 200:
            with open(local_filename, 'wb') as f:
                f.write(response.content)
            print(f"Sheet downloaded successfully as Excel: {sheet_url}")
            files_to_zip.append(local_filename)
        else:
            print(f"Error downloading sheet: {sheet_url}, Status code: {response.status_code}")

    # Create zip file
    zip_filename = f"backup_{current_date}.zip"
    with zipfile.ZipFile(os.path.join(folder_path, zip_filename), 'w') as zipf:
        for file in files_to_zip:
            zipf.write(file, os.path.basename(file))

    print(f"All sheets zipped successfully: {zip_filename}")

# Example usage:
sheet_urls = [
    'https://docs.google.com/spreadsheets/d/your_sheet_id_1/edit#gid=0',
    'https://docs.google.com/spreadsheets/d/your_sheet_id_2/edit#gid=0',
    # Add more sheet URLs as needed
]
folder_path = '/path/to/save/backup'
download_sheets_as_excel(sheet_urls, folder_path)