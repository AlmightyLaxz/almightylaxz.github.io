/***********************************************
					HUD Display
***********************************************/

hudLives = document.createElement("img");
hudLives.src = "art/heart.png";

hudArmor = document.createElement("img");
hudArmor.src = "art/armor.png";

function drawHUD() {
	// Drawing Lives
	context.fillStyle = "#000";
	context.font="32px Arial";
	context.drawImage (hudLives, 10, 10);
	context.fillText(player.lives, 60, 37, 100);
	
	// Drawing Armor
	if(player.armor > 0) 
	{
		context.fillText(player.armor, 60, 80, 100) 
		context.drawImage (hudArmor, 10, 50);
	}
}