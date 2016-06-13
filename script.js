var gameObject = (function() {
	var buttonBoard = document.getElementById('button-board');
	var displayBoard = document.getElementById('display-board');
	var label = document.getElementById('label');
	var boardSize = 0;
	var numbers = [];
	var nextIndex, listening, showing, lose;

	var init = function(size) {
		if(boardSize != size) {
			boardSize = size;
			while(buttonBoard.firstChild) {
			buttonBoard.removeChild(buttonBoard.firstChild);
			displayBoard.removeChild(displayBoard.firstChild);
			}
			for(var i = 0;i < boardSize;i++) {
				buttonBoard.appendChild(document.createElement("div"));
				displayBoard.appendChild(document.createElement("div"));
				for(var j = 0;j < boardSize;j++) {
					buttonBoard.querySelectorAll('div')[i].appendChild(document.createElement("p"));
					displayBoard.querySelectorAll('div')[i].appendChild(document.createElement("p"));
				}
				
			}
			[].forEach.call(buttonBoard.querySelectorAll('p'), function(button, i) {
				button.addEventListener('click', function() {
					check(i);
				});
			});
		} else {
			[].forEach.call(displayBoard.querySelectorAll('p'), function(button, i) {
				button.style.backgroundColor = 'transparent';
			});
		}
		numbers = [Math.round(Math.random() * (boardSize * boardSize - 1))];
		nextIndex = 0;
		listening = false;
		showing = false;
		lose = false;
		label.innerHTML = 'Start 1 round';
	}
	var show = function() {
		if(!(lose || listening || showing)) {
			showing = true;
			for(var i = 0;i < numbers.length;i++) {
				(function(i) {
					return setTimeout(function() {
						displayBoard.querySelectorAll('p')[numbers[i]].style.backgroundColor = 'white';
					}, i * 1000);
				})(i);
				(function(i) {
					return setTimeout(function() {
						displayBoard.querySelectorAll('p')[numbers[i]].style.backgroundColor = 'transparent';
					}, (i + 1) * 1000 - 100);
				})(i);
			}
			setTimeout(function() {
				showing = false;
				listening = true;
				label.innerHTML = 'repeat';
			}, numbers.length * 1000);
		}
	}
	var check = function(i) {
		if(listening && !lose) {
			if(i === numbers[nextIndex]) {
				nextIndex++;
				if(nextIndex === numbers.length) {
					listening = false;
					nextIndex = 0;
					numbers.push(Math.round(Math.random() * 8));
					label.innerHTML = 'Start ' + numbers.length + ' round';
				}
			} else {
				lose = true;
				displayBoard.querySelectorAll('p')[i].style.backgroundColor = 'red';
				displayBoard.querySelectorAll('p')[numbers[nextIndex]].style.backgroundColor = 'green';
				label.innerHTML = 'You lose!';
			}
		}
	}
	document.getElementById('label').addEventListener('click', function() {
		if(lose) {
			init(3);
		} else {
			show();
		}
	});
	return {
		init: init,
	}
}());

gameObject.init(3);