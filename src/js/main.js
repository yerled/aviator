require.config({
    //baseUrl: '/src/js/',
    paths: {
        'jquery': 'lib/jquery',
        'utils': 'js/utils',
        'config': 'js/config',
        'aviator': 'js/aviator',
        // component
        'airplane': 'js/component/airplane',
        'cloud': 'js/component/cloud',
        'pilot': 'js/component/pilot',
        'sea': 'js/component/sea',
        'sky': 'js/component/sky',
        // controller
        'controlCenter': 'js/controller/controlCenter',
        'kbcc': 'js/controller/keyboardControlCenter',
        'mscc': 'js/controller/mouseControlCenter'
    }
});

require(['aviator', 'config'], function(Aviator, config) {
    $(function() {
        var aviator = new Aviator();
        $(window).resize(function() {
            aviator.handleWindowResize();
        });
        $('#pause').click(function() {
            config.setConfig('pause', !config.pause);
        })
        var loop = function() {
            // call the loop function again
            requestAnimationFrame(loop);
        
            if (config.pause) {
                return;
            };
        
            aviator.airplane.update();
            aviator.sky.update();
            aviator.sea.update();
            aviator.airplane.update();
            aviator.renderer.render(aviator.scene, aviator.camera);
        };
        loop();
    });
});