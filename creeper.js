
function Creeper(modelObject) {
	Creature.call(this, modelObject);
}
Creeper.prototype = Object.create(Creature.prototype);

Creeper.prototype.update = function() {
	
	var time = Date.now() * 0.01;
	this.mesh.rotation.y = Math.cos(time) * 0.5;
	this.mesh.rotation.x = Math.cos(time) * 0.5;
}