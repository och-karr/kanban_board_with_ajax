// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
    
    this.id = id;
    this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardEdit = $('<button class="btn-edit">edit</button>');
		var cardDescription = $('<p class="card-description">'+ self.name +'</p>');
		
		cardDeleteBtn.click(function() {
			self.removeCard();
		});

		cardEdit.click(function() {
            self.editCard();
        });
		
		card.append(cardDeleteBtn)
			.append(cardEdit);
		card.append(cardDescription);

		return card;
	}
}

Card.prototype = {
	removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function(){
                self.element.remove();
            }
        });
	},

	editCard: function() {
		var self = this;
		var newCardName = prompt("Enter new name of the card");
		event.preventDefault();
        if (newCardName != null) {
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: newCardName
				},
				success: function(response){
					self.element.children('.card-description').text(newCardName);
				}
			});
		};
	}
}