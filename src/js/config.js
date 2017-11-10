define([
    'jquery',
], function($) {
    'use strict';
    
    function Config() {
        $.extend(this. this.defaultConfig);
    }

    var prototype = {
        _defaultConfig: {
            pause: false,
            colors: {
                red:0xf25346,
                white:0xd8d0d1,
                brown:0x59332e,
                pink:0xF5986E,
                brownDark:0x23190f,
                blue:0x68c3c0,
            },
            seaSpeed: .005,
            skySpeed: .01,
            height: window.innerHeight,
            width: window.innerWidth,
            appId: 'world',
            mousePos: {
                x: 0,
                y: 0,
            },
        },
        setConfig: function(name, value) {
            if (this[name] === undefined) {
                return;
            }
            this[name] = value;
        },
        setConfigs: function(configArr) {
            configArr.forEach(function(config) {
                if ($.isArray(config)) {
                    this.setConfig(config[0], config[1])
                }
            })
        },
    };

    $.extend(Config.prototype, prototype);
    return Config;
});