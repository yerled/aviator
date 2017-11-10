define([
    'jquery',
], function($) {
    'use strict';
    function ControlCenter(airplane, sky, sea, switchOn) {
        this.airplane = airplane;
        this.sky = sky;
        this.sea = sea;
        this.switchOn = switchOn;
    }

    var prototype = {
        updateSky: function() {

        },
        updateSea: function() {

        },
        updateAirplane: function() {

        },
    };

    $.extend(ControlCenter.prototype, prototype);
    return ControlCenter;
});