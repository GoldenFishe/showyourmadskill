export default class Canvas {
    constructor(HTMLElement, colorpickerHTMLElement, sizerHTMLElement, onDraw) {
        this.HTMLElement = HTMLElement;
        this.colorpickerHTMLElement = colorpickerHTMLElement;
        this.sizerHTMLElement = sizerHTMLElement;
        this.ctx = HTMLElement.getContext('2d');
        this.paintModeEnabled = false;
        this.fill = '#000000';
        this.size = 3;
        this.onDraw = onDraw;
        this.points = [];

        this.setEventListeners();
        this.setSize();
    }

    addPoint(point) {
        const {x, y, fill, size} = point;
        if (this.points[y]) {
            this.points[y][x] = {fill, size};
        } else {
            this.points[y] = [];
            this.points[y][x] = {fill, size};
        }
    }

    changeFill(event) {
        this.fill = event.target.value;
    }

    changeSize(event) {
        const size = Number.parseInt(event.target.value, 10);
        this.size = size <= 5 ? size : 5;
    }

    draw(event) {
        if (this.paintModeEnabled) {
            const {offsetX, offsetY} = event;
            const {fill, size} = this;
            const point = {x: offsetX, y: offsetY, fill, size: size <= 5 ? size : 5};
            this.onDraw(point)
        }
    }

    drawPoint(point) {
        const {x, y, fill, size} = point;
        this.ctx.beginPath();
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(x, y, size, size);
    }

    drawPoints(points) {
        for (let y = 0; y < points.length; y++) {
            if (points[y]) {
                for (let x = 0; x < points[y].length; x++) {
                    if (points[y][x]) {
                        const {fill, size} = points[y][x];
                        this.drawPoint({x, y, fill, size})
                    }
                }
            }
        }
    }

    disablePaintMode() {
        this.paintModeEnabled = false;
    }

    enablePaintMode() {
        this.paintModeEnabled = true;
    }

    savePoints(points) {
        this.points = points;
    }

    setEventListeners() {
        this.HTMLElement.addEventListener('mousedown', this.enablePaintMode.bind(this), false);
        this.HTMLElement.addEventListener('mousemove', this.draw.bind(this), false);
        this.HTMLElement.addEventListener('mouseup', this.disablePaintMode.bind(this), false);
        this.HTMLElement.addEventListener('touchstart', this.enablePaintMode.bind(this), false);
        this.HTMLElement.addEventListener('touchmove', this.draw.bind(this), false);
        this.HTMLElement.addEventListener('touchend', this.disablePaintMode.bind(this), false);

        this.colorpickerHTMLElement.addEventListener('change', this.changeFill.bind(this), false);
        this.sizerHTMLElement.addEventListener('change', this.changeSize.bind(this), false);

        window.addEventListener('resize', this.resize.bind(this), false);
    }

    setSize() {
        this.HTMLElement.width = window.innerWidth;
        this.HTMLElement.height = window.innerHeight;
    }

    resize() {
        this.HTMLElement.width = window.innerWidth;
        this.HTMLElement.height = window.innerHeight;
        this.drawPoints(this.points);
    }
}
