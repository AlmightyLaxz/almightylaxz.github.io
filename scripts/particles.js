/***********************************************
			Particles from particleSystem
***********************************************/

var particles = [];

function createSnowEmitter(particleTexture, posX, posY)
{
	var emitter = new Emitter(particleTexture, posX, posY);
	emitter.emissionRate = 50;
	emitter.life = 0.3;
	emitter.maxLife = 0.5;
	return emitter;
}

function createInitialGoreEmitter(particleTexture, posX, posY)
{
	var emitter = new Emitter(particleTexture, posX, posY);
	emitter.emissionRate = 5;
	emitter.minVelocity.set(-300, 300);
	emitter.maxVelocity.set(300, 300);
	emitter.gravity = 20;
	emitter.life = 1.5;
	emitter.minLife = 1.5;
	emitter.maxLife = 1.5;
	emitter.transparency = 0.2;
	return emitter;
}

function createGoreEmitter(particleTexture, posX, posY)
{
	var emitter = new Emitter(particleTexture, posX, posY);
	emitter.emissionRate = 50;
	emitter.minVelocity.set(-50, 0);
	emitter.maxVelocity.set(50, 300);
	emitter.gravity = 20;
	emitter.life = 0.5;
	emitter.minLife = 2;
	emitter.maxLife = 2;
	return emitter;
}

function createGoreSingleEmitter(particleTexture, posX, posY)
{
	var emitter = new SingleEmitter(particleTexture, posX, posY);
	emitter.emissionRate = 1;
	emitter.minVelocity.set(-100, 400);
	emitter.maxVelocity.set(100, 600);
	emitter.gravity = 30;
	emitter.life = 2;
	emitter.minSize = 32;
	emitter.maxSize = 32;
	emitter.minLife = 2;
	emitter.maxLife = 2;
	emitter.transparency = 1;
	return emitter;
}

function createPowerupEmitter(particleTexture, posX, posY)
{
	var emitter = new Emitter(particleTexture, posX, posY);
	emitter.emissionRate = 100;
	emitter.minVelocity.set(-300, -300);
	emitter.maxVelocity.set(300, 300);
	emitter.gravity = 0;
	emitter.life = 0.5;
	emitter.minLife = 1;
	emitter.maxLife = 2;
	return emitter;
}

function makeGoreEmitter() {
	var goreEffect = createGoreEmitter("art/gore.png", player.position.x, player.position.y + 20);
	particles.push(goreEffect);
	if(!player.gibbed) {
		var goreHeadEffect = createGoreSingleEmitter("art/gore_head.png", player.position.x, player.position.y + 20);
		particles.push(goreHeadEffect);
		var goreHeadEffect = createGoreSingleEmitter("art/gore_arm1.png", player.position.x, player.position.y + 20);
		particles.push(goreHeadEffect);
		var goreHeadEffect = createGoreSingleEmitter("art/gore_arm2.png", player.position.x, player.position.y + 20);
		particles.push(goreHeadEffect);
		var goreInitialEffect = createInitialGoreEmitter("art/gore2.png", player.position.x, player.position.y + 20);
		particles.push(goreInitialEffect);
		player.velocity.y -= 1000;
		player.velocity.x = 1
		player.gibbed = true;
	}
}

function makeSnowEffect() {
	var snowLandingEffect = createSnowEmitter("art/snow.png", player.position.x - 50, player.position.y + 20);
	particles.push(snowLandingEffect);
}

function makePowerupEffect() {
	var powerupEffect = createPowerupEmitter("art/powerup_effect.png", player.position.x - 50, player.position.y + 20);
	particles.push(powerupEffect);
}

function updateParticles(deltaTime) {
	for(var k = 0; k < particles.length; k++) {
		particles[k].update(deltaTime);
		particles[k].draw();
		if(particles[k].life <= 0) {particles.splice(k, 1);}
	}
}