
var bar = document.getElementById("love_bar");
var game = document.getElementById("game");
var title = document.getElementById("startup");

var love = 0;
var ppc = 1;
var pps = 1;
var game_start = false;
var res_count = 0;
var stan_count = 0
var calc_speed = 1000;

function calculate_love() {
	if (calc_speed/pps > 1){
		love += 1;
		counter.innerHTML = love;
		setTimeout(calculate_love,calc_speed/pps);
	}
	else{
		love += pps;
		counter.innerHTML = love;
		setTimeout(calculate_love,1);
	}
}

document.getElementById("love_btn").addEventListener("click", function(){

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

document.getElementById("up_stan").addEventListener("click", function(){

	if(love>=10){
		love -= 10;
		counter.innerHTML = love;
		stan_count ++;
		document.getElementById("ct_stan").innerHTML = stan_count;
		pps += 1;
	}

});
			
document.getElementById("up_resident").addEventListener("click", function(){

	if(love>=100){
		love -= 100;
		counter.innerHTML = love;
		res_count ++;
		document.getElementById("ct_resident").innerHTML = res_count;
		pps += 10;
	}

});
