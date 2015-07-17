
function Slug(modelObject) {
	Creature.call(this, modelObject);
	this.setScale(5);
	//this.speed = 0.2;
	this.angleSpeed = 0.01;
}
Slug.prototype = Object.create(Creature.prototype);

Slug.prototype.update = function() {
	var time = Date.now() * 0.01;
	this.mesh.scale.x = (1 + Math.cos(time) * 0.4) * this.scale;
	
	//var period = time % (2*Math.PI);
	this.speed = Math.cos(time) * 0.3 + 0.3;
	this.forwardAI(0.005);
	/*if (period < Math.PI) {
		this.directions[0] = 0;
	} else {
		this.forwardAI(0.005);
	}*/
	
	Creature.prototype.update.call(this);
}