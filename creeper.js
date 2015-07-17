
function Creeper(modelObject) {
	Creature.call(this, modelObject);
	this.setScale(5);
	//this.speed = 0.5;
	this.angleSpeed = 0.02;
}
Creeper.prototype = Object.create(Creature.prototype);

Creeper.prototype.update = function() {
	
	var time = Date.now() * 0.01;
	this.mesh.rotation.y = Math.cos(time) * 0.5;
	this.mesh.rotation.x = Math.cos(time) * 0.5;
	
	var movePeriod = time*2;
	//this.mesh.position.y = -Math.cos(time) * 2 + 2;
	
	this.speed = -Math.cos(movePeriod) * 0.5 + 0.5;
	this.forwardAI(0.01);
	//this.forwardAI(0.01);
	
	Creature.prototype.update.call(this);
}