
function Slug(modelObject, cargo) {
	Creature.call(this, modelObject);
	this.setCargo(cargo);
	
}
Slug.prototype = Object.create(Creature.prototype);

Slug.prototype.setCargo = function (cargo) {
	this.cargo = cargo;
	switch (this.cargo) {
		case "empty":
			this.setScale(3);
			this.angleSpeed = 0.015;
			this.period = 0.015;
			this.averageSpeed = 0.4;
			break;
		case "rock":
			this.setScale(5);
			this.angleSpeed = 0.01;
			this.period = 0.005;
			this.averageSpeed = 0.2;
			break;
		case "spike":
			this.setScale(2);
			this.angleSpeed = 0.01;
			this.period = 0.03;
			this.averageSpeed = 0.3;
			break;
		default:
			throw new Error("unknown cargo");
	}
}

Slug.prototype.update = function() {
	
	var time = Date.now() * this.period;
	this.mesh.scale.x = (1 + Math.cos(time) * 0.4) * this.scale;
	
	//var period = time % (2*Math.PI);
	this.speed = Math.cos(time) * this.averageSpeed + this.averageSpeed;
	this.forwardAI(0.005);
	/*if (period < Math.PI) {
		this.directions[0] = 0;
	} else {
		this.forwardAI(0.005);
	}*/
	
	Creature.prototype.update.call(this);
}