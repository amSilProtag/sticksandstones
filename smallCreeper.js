
function SmallCreeper(modelObject) {
	Creature.call(this, modelObject);
	this.setScale(1.25);
	//this.speed = 0.5;
        this.maxSpeed = 1.0;
	this.angleSpeed = 0.05;
	this.shouldFollow = true;
}
SmallCreeper.prototype = Object.create(Creature.prototype);

SmallCreeper.prototype.update = function() {
	
	var time = Date.now() * 0.01;
	this.mesh.rotation.y = Math.cos(time) * 0.5;
	this.mesh.rotation.x = Math.cos(time) * 0.5;
	
	var movePeriod = time*2;
	//this.mesh.position.y = -Math.cos(time) * 2 + 2;
	
	this.speed = -Math.cos(movePeriod) * (this.maxSpeed/2) + this.maxSpeed;
	this.forwardAI(0.01);
	//this.forwardAI(0.01);
	
	Creature.prototype.update.call(this);
}