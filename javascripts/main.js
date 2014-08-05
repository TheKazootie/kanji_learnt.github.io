var dataSet = {};

function addToSet(kana, kanji) {
    "use strict";

    if (!(dataSet.hasOwnProperty(kana))) {
        dataSet[kana] = [kanji];
    }
    if (dataSet.hasOwnProperty(kana) && (dataSet[kana].indexOf(kanji) === -1)) {
        dataSet[kana].push(kanji);
    }
}

function hiragana2katakana(text) {
    "use strict";
    var i, c, newText = "";

    for (i = 0; i < text.length; i += 1) {
        c = parseInt(text.charCodeAt(i) + 96, 10);
        newText += String.fromCharCode("0x" + c.toString(16));
    }
    return newText;
}


// 3. Render data
$(function () {
    "use strict";

    var i, sortedData;

    $('#main_content').append('<table cellpadding="0" cellspacing="0" border="0" class="display" id="kanji_learnt"></table>');

    // 1. Fetch data
    $.getJSON('data/kanji_learnt.json').done(function (data) {
        // 2. Manipulate data
        $.map(data, function (el) {
            for (i = 0; i < el.onyomi.length; i += 1) {
                if (el.onyomi[i] !== "") {
                    addToSet(el.onyomi[i], el.kanji);
                }
            }
            for (i = 0; i < el.kunyomi.length; i += 1) {
                if (el.kunyomi[i] !== "") {
                    addToSet(el.kunyomi[i], el.kanji);
                }
            }
        });

        // 3. Display data
        $('#total_kanji').html(data.length);
        $('#kanji_learnt').dataTable({
            paging: false,
            data: $.map(dataSet, function (values, key) {
                return {"Kana": key, "Kanji": values};
            }),
            columns: [
                { "data": "Kana", "title": "Kana" },
                { "data": "Kanji", "title": "Kanji" }
            ]
        });

        // 4. Set most recently learnt kanjis
        sortedData = data.sort(function (a, b) {
            a = new Date(a.added);
            b = new Date(b.added);
            return a > b ? -1 : a < b ? 1 : 0;
        });
        sortedData.slice(0, 5).forEach(function (obj) {
            var date, kanji, details;

            date = $(document.createElement('span'))
                .html("[" + obj.added + "] ")
                .css('font-style', 'oblique');
            kanji = $(document.createElement('span'))
                .html(obj.kanji)
                .css('font-weight', 'bold');
            details = $(document.createElement('span'))
                .html(" (" + hiragana2katakana(obj.onyomi) + ", " +
                      obj.kunyomi + "): "  + obj.english);

            $(document.createElement('li'))
                .append(date)
                .append(kanji)
                .append(details)
                .appendTo('#latest_kanji');
        });
    });
});
