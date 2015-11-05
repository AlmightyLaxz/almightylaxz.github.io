/***********************************************
					HUD Display
***********************************************/

//hudBackground = document.createElement("img");
//hudBackground.src = "art/hud_background.png";

function drawHUD() {
	//context.drawImage(hudBackground, 0, 0);
	context.fillStyle = "#000";
	context.font="32px Arial";
	context.fillText("Lives: " + player.lives, 10, 30, 100);
	if(player.armor > 0) {context.fillText("Armor: " + player.armor, 10, 75, 100);}
}