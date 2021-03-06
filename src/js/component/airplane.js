define([
    'config',
    'jquery',
    'pilot',
], function(config, $, Pilot) {
    'use strict';
    function Airplane() {
        this.mesh = new THREE.Object3D();
        
        this.addComponent();
    }

    var prototype = {
        addComponent: function() {
            this.addPilot();
            this.addCockpit();
            this.addEngine();
            this.addTail();
            this.addWing();
            this.addPropeller();
            this.addBlade();
        },
        addPilot: function() {
            var pilot = new Pilot();
            pilot.mesh.position.y = 30;
            this.mesh.add(pilot.mesh);
            this.pilot = pilot;
        },
        addCockpit: function() {
            // Create the cabin
            var geomCockpit = new THREE.BoxGeometry(80,50,50,1,1,1);
            var matCockpit = new THREE.MeshPhongMaterial({color:config.Colors.red, shading:THREE.FlatShading});

            // we can access a specific vertex of a shape through 
            // the vertices array, and then move its x, y and z property:
            geomCockpit.vertices[4].y-=10;
            geomCockpit.vertices[4].z+=20;
            geomCockpit.vertices[5].y-=10;
            geomCockpit.vertices[5].z-=20;
            geomCockpit.vertices[6].y+=30;
            geomCockpit.vertices[6].z+=20;
            geomCockpit.vertices[7].y+=30;
            geomCockpit.vertices[7].z-=20;

            var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
            cockpit.castShadow = true;
            cockpit.receiveShadow = true;
            this.mesh.add(cockpit);
        },
        addEngine: function() {
            // Create the engine
            var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
            var matEngine = new THREE.MeshPhongMaterial({color:config.Colors.white, shading:THREE.FlatShading});
            var engine = new THREE.Mesh(geomEngine, matEngine);
            engine.position.x = 40;
            engine.castShadow = true;
            engine.receiveShadow = true;
            this.mesh.add(engine);
        },
        addTail: function() {
            // Create the tail
            var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
            var matTailPlane = new THREE.MeshPhongMaterial({color:config.Colors.red, shading:THREE.FlatShading});
            var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
            tailPlane.position.set(-35,25,0);
            tailPlane.castShadow = true;
            tailPlane.receiveShadow = true;
            this.mesh.add(tailPlane);
        },
        addWing: function() {
            // Create the wing
            var geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
            var matSideWing = new THREE.MeshPhongMaterial({color:config.Colors.red, shading:THREE.FlatShading});
            var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
            sideWing.castShadow = true;
            sideWing.receiveShadow = true;
            this.mesh.add(sideWing);
        },
        addPropeller: function() {
            // propeller
            var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
            var matPropeller = new THREE.MeshPhongMaterial({color:config.Colors.brown, shading:THREE.FlatShading});
            this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
            this.propeller.castShadow = true;
            this.propeller.receiveShadow = true;
        },
        addBlade: function() {
            // blades
            var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
            var matBlade = new THREE.MeshPhongMaterial({color:config.Colors.brownDark, shading:THREE.FlatShading});
            
            var blade = new THREE.Mesh(geomBlade, matBlade);
            blade.position.set(8,0,0);
            blade.castShadow = true;
            blade.receiveShadow = true;
            this.propeller.add(blade);
            this.propeller.position.set(50,0,0);
            this.mesh.add(this.propeller);
        },
        update: function() {
            this.pilot.update();
            this.propeller.rotation.x += 0.3;
        }
    };

    $.extend(Airplane.prototype, prototype);
    return Airplane;
});


var AirPlane = function() {
    
    
    

    
    
    

    
    
    
    
    
    
    
};