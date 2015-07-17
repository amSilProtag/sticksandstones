var camera, scene, renderer, objects;

var width = 640;
var height = 480;

var clock = new THREE.Clock();
var morphs = [];
var slugs = [];

var models = [];
var entities = [];
var playerEntity = null;

var boundingFunction = function (coordArray) {
	var angle = Math.atan2(coordArray[1], coordArray[0]);
	var dist = Math.sqrt(Math.pow(coordArray[0], 2) + Math.pow(coordArray[1], 2));
	var boundDistance = 25*8;
	if (dist > boundDistance) {
		coordArray[0] = Math.cos(angle)*boundDistance;
		coordArray[1] = Math.sin(angle)*boundDistance;
	}
	return coordArray;
}

window.onload = function () {
	console.log("start" + Date.now())
	init();
	
	allLoadedCallback = begin;
	loadModels();
	//animate();
}

function begin() {
	console.log(models);
	
	//var floorMesh = new THREE.Mesh( models["grassWorld"].geometry, models["grassWorld"].material);
	var floorMesh = new THREE.Mesh( models["grassWorld"].geometry, models["grassWorld"].material);
	var scale = 25;
	floorMesh.scale.set(scale,scale,scale);
	floorMesh.position.set(0,0,0);
	scene.add( floorMesh ) ;
	
	var thing = new Creeper(models["greenCreep"]);
	entities.push(thing);
	
	var thing = new Slug(models["rockSlug"]);
	entities.push(thing);
	
	
	var thing = new Entity(models["stick"]);
	entities.push(thing);
	
	var thing = new Entity(models["gold"]);
	console.log(thing.mesh);
	entities.push(thing);
	
	var thing = new Minion(models["minion"]);
	entities.push(thing);
	playerEntity = thing;
	thing.makePlayer();
	
	animate();
}

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 50, width / height, 1, 2000 );
	camera.position.set(200,200,200);
	camera.lookAt(new THREE.Vector3(0,0,0));
	scene = new THREE.Scene();
	
	addLights();	
	
	// Renderer

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}

function render() {
	var time = Date.now() * 0.01;
	
	entities.forEach( function (e) {
		e.update();
	});
	playerEntity.updateCameraOn(camera);
	/*
	slugs.forEach( function (e) {
		e.mesh.scale.x = (1 + Math.cos(time) * 0.4) * e.size;
	});*/
	
	renderer.render( scene, camera );
}

function addLights() {
	//var pointIntensity = 1.5;
	//var pointColor = 0xffffff;
	
	
	//scene.add( new THREE.AmbientLight( 0xcccccc ) );
	
	var dirLight = new THREE.DirectionalLight(0xffffff, 2);
	dirLight.position.set(100, 100, 50);
	scene.add(dirLight);
	var dirLight = new THREE.DirectionalLight(0xffffff, 2);
	dirLight.position.set(-100, 100, -50);
	scene.add(dirLight);
}

function onWindowResize( event ) {
	console.log("resize");
	renderer.setSize( width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}


function animate() {
	requestAnimationFrame( animate );
	render();
}







