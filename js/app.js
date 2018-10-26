var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3118',
    'X-Auth-Token': '10851e82e2ccfcdbf46e5580801e958c'
};

//metoda, która dodaje nagłówki
$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
        setupColumns(response.columns);
    }
});

//funkcja tworzy kolumnę i dodaje ją do tablicy board na podstawie danych ktore posiada
function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name); //id tworzone przez serwer
        board.createColumn(col); //createColumn mamy w Board.js
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(cardObj); //createCard mamy w Column.js
  	});
}
