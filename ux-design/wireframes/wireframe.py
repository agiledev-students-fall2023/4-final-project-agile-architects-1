# print every png in the directory
import os
import sys

dir = os.getcwd()
for file in os.listdir(f'{dir}/ux-design/wireframes'):
    if file.endswith(".png"):
        filename = file[:-4]
        print(f'### {filename} \n![{filename}](./ux-design/wireframes/{file})\n')
