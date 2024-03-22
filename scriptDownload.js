import gspread
from datetime import datetime

def download_all_sheets_from_workbooks(sheet_urls, folder_path):
    # Iterate over each sheet URL
    for sheet_url in sheet_urls:
        # Open the Google Sheet
        client = gspread.service_account()
        workbook = client.open_by_url(sheet_url)

        # Iterate over all sheets in the workbook
        for sheet in workbook.worksheets():
            # Construct the export URL for Excel format
            export_url = sheet.url.replace('/edit', '/export?format=xlsx')

            # Generate filename with current date, workbook title, and sheet name
            current_date = datetime.now().strftime('%Y-%m-%d')
            workbook_title = workbook.title.replace(' ', '_')  # Replace spaces with underscores
            local_filename = f"{folder_path}/{workbook_title}_{sheet.title}_{current_date}.xlsx"

            # Download the sheet as Excel file
            response = client.session.get(export_url)
            if response.status_code == 200:
                with open(local_filename, 'wb') as f:
                    f.write(response.content)
                print(f"Sheet '{sheet.title}' from workbook '{workbook.title}' downloaded successfully as Excel!")
            else:
                print(f"Error downloading sheet '{sheet.title}' from workbook '{workbook.title}': {response.status_code}")

# Example usage:
sheet_urls = [
    'https://docs.google.com/spreadsheets/d/your_sheet_id_1/edit#gid=0',
    'https://docs.google.com/spreadsheets/d/your_sheet_id_2/edit#gid=0',
    # Add more sheet URLs as needed
]
folder_path = '/path/to/save/backup'
download_all_sheets_from_workbooks(sheet_urls, folder_path)