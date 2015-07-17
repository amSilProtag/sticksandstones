
var Creature = function (modelObject) {
	this.mesh = new THREE.Mesh( modelObject.geometry, modelObject.material );
	this.x = Math.random()*100-50;
	this.z = Math.random()*100-50;
	this.angle = Math.random()*2*Math.PI;
	this.setScale(1);
	this.angleSpeed = 0.1;
	this.speed = 2;
	this.mesh.position.set(this.x,0,this.z);
	this.mesh.rotation.y = this.angle;
	scene.add( this.mesh ) ;
	
	this.directions = [0,0,0,0]; // up left down right wasd
	this.isPlayer = false;
};

Creature.prototype.setScale = function (newScale) {
	this.scale = newScale;
	this.mesh.scale.set(this.scale,this.scale ,this.scale );
}

Creature.prototype.update = function () {
	this.handleControls();
	var newCoords = boundingFunction([this.x,this.z]);
	this.x = newCoords[0];
	this.z = newCoords[1];
	
	this.mesh.position.x = this.x;
	this.mesh.position.z = this.z;
	this.mesh.rotation.y = -this.angle;
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

Creature.prototype.updateCameraOn = function (cam) {
	var cameraDistance = 50;
	var cameraHeight = 30;
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

