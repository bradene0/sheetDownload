#Working
import requests
from datetime import datetime
import zipfile
import io
import os
#todo add better ui and create scheduling gui
def download_and_zip_sheets(sheet_urls, export_path):
    files_to_zip = []
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    zip_filename = os.path.join(export_path, f"backup_{current_date}.zip")

    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        for index, sheet_url in enumerate(sheet_urls, start=1):
            # Construct the export URL for Excel format
            export_url = sheet_url.replace('/edit#gid=', '/export?format=xlsx&gid=')

            # Download the sheet as Excel file
            response = requests.get(export_url)
            if response.status_code == 200:
                # Add the downloaded file to the zip file
                file_in_zip = f"sheet{index}_{current_date}.xlsx"
                zipf.writestr(file_in_zip, response.content)
                files_to_zip.append(file_in_zip)
                print(f"Sheet {index} downloaded successfully and added to zip: {sheet_url}")
            else:
                print(f"Error downloading sheet: {sheet_url}, Status code: {response.status_code}")

    print(f"All sheets zipped successfully! Zip file saved at: {zip_filename}")

# Example usage:
sheet_urls = [
    'https://docs.google.com/spreadsheets/d/your_sheet_id_1/edit#gid=0',
    'https://docs.google.com/spreadsheets/d/your_sheet_id_2/edit#gid=0',
    # Add more sheet URLs as needed
]
export_path = '/path/to/export'
download_and_zip_sheets(sheet_urls, export_path)
