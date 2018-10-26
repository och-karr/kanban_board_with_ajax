var board = {
  name: 'Tablica Kanban',
  element: $('#board .column-container'),
  createColumn: function(column) {
    this.element.append(column.element);
    initSortable();
  }
};

$('.create-column').click(function() {
  var columnName = prompt('Enter a column name');
  if (columnName != null) {
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function(response) {
        var column = new Column(response.id, columnName); //tworzona z konstruktora z Column.js
        //najpierw tworzona jest kolumna przy użyciu id, które 
        //dostajemy w odpowiedzi z serwera oraz nazwy kolumny, 
        //o którą nas zapytano
        board.createColumn(column); //dopiero potem tworzymy kolumnę na tablicy
      }
    })
  } else {
  }	
});

function initSortable() {
  $('.card-list').sortable({
    connectWith: '.card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}