=====================
List of Kanjis learnt
=====================

Sort all Kanji you've learnt by Onyomi & Kunyomi.

See `My Kanji list <http://fandekasp.github.io/kanji_learnt.github.io/>`_


How to
======

1. Fork this repo

2. Empty the file `data/kanji_learnt.json`

3. Add your kanji list in the json file.

4. A python script has been written to easily add items in the json file (only
   tested on linux with python 3).
   Make the script available in your **PATH**, eg::

        $ cd kanji_learnt.github.io/
        $ echo -e "export PATH=$(pwd)/bin/:\$PATH" >> ~/.zshrc
        $ cd && source .zshrc

   Then add your items::

        $ kanji_learnt.py -a

5. Save and push your code

6. Browse `http://YOURUSERNAME.github.io/kanji_learnt.github.io/` and enjoy!


Test locally
============

Install Ruby, Bundler and Jekyll. Assuming Ruby & bundler already installed:

    $ cd kanji_learnt.github.io/
    $ bundle install
    $ bundle exec jekyll serve &
    $ xdg-open http://localhost:4000

To update jekyll:

    $ bundle update

What next?
==========

When I find time, I will add:

* Details per kanji (probably another table)
* Learning progression chart
* import data from csv/json  (when memrise will allow course export)
