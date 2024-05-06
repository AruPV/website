"use strict";

var love = 0;
var love_per_click = 1;
var love_per_sec = 0;
var calc_speed = 1000;

// Available Buildings
var stan = {
	shop_id: "stan",
	shop_name: "Maine Stan",
	icon_path: "../assets/heart.png",
	count: 0,
	cost: 10,
	value: 1,
	is_visible: true
};

var resident = {
	shop_id: "resident",
	shop_name: "Maine Resident",
	icon_path: "../assets/house.png",
	count: 0,
	cost: 100,
	value: 10,
	is_visible: true
};

var buildings = [stan, resident]

// Build Shop
var shop_string = '<div id="shop">';

buildings.forEach( building =>{
	shop_string += 
			'<div class="building" id="' + building.shop_id +'">'
		+		'<span style="display: inline-block; padding-left:20px">'
		+			'<img src="' + building.icon_path + '" width="40" height="40">'
		+		'</span>'
		+		'<span style="display: inline-block; padding-left:20px">'
		+			'<h5 class="building_name">'+ building.shop_name +'</h5>'
		+			'<p class="building_cost">'+ building.cost+'</p>'
		+		'</span>'
		+		'<span style="display: inline-block; float:right; padding-right: 20px">'
		+			'<h5 class="building_count">'+ building.count +'</h5>'
		+		'</span>'
		+	'</div>'

});

shop_string += '</div>';

const shop = document.getElementById("right_side");
shop.innerHTML += shop_string;

// Love change functions
function change_love(amount){
	love+= amount;
	love_counter.innerHTML = love;
	buildings.forEach(building=>{
		var shop_button = document.getElementById(building.shop_id);
		shop_button.classList.toggle("buyable", love>=building.cost);
	});
}

function change_passive_love(amount){
	love_per_sec += amount;
	document.getElementById("lps_counter").innerHTML = love_per_sec;
}

function passive_love() {
	if (love_per_sec == 0){
		setTimeout(passive_love,calc_speed);
	}
	else if (calc_speed/love_per_sec > 1){
		change_love(1);
		setTimeout(passive_love,calc_speed/love_per_sec);
	}
	else{
		change_love(love_per_sec);
		setTimeout(passive_love,1);
	}
}

var maine_button = document.getElementById("maine_button");
maine_button.addEventListener("click", ()=>{
	change_love(love_per_click);
});

// PURCHASE CODE
buildings.forEach(building=>{
	var shop_button = document.getElementById(building.shop_id);
	shop_button.addEventListener("click", ()=>{
		if(love>=building.cost){
			change_love(-10);
			building.count++;
			building.cost = building.cost * 1.5;
			change_passive_love(building.value);
			shop_button
				.getElementsByClassName("building_count")[0]
				.innerHTML = building.count;
			shop_button
				.getElementsByClassName("building_cost")[0]
				.innerHTML = Math.ceil(building.cost);
		}
	});
})

passive_love();
