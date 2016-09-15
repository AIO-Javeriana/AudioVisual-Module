class Canvas{
    constructor(width, height, backgroundColor){
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.element = document.getElementById('stage-canvas');
        $('canvas').css('background-color', this.backgroundColor);
    }
}