# print every png in the directory
import os
import sys

dir = os.getcwd()
for file in os.listdir(f'{dir}/ux-design/wireframes'):
    if file.endswith(".png"):
        filename = file[:-4]
        print(f'### {filename}')
        # print(f'![{filename}](./ux-design/wireframes/{file})\n')
        print(f'<img src="./ux-design/wireframes/{file}" alt="filename" style="zoom:67%;" />\n')
