function KeyboardControlCenter() {
    this.derectives = [
        'goUp', 'goDown',
        'turnLeft', 'turnRight',
        'speedUp', 'slowDown', 
    ];
    this.keycodeMap = {
        '87': 'goUp',
        '83': 'goDown',
        '65': 'turnLeft',
        '68': 'turnRight',
        '38': 'speedUp',
        '40': 'slowDown',
    };
    this.derectiveStatus = {};
    this.resetDerective();
}

KeyboardControlCenter.prototype.resetDerective = function() {
    this.derectives.forEach(function(e) {
        keyboardControlCenter[e] = false;
    });
}

KeyboardControlCenter.prototype.setDerectiveByKeycode = function(keycode) {
    keycode += '';
    this.derectiveStatus[this.keycodeMap[keycode]] = true;
}

