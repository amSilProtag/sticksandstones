
function Slug(modelObject) {
	Creature.call(this, modelObject);
}
Slug.prototype = Object.create(Creature.prototype);

Slug.prototype.update = function() {
	var time = Date.now() * 0.01;
	this.mesh.scale.x = (1 + Math.cos(time) * 0.4) * this.scale;
}