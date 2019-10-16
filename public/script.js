import Canvas from './canvas.js';

const canvasHTML = document.getElementById('canvas');
const colorpickerHTML = document.getElementById('colorpicker');
const sizerHTML = document.getElementById('sizer');

const onDraw = point => socket.emit('addPoint', point);

const socket = io();
const canvas = new Canvas(canvasHTML, colorpickerHTML, sizerHTML, onDraw);

socket.on('getPoints', points => {
    canvas.drawPoints(points);
    canvas.savePoints(points);
});
socket.on('getPoint', point => {
    canvas.drawPoint(point);
    canvas.addPoint(point);
});
