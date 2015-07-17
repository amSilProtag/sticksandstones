var Entity = function (modelObject) {
	this.mesh = new THREE.Mesh( modelObject.geometry, modelObject.material );
	this.x = Math.random()*100-50;
	this.z = Math.random()*100-50;
	this.angle = Math.random()*2*Math.PI;
	this.setScale(5);
	this.angleSpeed = 0.1;
	this.speed = 2;
	this.mesh.position.set(this.x,0,this.z);
	this.mesh.rotation.y = this.angle;
	scene.add( this.mesh ) ;
}

Entity.prototype.setScale = function (newScale) {
	this.scale = newScale;
	this.mesh.scale.set(this.scale,this.scale ,this.scale );
}

Entity.prototype.update = function () {
	
}