import json
import os

import cog


def camel_case(in_str):
    result = ""
    for i, w in enumerate(in_str.split("_")):
        if i == 0:
            result += w[0].lower()
        else:
            result += w[0].upper()
        result += w[1:]
    return result


def gen_card_imports(files):
    for f in files:
        cog.outl(f'import {camel_case(f)}Card from "./{f}.png";')


def gen_card_specs(files, tags):
    for f in files:
        fId = camel_case(f)
        cog.outl(f"  {fId}: {{")
        cog.outl(f"    images: [{fId}Card],")
        my_tags = tags + [f.replace("_", " ")]
        my_tags.sort()
        # Use JSON to get double quotes.
        cog.outl(f"    tags: {json.dumps(my_tags)},")
        cog.outl("  },")


def gen_set_image_map(dirs):
    for d in dirs:
        dId = camel_case(d)
        cog.outl(f"  ...{dId}Images,")


def gen_set_imports(dirs):
    for d in dirs:
        dId = camel_case(d)
        cog.outl(f'import {{ images as {dId}Images, sets as {dId}Sets }} from "./{d}";')


def gen_set_map(dirs):
    for d in dirs:
        dId = camel_case(d)
        cog.outl(f"  ...{dId}Sets,")


def get_card_files():
    dir = os.path.dirname(os.path.abspath(cog.inFile))
    files = list(
        [
            os.path.splitext(f)[0]
            for f in os.listdir(dir)
            if f.endswith(".png") and os.path.isfile(os.path.join(dir, f))
        ]
    )
    files.sort()
    return files


def get_subdirs():
    dir = os.path.dirname(os.path.abspath(cog.inFile))
    dirs = list(
        [
            d
            for d in os.listdir(dir)
            if d[0] not in [".", "_"] and os.path.isdir(os.path.join(dir, d))
        ]
    )
    dirs.sort()
    return dirs
