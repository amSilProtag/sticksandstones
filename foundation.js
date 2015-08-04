var Foundation = function (modelObject) {
	this.mesh = new THREE.Mesh( modelObject.geometry, modelObject.material );
	var angle = 0;
	var dist = Math.random() * 200;
	this.x = Math.cos(angle)*dist;
	this.y = 1;
	this.z = Math.sin(angle)*dist;
	this.angle = Math.random()*2*Math.PI;
	this.setScale(50);
	this.mesh.position.set(this.x,0,this.z);
	this.mesh.rotation.y = this.angle;
	scene.add( this.mesh ) ;

	this.heldItems = [];
}

Foundation.prototype.setScale = function (newScale) {
	this.scale = newScale;
	this.mesh.scale.set(this.scale,3 ,this.scale );
}

Foundation.prototype.update = function () {
	if (getDistance(this.x,playerEntity.x,this.z,playerEntity.z) < 50) {
		for (var i = 0;i<playerEntity.heldThings.length;i++) {
			console.log("adding item");
			var resource = playerEntity.heldThings[i];
			var blockSize = 9;
		        var cube = new THREE.Mesh(
        	                        new THREE.BoxGeometry( blockSize, blockSize, blockSize ),
                	                new THREE.MeshLambertMaterial( { color: resource.blockColor } )
                        	    );
			var rowSize = 6;
			var columnSize = 6;
			var offX = blockSize * Math.floor((this.heldItems.length % (rowSize*columnSize)) / rowSize) - (blockSize*rowSize/2);
			var offZ = blockSize * (this.heldItems.length % rowSize) - (blockSize*columnSize/2);
			var offY = blockSize * Math.floor(this.heldItems.length / (rowSize*columnSize));
			console.log(offX,offY,offZ);
			cube.position.set(this.x+offX,3+offY,this.z+offZ);
			scene.add( cube );
			this.heldItems.push(cube);

			scene.remove(resource.mesh);
			// REMOVE ENTITY FROM ENTITIES ARRAY!!
		}
		playerEntity.heldThings = [];
	}
}







