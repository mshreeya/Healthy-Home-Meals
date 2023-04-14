import os
import pathlib
import csv

recipes_file = os.path.join(pathlib.Path(__file__).parent.parent, "recipes.csv")

with open(recipes_file, newline="", encoding="utf8") as f:
    reader = csv.reader(f)
    recipes = [{
        "name":i[0],
        "ingredients":i[6],
        "time":i[2],
        "cuisine":i[3],
        "instructions":i[4],
        "url":i[5],
        "image":i[7]
    } for i in list(reader)]

print(data[3])
