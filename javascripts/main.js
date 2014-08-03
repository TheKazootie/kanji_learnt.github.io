var dataSet;
$.getJSON('javascripts/kanji_learnt.json')
    .done(function (data) {
        dataSet = data;
    }
)


$(document).ready(function() {
    $('#main_content').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="kanji_learnt"></table>');

    $('#kanji_learnt').dataTable( {
        "data": dataSet,
        "columns": [
            { "title": "Kana" },
            { "title": "Kanjis" }
        ]
    } );
} )
