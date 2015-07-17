
var Creature = function (modelObject) {
					
	this.mesh = new THREE.Mesh( modelObject.geometry, modelObject.material );
	this.x = Math.random()*100-50;
	this.z = Math.random()*100-50;
	this.angle = Math.random()*2*Math.PI;
	this.scale = 8;
	this.mesh.scale.set(this.scale,this.scale ,this.scale );
	this.mesh.position.set(this.x,0,this.z);
	this.mesh.rotation.y = this.angle;
	scene.add( this.mesh ) ;
};

Creature.prototype.update = function () {
	var time = Date.now() * 0.01;
	this.mesh.scale.x = (1 + Math.cos(time) * 0.4) * this.scale;
}