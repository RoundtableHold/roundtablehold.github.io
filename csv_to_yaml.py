# WARNING! This file will not work out of the box. It requires some manual work.
# To use it, go to google sheets, File -> Download -> Comma Separated Values
# Edit the value of `csv_files`, `yaml_file`, `title`, and `id`
# At the bottom of the page call either table() or list()
# Then edit that function. Not every sheet is the same format. You need to read and understand the function
# so you can make the appropriate changes. After you run it please check the results, they are unlikely to be correct.

import csv
import os
import re

csv_files = ['evergaols.csv']
yaml_file = 'evergaols.yaml'
title = 'Evergaols'
id = 'evergaols'

def to_snake_case(name):
    name = "".join(name.split())
    name = re.sub(r'[^\w\s]', '', name)
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    name = re.sub('__([A-Z])', r'_\1', name)
    name = re.sub('([a-z0-9])([A-Z])', r'\1_\2', name)
    return name.lower()

def escape_quotes(s):
    if len(s) > 0:
        s = re.sub(r'"', '\\"', s)
        s = s[0].upper() + s[1:]
    return s

def make_table():
    section_num = 0
    item_num = 0
    sub_item_num = 0
    location = ""
    with open(os.path.join('data', yaml_file), 'w') as bosses:
        bosses.write('title: ' + title + '\nid: ' + id + '\nsections:\n')
        for filename in csv_files:
            with open(filename, newline='') as csvfile:
                spamreader = csv.reader(csvfile)
                next(spamreader)
                next(spamreader)
                row = next(spamreader)

                table_headers = []
                for header in row:
                    header = header.lower()
                    header = '"' + header[0].upper() + header[1:] + '"'
                    table_headers.append(header)
                table_headers = table_headers[1:-1]
                m_name = ""
                m_type = ""
                m_location = ""
                m_bosses = ""
                m_notes = ""
                for row in spamreader:
                    if row[0]:
                        bosses.write('  -\n')
                        bosses.write('    title: "' + escape_quotes(row[0]) + '"\n')
                        bosses.write('    id: "' + id + '_' + to_snake_case(row[0]) + '"\n')
                        bosses.write('    num: ' + str(section_num) + '\n')
                        bosses.write('    table: [' + ', '.join(table_headers) + ']\n')
                        bosses.write('    items:\n')
                        section_num += 1
                        item_num = 1
                    bosses.write('      - [' + str(item_num) + ', "", ')
                    bosses.write(', '.join(['"' + escape_quotes(item) + '"' for item in row[1:-1]]))
                    bosses.write(']\n')
                    item_num += 1

def make_list():
    section_num = 0
    item_num = 0
    sub_item_num = 0
    location = ""
    with open(os.path.join('data', yaml_file), 'w') as bosses:
        bosses.write('title: ' + title + '\nid: ' + id + '\nsections:\n')
        for filename in csv_files:
            section_num += 1
            item_num = 1
            with open(filename, newline='') as csvfile:
                spamreader = csv.reader(csvfile)
                next(spamreader)
                next(spamreader)
                next(spamreader)
                bosses.write('  -\n')
                bosses.write('    title: "' + row[0] + '"\n')
                bosses.write('    id: ' + to_snake_case(row[0]) + '_' + id + '\n')
                bosses.write('    num: ' + str(section_num) + '\n')
                bosses.write('    items:\n')
                for row in spamreader:
                    if row[0]:
                        bosses.write('      - "' + escape_quotes(row[0]) + '"\n')
                    bosses.write('      - [' + str(item_num) + ', "", ')
                    bosses.write('"' + escape_quotes(row[2]) + '"')
                    bosses.write(']\n')
                    item_num += 1

table()