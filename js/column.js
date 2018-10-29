function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = createColumn();

    function createColumn() {
        // TWORZENIE NOWYCH WĘZŁÓW
        var column = $('<div class="column"></div>');
        var columnDelete = $('<button class="btn-delete">x</button>');
        var columnEdit = $('<button class="btn-edit">edit</button>');
        var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
        var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
        var columnCardList = $('<ul class="card-list"></ul>');

        // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
        columnDelete.click(function() {
            self.deleteColumn();
        });

        columnEdit.click(function() {
            self.editColumn();
        });

        columnAddCard.click(function(event) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();
            if (cardName != null) {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: cardName,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, cardName);
                        self.createCard(card);
                    }
                });
            } else {
            }
        });

        // KONSTRUOWANIE ELEMENTU KOLUMNY
        column.append(columnDelete)
                .append(columnEdit)
                .append(columnTitle)
                .append(columnAddCard)
                .append(columnCardList);

        return column;
    }
}

Column.prototype = {

    createCard: function(card) {
        this.element.children('ul').append(card.element);
    },

    deleteColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(response){
                self.element.remove();
            }
        });
    },

    editColumn: function() {
		var self = this;
        var newColumnName = prompt("Enter new name of the column");
        event.preventDefault();
        if (newColumnName != null) {
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'PUT',
                data: {
                    name: newColumnName
                },
                success: function(response){
                    self.element.children('.column-title').text(newColumnName);
                }
            });
        };
	}
}