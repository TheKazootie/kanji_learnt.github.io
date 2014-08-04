#!/usr/bin/env python

from datetime import datetime
import json
import getopt
import os
import sys

repo_path = os.path.realpath(os.path.join(os.path.dirname(__file__), '..'))
#sys.path.insert(0, os.path.join(repo_path)

JSON_FILE = os.path.join(repo_path, 'data/kanji_learnt.json')

def get_data():
    with open(JSON_FILE, 'r'):
        data = json.load(JSON_FILE)
        return {d.kanji: {
            'kunyomi': d.kunyomi,
            'onyomi': d.onyomi,
            'english': d.english,
        } for d in data}


def save_data(data):
    with open(JSON_FILE, 'w') as f:
        json.dump(data, f, ensure_ascii=False, sort_keys=True,
            indent=4, separators=(',', ': '))


def add_kanji():
    with open(JSON_FILE, 'r') as f:
        data = json.load(f)

    kanji = ""
    while len(kanji) != 1:
        kanji = input("\nEnter your Kanji ['q' to quit]: ")
        if kanji == 'q':
            sys.exit()
        if kanji in [d["kanji"] for d in data]:
            print("This kanji already exists!\n")
            kanji = ""
    onyomi = input("enter all possible onyomi, coma separated: ")
    onyomi = onyomi.replace('、', ',').split(",")
    kunyomi = input("enter all possible kunyomi, coma separated: ")
    kunyomi = kunyomi.replace('、', ',').split(",")
    english = input("Enter the english definition: ")
    added = ""
    while not added:
        try:
            added = input("When did you learn this kanji? yyyy-mm-dd [default today] ")
            if not added:
                added = datetime.today()
            else:
                added = datetime(*[int(e) for e in added.split("-")])
        except:
            print("wrong input, try again with format yyyy-mm-dd")
            added = ""
            pass


    related = {}
    for d in data:
        for kana in filter(None, sum([d["onyomi"], d["kunyomi"]], [])):
            if kana in sum([onyomi, kunyomi], []):
                if kana in related.keys():
                    related[kana].append(d["kanji"])
                else:
                    related[kana] = [d["kanji"], ]
    for kana in filter(None, sum([onyomi, kunyomi], [])):
        if kana not in related.keys():
            related[kana] = [kanji]
        else:
            related[kana].append(kanji)

    longest_kana = max([len(e) for e in related.keys()] or [1,])
    print("The kanji {} will be added to the following lists:\n\n{}\n".format(
        kanji, "\n".join(["* {}{}: {}".format(
            key, "  " * (longest_kana - len(key)), ",".join(values)
        ) for key, values in related.items()])))

    confirm = "x"
    while confirm not in ["y", "Y", ""]:
        confirm = input("Are you sure? [Y/n] ")
        if confirm in ["n", "N"]:
            print("entry ignored")
            return

    data.append({
        "kanji": kanji,
        "english": english,
        "onyomi": onyomi,
        "kunyomi": kunyomi,
        "added": added.strftime('%Y-%m-%d'),
    })
    save_data(data)
    print("entry saved")


def delete_kanji(kanji):
    #data = json.load(JSON_FILE)
    print("Not implemented yet")
    sys.exit()


def usage():
    print("""
    kanji_learnt [options]

        -a: insert a new entry to the database"
        -d, --delete: remove an entry
    """)


if __name__ == '__main__':
    try:
        opts, args = getopt.getopt(
            sys.argv[1:],
            "had:v",
            ["help", "delete="],
        )
    except getopt.GetoptError as err:
        print(str(err))
        usage()
        sys.exit(2)
    if not opts:
        usage()
        sys.exit()
    for opt, arg in opts:
        if opt == "-a":
            while 1:
                add_kanji()
        elif opt in ("-d", "--delete"):
            delete_kanji(arg)
        else:
            usage()
            sys.exit()
