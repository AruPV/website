
var bar = document.getElementById("love_bar");
var game = document.getElementById("game");
var title = document.getElementById("startup");

var love = 0;
var ppc = 1;
var pps = 1;
var game_worker = new Worker('love_counter.js');
var game_start = false;

function calculate_love() {
	love += pps;
	counter.innerHTML = love;
	setTimeout(calculate_love,1000);
}

document.getElementById("love_btn").addEventListener("click", function(event){

	if (!game_start){
		bar.value += 10;
		if (bar.value >= 70) {
			document.getElementById("title").innerHTML = "Almost there!";
		};
		if (bar.value >= 100) {
			window.alert("Maine START!");
			game_start = true;
			game.style.visibility='visible';
			startup.style.visibility='hidden';
			calculate_love();
		};
	}
	
	love += ppc;
	counter.innerHTML = love;

});


			
