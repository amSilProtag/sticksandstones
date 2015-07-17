var camera, scene, renderer, objects;

var width = 640;
var height = 480;

var clock = new THREE.Clock();
var morphs = [];
var slugs = [];

var models = [];
var entities = [];

window.onload = function () {
	console.log("start" + Date.now())
	init();
	
	allLoadedCallback = begin;
	loadModels();
	//animate();
}

function begin() {
	console.log(models);
	
	var floorMesh = new THREE.Mesh( models["floor"].geometry, models["floor"].material);
	var scale = 10;
	floorMesh.scale.set(scale,scale,scale);
	floorMesh.position.set(0,0,0);
	scene.add( floorMesh ) ;
	
	var thing = new Creeper(models["greenCreep"]);
	entities.push(thing);
	
	var thing = new Slug(models["rockSlug"]);
	entities.push(thing);
	
	animate();
}

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 50, width / height, 1, 2000 );
	camera.position.set(100,100,100);
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







