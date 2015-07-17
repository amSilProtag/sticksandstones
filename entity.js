var Entity = function (modelObject) {
	this.mesh = new THREE.Mesh( modelObject.geometry, modelObject.material );
	var angle = Math.random()*Math.PI*2;
	var dist = Math.random() * 200;
	this.x = Math.cos(angle)*dist;
	this.y = 0;
	this.z = Math.sin(angle)*dist;
	this.angle = Math.random()*2*Math.PI;
	this.setScale(5);
	this.angleSpeed = 0.1;
	this.speed = 2;
	this.mesh.position.set(this.x,0,this.z);
	this.mesh.rotation.y = this.angle;
	scene.add( this.mesh ) ;
	
	this.heldBy = null;
}

Entity.prototype.setScale = function (newScale) {
	this.scale = newScale;
	this.mesh.scale.set(this.scale,this.scale ,this.scale );
}

// IN FUTURE HAVE HOLDABLE PROP, MAKE THIS ASSIGN ANGLE/X/Y/Z
Entity.prototype.update = function () {
	if (this.heldBy == null) {
		if (getDistance(this.x,playerEntity.x,this.z,playerEntity.z) < 15) {
			this.heldBy = playerEntity;
			this.heldBy.setHeld(this);
			this.setScale (2);
			console.log(this.heldBy.heldFractionOf.call(this.heldBy, this));
		}
	} else {
		var time = Date.now() * 0.001;
		var offset = this.heldBy.heldFractionOf(this) * Math.PI*2;
		this.x = this.heldBy.x + Math.cos(time+offset) * 10;
		this.y = 10;
		this.z = this.heldBy.z + Math.sin(time+offset) * 10;
		
		this.mesh.rotation.x += 0.1;
		this.mesh.position.x = this.x;
		this.mesh.position.y = this.y;
		this.mesh.position.z = this.z;
	}
}







