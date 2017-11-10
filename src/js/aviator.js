define([
    'jquery',
    'config',
    'utils',
    'sea',
    'sky',
    'airplane',
    'kbcc',
    'mscc',
], function($, config, utils, Sea, Sky, AirPlane, KBCC, MSCC) {
    'use strict';

    function Aviator() {
        
    }
    
    var prototype = {
        init: function() {
            var that = this;
            this.createScene();
            [
                this.createLights(), 
                this.createSea(),
                this.createPlane(),
                this.createSky(),
            ].forEach(function(e) {
                if ($.isArray(e)) {
                    e.forEach(function(ele) {
                        ele.mesh ? that.scene.add(ele.mesh) : that.scene.add(ele);
                    });
                } else {
                    ele.mesh ? that.scene.add(ele.mesh) : that.scene.add(ele);
                }
            });
            
            this.createCamera();

            this.createRenderer();
            this.renderer.render(this.scene, this.camera);

            this.loop();
        },
        createScene: function() {
            var scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

            return this.scene = scene;
        },
        createRenderer: function() {
            var renderer = new THREE.WebGLRenderer({
                alpha: true, 
                antialias: true 
            });
            renderer.setSize(config.width, config.height);
            renderer.shadowMap.enabled = true;
            document.getElementById(config.appId).appendChild(renderer.domElement);
            return this.renderer = renderer;
        },
        createCamera: function() {
            var camera = new THREE.PerspectiveCamera(
                60,
                config.width / config.height, 
                1,
                10000
            );
            camera.position.set(-150, 200, 0);
            camera.lookAt(0, 120, 0);
            return this.camera = camera;
        },
        createLights: function() {
            hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
            ambientLight = new THREE.AmbientLight(0xdc8874, .8);
            shadowLight = new THREE.DirectionalLight(0xffffff, .9);
            
            // Set the direction of the light  
            shadowLight.position.set(0, 350, 200);
            // Allow shadow casting 
            shadowLight.castShadow = true;
            // define the visible area of the projected shadow
            shadowLight.shadow.camera.left = -400;
            shadowLight.shadow.camera.right = 400;
            shadowLight.shadow.camera.top = 400;
            shadowLight.shadow.camera.bottom = -400;
            shadowLight.shadow.camera.near = 1;
            shadowLight.shadow.camera.far = 1000;
            // define the resolution of the shadow; the higher the better, 
            // but also the more expensive and less performant
            shadowLight.shadow.mapSize.width = 2048;
            shadowLight.shadow.mapSize.height = 2048;
            
            return this.lights = [hemisphereLight, ambientLight, shadowLight];
        },
        createSea: function () {
            var sea = new Sea();
            sea.mesh.position.y = -600;
            
            return this.sea = sea;
        },
        createSky: function() {
            var sky = new Sky();
            sky.mesh.position.y = -600;

            return this.sky = sky;
        },
        createPlane: function() { 
            var airplane = new AirPlane();
            airplane.mesh.scale.set(.25,.25,.25);
            airplane.mesh.position.y = 100;
            
            return this.airplane = airplane;
        },
        handleWindowResize: function() {
            // update height and width of the renderer and the camera
            config.setConfig([
                ['height', window.innerHeight],
                ['width', window.innerWidth]
            ]);
            this.renderer.setSize(config.width, config.height);
            this.camera.aspect = config.width / config.height;
            this.camera.updateProjectionMatrix();
        },
        loop: function() {
            // call the loop function again
            requestAnimationFrame(loop);
        
            if (!config.pause) {
                return;
            };
        
            this.airplane.update();
            this.sky.update();
            this.sea.update();
            
            sky.mesh.rotation.z += .01;
        
            // render the scene
            renderer.render(scene, camera);
        },
    }

    $.extend(Aviator.prototype, prototype);
    return Aviator;
});





function updatePlaneByMouse(){
    
    // let's move the airplane between -100 and 100 on the horizontal axis, 
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)
    
    var targetX = normalize(mousePos.x, -1, 1, -100, 100);
    var targetY = normalize(mousePos.y, -1, 1, 25, 175);

    
    // Move the plane at each frame by adding a fraction of the remaining distance
	airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*0.08;
    
    // Rotate the plane proportionally to the remaining distance
    airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*0.0128;
    airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*0.0064;

    airplane.propeller.rotation.x += 0.3;

    airplane.pilot.updateHairs();
}



function normalize(v,vmin,vmax,tmin, tmax){

    var nv = Math.max(Math.min(v,vmax), vmin);
    var dv = vmax-vmin;
    var pc = (nv-vmin)/dv;
    var dt = tmax-tmin;
    var tv = tmin + (pc*dt);
    return tv;

}


function updatePlaneByKeyboard(){
    return
    // Move the plane at each frame by adding a fraction of the remaining distance
	airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*0.08;
    
    // Rotate the plane proportionally to the remaining distance
    airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*0.0128;
    airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*0.0064;

    airplane.propeller.rotation.x += 0.3;

    airplane.pilot.updateHairs();
}