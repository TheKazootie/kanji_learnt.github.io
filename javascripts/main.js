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

    var i, dataReady, nbColumns, columns;

    $('#main_content').append('<table cellpadding="0" cellspacing="0" border="0" class="display" id="kanji_learnt"></table>');

    // 1. Fetch data
    $.getJSON('data/kanji_learnt.json').done(function (data) {
        // 2. Manipulate data
        $.map(data, function (el) {
            for (i = 0; i < el.onyomi.length; i += 1) {
                addToSet(el.onyomi[i], el.kanji);
            }
            for (i = 0; i < el.kunyomi.length; i += 1) {
                addToSet(el.kunyomi[i], el.kanji);
            }
        });
        dataReady = $.map(dataSet, function (values, key) {
            return {"Kana": key, "Kanji": values};
        });
        nbColumns = Math.max.apply(
            null,
            Object.keys(data).map(function (key) {return data[key].length; })
        );
        columns = [
            { "data": "Kana", "title": "Kana" }
        ];
        for (i = 0; i < nbColumns; i += 1) {
            columns.push({"data": "Kanji", "title": "Kanji"});
        }

        // 3. Display data
        $('#total_kanji').html(data.length);
        $('#kanji_learnt').dataTable({
            paging: false,
            data: dataReady,
            columns: columns
        });
    });
});
