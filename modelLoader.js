var thingsToLoad = 0;
var thingsLoaded = 0;
var allLoadedCallback;
var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;

function loadModels () {
	loadModel("Model/gold2.dae", "gold");
	loadModel("Model/floor.dae", "floor");
	loadModel("Model/greenCreep.dae", "greenCreep");
	loadModel("Model/rockSlug.dae", "rockSlug");
	loadModel("Model/minion.dae", "minion");
	loadModel("Model/grassWorld2.dae", "grassWorld");
	loadModel("Model/stick.dae", "stick");
	
}

function loadModel(fileName, arrayName) {
	if (arrayName == undefined)
		arrayName = fileName;
	thingsToLoad++;
	loader.load(fileName, function (collada) {
		var dae = collada.scene;
		dae.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh) {
				models[arrayName] = {geometry: child.geometry, material: child.material};
			}
		});
		console.log("loaded: "+fileName + " " + arrayName + " " + models[arrayName]);
		checkAllLoaded();
	});
}

function checkAllLoaded () {
	thingsLoaded++;
	if (thingsToLoad === thingsLoaded)
		allLoadedCallback();
}







