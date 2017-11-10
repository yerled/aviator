require.config({
    baseUrl: '/src/js/',
    paths: {
        'three': 'lib/three.min.js',
        'jquery': 'lib/jquery',
        'utils': 'utils',
        'config': 'config',
        'aviator': 'aviator',
        // component
        'airplane': 'component/airplane',
        'cloud': 'component/cloud',
        'pilot': 'component/pilot',
        'sea': 'component/sea',
        'sky': 'component/sky',
        // controller
        'controlCenter': 'controller/controlCenter',
        'kbcc': 'controller/keyboardControlCenter',
        'mscc': 'controller/mouseControlCenter'
    }
});

require(['aviator'], function(Aviator) {
    $(function() {
        var aviator = new Aviator();
        aviator.init();
        $(window).resize(function() {
            aviator.handleWindowResize();
        });
    });
});