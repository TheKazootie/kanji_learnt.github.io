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


// 3. Render data
$(function () {
    "use strict";

    var i;

    // 1. Fetch data
    $.getJSON('javascripts/kanji_learnt.json')
        .done(function (data) {
            // 2. Manipulate data
            $.map(data, function (el) {
                for (i = 0; i < el.onyomi.length; i += 1) {
                    addToSet(el.onyomi[i], el.kanji);
                }
                for (i = 0; i < el.kunyomi.length; i += 1) {
                    addToSet(el.kunyomi[i], el.kanji);
                }
            });

        }
    )


    $('#main_content').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="kanji_learnt"></table>');

    $('#kanji_learnt').dataTable({
        "data": $.map(dataSet, function (values, key) {
            return {"Kana": key, "Kanji": values};
        }),
        "columns": [
            { "data": "Kana" },
            { "data": "Kanji" }
        ]
    });
})
