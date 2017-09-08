var nowPlaying = [];

$(function () {
	var socket = io();

	socket.on('sf', function (msg) {
		console.log(msg.sf);
		var sf = new Audio('/sfx/' + msg.sf);
		sf.play();
		nowPlaying.push(sf);
		sf.addEventListener('ended', function(){
			nowPlaying = nowPlaying.filter(function(e){
				return e !== sf;
			});
		});
	});

	socket.on('stop', function() {
		for(var i = 0; i < nowPlaying.length; i++){
			nowPlaying[i].pause();
		}
		nowPlaying = [];
	});

	$('#pepe').click(function(){
		socket.emit('stop');
	});

	addSFClickListeners(socket);
	resizeButtons();
});

function resizeButtons(){
	var buttons = document.getElementsByTagName('button');
	for(var i = 0; i < buttons.length; i++){
		buttons[i].style.height = buttons[i].offsetWidth + 'px';
	}
}

function addSFClickListeners(socket){
	var buttons = document.getElementsByClassName('sf');
	for(var i = 0; i < buttons.length; i++){
		var button = buttons[i];
		button.addEventListener('click', function(){
			socket.emit('sf', { sf: this.dataset.sf });
			return false;
		},this);
	}
}

window.addEventListener("resize", resizeButtons);