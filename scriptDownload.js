import requests

def download_file(url, local_filename):
    with requests.get(url, stream=True) as r:
        if r.status_code == 200:
            with open(local_filename, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            print("File downloaded successfully!")
        else:
            print("Error:", r.status_code)

# Example usage:
url = 'https://example.com/file.xlsx'
local_filename = 'file.xlsx'
download_file(url, local_filename)