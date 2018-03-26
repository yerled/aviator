define([
    'jquery',
    'utils',
    'controlCenter',
], function($, utils, ControlCenter) {
    'use strict';
    function MSCC(airplane, sky, sea, switchOn) {
        ControlCenter.apply(this, arguments);
        
    }

    var prototype = {
        switchMSCC: function() {
            if (this.switchOn) {
                $(document).bind('mousemove', this.handleMouseMove);
            } else {
                $(document).unbind('mousemove', this.handleMouseMove);
            }
        },
        handleMouseMove: function(e) {
            if (!this.switchOn) {
                return
            }

            utils.setMousePos = {
                x: -1 + (event.clientX / WIDTH)*2, 
                y: 1 - (event.clientY / HEIGHT)*2,
            };
        },
    };

    $.extend(MSCC.prototype, ControlCenter.prototype);
    $.extend(MSCC.prototype, prototype);
    return MSCC;
});