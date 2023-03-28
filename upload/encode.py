import base64
import glob

zip_files = glob.glob('*.zip')

for file in zip_files:
    with open(file, 'rb') as file:
        encoded = base64.b64encode(file.read())
    print(file)
    print(encoded)