var Creature = function (modelObject) {
	Entity.call(this, modelObject);
	
	this.directions = [0,0,0,0]; // up left down right wasd
	this.isPlayer = false;
	this.heldThings = [];
	this.shouldFollow = false;
	this.isFollowingEntity = null;
};

Creature.prototype = Object.create(Entity.prototype);

Creature.prototype.update = function () {
	if (this.shouldFollow)
		this.handleFollowing();
	this.handleControls();
	var newCoords = boundingFunction([this.x,this.z]);
	this.x = newCoords[0];
	this.z = newCoords[1];
	
	this.mesh.position.x = this.x;
	this.mesh.position.z = this.z;
	this.mesh.rotation.y = -this.angle;
}

Creature.prototype.handleFollowing = function () {
	if (this.isFollowingEntity === null) {
		if (getDistance(this.x,playerEntity.x,this.z,playerEntity.z) < 15) {
			this.startFollowing(playerEntity);
		}
	} else {
		this.directions[0] = 1;
		this.directions[2] = 0;
		var targetAngle = Math.atan2( this.z - this.isFollowingEntity.z, this.x - this.isFollowingEntity.x );
		var currentAngle = wrapAngle(targetAngle - this.angle);
		

		if ( currentAngle > 0) {
			this.directions[1] = 1;
			this.directions[3] = 0;
		} else {
			this.directions[1] = 0;
			this.directions[3] = 1;	
		}
	}
}

Creature.prototype.startFollowing = function (followObject) {
	this.isFollowingEntity = followObject;
	this.setScale(2.0);
	console.log("creature is now following");
}

Creature.prototype.handleControls = function () {
	if (this.directions[1]) {
		this.angle -= this.angleSpeed;
	}
	if (this.directions[3]) {
		this.angle += this.angleSpeed;
	}
	if (this.directions[0]) {
		this.x += Math.cos(this.angle) * this.speed;
		this.z += Math.sin(this.angle) * this.speed;
	}
	if (this.directions[2]) {
		this.x -= Math.cos(this.angle) * this.speed;
		this.z -= Math.sin(this.angle) * this.speed;
	}
}

Creature.prototype.setHeld = function (entity) {
	this.heldThings.push(entity);
}
Creature.prototype.heldFractionOf = function (entity) {
	return (1.001 + this.heldThings.indexOf(entity)) / this.heldThings.length; // make float...
}

Creature.prototype.updateCameraOn = function (cam) {
	var cameraDistance = 80;
	var cameraHeight = 70;
	cam.position.set(this.x - Math.cos(this.angle) * cameraDistance, cameraHeight, this.z - Math.sin(this.angle) * cameraDistance);
	cam.lookAt( this.mesh.position);
}

Creature.prototype.forwardAI = function (turnChance) {
	this.directions[0] = 1;
	
	if (Math.random() < turnChance) {
		//console.log("turn left");
		this.directions[1] = 1;
		this.directions[3] = 0;
	}
	if (Math.random() < turnChance) {
		//console.log("turn right");
		this.directions[1] = 0;
		this.directions[3] = 1;
	}
	if (Math.random() < turnChance) {
		//console.log("turn right");
		this.directions[1] = 0;
		this.directions[3] = 0;
	}
}

Creature.prototype.makePlayer = function () {
	isPlayer = true;
	//var arrowCodes = {37: "left", 38: "up", 39: "right", 40: "down"};
  function handler(event) {
		var down = event.type == "keydown";
		if (event.keyCode === 38)
			this.directions[0] = down;
		if (event.keyCode === 37)
			this.directions[1] = down;
		if (event.keyCode === 40)
			this.directions[2] = down;		
		if (event.keyCode === 39)
			this.directions[3] = down;

      
		//event.preventDefault();
  }
  addEventListener("keydown", handler.bind(this));
  addEventListener("keyup", handler.bind(this));
}

