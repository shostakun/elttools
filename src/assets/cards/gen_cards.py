import json
import os

import cog


def gen_card_imports(files):
    for f in files:
        cog.outl(f'import {f}Card from "./{f}.png";')


def gen_card_specs(files, tags):
    for f in files:
        cog.outl(f"  {f}: {{")
        cog.outl(f"    images: [{f}Card],")
        my_tags = tags + [f]
        my_tags.sort()
        # Use JSON to get double quotes.
        cog.outl(f"    tags: {json.dumps(my_tags)},")
        cog.outl("  },")


def get_card_files():
    dir = os.path.dirname(os.path.abspath(cog.inFile))
    files = list(
        [os.path.splitext(f)[0] for f in os.listdir(dir) if f.endswith(".png")]
    )
    files.sort()
    return files
