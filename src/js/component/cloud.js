define([
    'config',
    'jquery',
], function(config, $) {
    'use strict';
    function Cloud() {
        this.mesh = new THREE.Object3D();
        
        this.addComponent();
    }

    var prototype = {
        addComponent: function() {
            this.addBlock();
        },
        addBlock: function() {
            var geom = new THREE.BoxGeometry(20,20,20);
            var mat = new THREE.MeshPhongMaterial({
                color: config.Colors.white,  
            });

            // duplicate the geometry a random number of times
            var nBlocs = 3 + Math.floor(Math.random() * 3);
            for (var i = 0; i < nBlocs; i++){
                var m = new THREE.Mesh(geom, mat);
                m.position.x = i*15;
                m.position.y = Math.random()*10;
                m.position.z = Math.random()*10;
                m.rotation.z = Math.random()*Math.PI*2;
                m.rotation.y = Math.random()*Math.PI*2;
                
                // set the size of the cube randomly
                var s = .1 + Math.random()*.9;
                m.scale.set(s,s,s);
                
                // allow each cube to cast and to receive shadows
                m.castShadow = true;
                m.receiveShadow = true;
                
                // add the cube to the container we first created
                this.mesh.add(m);
            } 
        },
        update: function() {
            
        }
    };

    $.extend(Cloud.prototype, prototype);
    return Cloud;
});
