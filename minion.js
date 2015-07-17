
function Minion(modelObject) {
	Creature.call(this, modelObject);
	this.setScale(5);
}
Minion.prototype = Object.create(Creature.prototype);

Minion.prototype.update = function() {
	//this.handleControls();
	
	var time = Date.now() * 0.01;
	this.mesh.position.y = 1 + Math.cos(time) * 1;
	
	Creature.prototype.update.call(this);
}

