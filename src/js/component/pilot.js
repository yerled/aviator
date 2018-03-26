define([
    'config',
    'jquery',
], function(config, $) {
    'use strict';
    function Pilot() {
		this.mesh = new THREE.Object3D();
		this.mesh.name = 'pilot';
		this.angleHairs = 0;

		this.addComponent();
    }

    var prototype = {
		addComponent: function() {
			this.addHair();
			this.addFace();
			this.addGlass();
			this.addEar();
			this.addBody();
			
		},
		addHair: function() {
			var hairGeom = new THREE.BoxGeometry(4,4,4);
			var hairMat = new THREE.MeshLambertMaterial({color:config.Colors.brown});
			var hair = new THREE.Mesh(hairGeom, hairMat);
			// Align the shape of the hair to its bottom boundary, that will make it easier to scale.
			hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,2,0));
			
			var hairs = new THREE.Object3D();

			this.hairsTop = new THREE.Object3D();
			for (var i = 0; i < 12; i++){
				var h = hair.clone();
				var col = i%3;
				var row = Math.floor(i/3);
				var startPosZ = -4;
				var startPosX = -4;
				h.position.set(startPosX + row*4, 0, startPosZ + col*4);
				this.hairsTop.add(h);
			}
			hairs.add(this.hairsTop);
		
			var hairSideGeom = new THREE.BoxGeometry(12,4,2);
			hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6,0,0));
			var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
			var hairSideL = hairSideR.clone();
			hairSideR.position.set(8,-2,6);
			hairSideL.position.set(8,-2,-6);
			hairs.add(hairSideR);
			hairs.add(hairSideL);
		
			var hairBackGeom = new THREE.BoxGeometry(2,8,10);
			var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
			hairBack.position.set(-1,-4,0)
			hairs.add(hairBack);
			hairs.position.set(-5,5,0);
		
			this.mesh.add(hairs);
		},
		addFace: function() {
			var faceGeom = new THREE.BoxGeometry(10,10,10);
			var faceMat = new THREE.MeshLambertMaterial({color:config.Colors.pink});
			var face = new THREE.Mesh(faceGeom, faceMat);
			this.mesh.add(face);
		},
		addEar: function() {
			var earGeom = new THREE.BoxGeometry(2,3,2);
			var earMat = new THREE.MeshLambertMaterial({color:config.Colors.pink});
			var earL = new THREE.Mesh(earGeom,earMat);
			earL.position.set(0,0,-6);
			var earR = earL.clone();
			earR.position.set(0,0,6);
			this.mesh.add(earL);
			this.mesh.add(earR);
		},
		addGlass: function() {
			var glassGeom = new THREE.BoxGeometry(5,5,5);
			var glassMat = new THREE.MeshLambertMaterial({color:config.Colors.brown});
			var glassR = new THREE.Mesh(glassGeom,glassMat);
			glassR.position.set(6,0,3);
			var glassL = glassR.clone();
			glassL.position.z = -glassR.position.z

			var glassAGeom = new THREE.BoxGeometry(11,1,11);
			var glassA = new THREE.Mesh(glassAGeom, glassMat);

			this.mesh.add(glassR);
			this.mesh.add(glassL);
			this.mesh.add(glassA);
		},

		addBody: function() {
			var bodyGeom = new THREE.BoxGeometry(15,15,15);
			var bodyMat = new THREE.MeshPhongMaterial({color:config.Colors.brown, shading:THREE.FlatShading});
			var body = new THREE.Mesh(bodyGeom, bodyMat);
			body.position.set(2,-12,0);
			this.mesh.add(body);
		},
        update: function() {
            this.updateHairs();
		},
		updateHairs: function() {
			var hairs = this.hairsTop.children;
			// update them according to the angle angleHairs
			var l = hairs.length;
			for (var i=0; i<l; i++){
				var h = hairs[i];
				// each hair element will scale on cyclical basis between 75% and 100% of its original size
				h.scale.y = .75 + Math.cos(this.angleHairs+i/3)*.25;
			}
			// increment the angle for the next frame
			this.angleHairs += 0.16;
		}
    };

    $.extend(Pilot.prototype, prototype);
    return Pilot;
});
