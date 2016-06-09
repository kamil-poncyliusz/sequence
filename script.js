function game(board_size) {
	this.buttonBoard = document.getElementById('button-board');
	this.displayBoard = document.getElementById('display-board');
	this.startButton = document.getElementById('start-button');
	this.boardSize = board_size;
	this.numbers = [Math.round(Math.random() * (this.boardSize * this.boardSize - 1))];
	this.nextIndex = 0;
	this.listening = false;
	this.showing = false;
	this.lose = false;

	var ref = this;

	this.init = function(size) {
		if(this.boardSize != size) {
			this.boardSize = size;
			while(this.buttonBoard.firstChild) {
			this.buttonBoard.removeChild(this.buttonBoard.firstChild);
			this.displayBoard.removeChild(this.displayBoard.firstChild);
			}
			for(var i = 0;i < this.boardSize;i++) {
				this.buttonBoard.appendChild(document.createElement("div"));
				this.displayBoard.appendChild(document.createElement("div"));
				for(var j = 0;j < this.boardSize;j++) {
					this.buttonBoard.querySelectorAll('div')[i].appendChild(document.createElement("p"));
					this.displayBoard.querySelectorAll('div')[i].appendChild(document.createElement("p"));
				}
				
			}
			[].forEach.call(this.buttonBoard.querySelectorAll('p'), function(button, i) {
				button.addEventListener('click', function() {
					ref.check(i);
				});
			});
		} else {
			[].forEach.call(this.displayBoard.querySelectorAll('p'), function(button, i) {
				button.style.backgroundColor = 'transparent';
			});
		}
		this.numbers = [Math.round(Math.random() * (this.boardSize * this.boardSize - 1))];
		this.nextIndex = 0;
		this.listening = false;
		this.showing = false;
		this.lose = false;
		this.startButton.innerHTML = 'Start 1 round';
	}
	this.show = function() {
		if(!(this.lose || this.listening || this.showing)) {
			this.showing = true;
			for(var i = 0;i < this.numbers.length;i++) {
				(function(i) {
					return setTimeout(function() {
						ref.displayBoard.querySelectorAll('p')[ref.numbers[i]].style.backgroundColor = 'white';
					}, i * 1000);
				})(i);
				(function(i) {
					return setTimeout(function() {
						ref.displayBoard.querySelectorAll('p')[ref.numbers[i]].style.backgroundColor = 'transparent';
					}, (i + 1) * 1000 - 100);
				})(i);
			}
			setTimeout(function() {
				ref.showing = false;
				ref.listening = true;
				ref.startButton.innerHTML = 'repeat';
			}, ref.numbers.length * 1000);
		}
	}
	this.check = function(i) {
		if(this.listening && !this.lose) {
			if(i === this.numbers[this.nextIndex]) {
				this.nextIndex++;
				if(this.nextIndex === this.numbers.length) {
					this.listening = false;
					this.nextIndex = 0;
					this.numbers.push(Math.round(Math.random() * 8));
					this.startButton.innerHTML = 'Start ' + this.numbers.length + ' round';
				}
			} else {
				this.lose = true;
				this.displayBoard.querySelectorAll('p')[i].style.backgroundColor = 'red';
				this.displayBoard.querySelectorAll('p')[this.numbers[this.nextIndex]].style.backgroundColor = 'green';
				this.startButton.innerHTML = 'You lose, click to start a new game!';
			}
		}
	}
	document.getElementById('start-button').addEventListener('click', function() {
		if(ref.lose) {
			ref.init(3);
		} else {
			ref.show();
		}
	});
}

var game1 = new game(2);
game1.init(3);