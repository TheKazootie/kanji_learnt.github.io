var origSet,
    dataSet = {};

// 1. Fetch data
$.getJSON('javascripts/kanji_learnt.json')
    .done(function (data) {
        origSet = data;
    }
)


// 2. Manipulate data
function addToSet(kana, kanji) {
    if (!(kana in dataSet)) {
        dataSet[kana] = [kanji];
    }
    if (kana in dataSet && !(kanji in dataSet[kana])) {
        dataSet[kana].push(kanji);
    }
}

$.map( origSet, function(el) {
    for (i = 0; i < el.onyomi.length; i++) {
        addToSet(el.onyomi[i], el.kanji);
    }
    for (i = 0; i < el.kunyomi.length; i++) {
        addToSet(el.kunyomi[i], el.kanji);
    }
});


// 3. Render data
$(document).ready(function() {
    $('#main_content').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="kanji_learnt"></table>');

    $('#kanji_learnt').dataTable( {
        "data": dataSet,
        "columns": [
            { "title": "Kana" },
            { "title": "Kanji" }
        ]
    } );
} )
