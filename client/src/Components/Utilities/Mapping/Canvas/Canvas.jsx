import Point from './Point.jsx';
import Entity from '../../Objects/Entity.jsx';

class Canvas {
    constructor(width = 250, height = 250) {
        this.width = width;
        this.height = height;
        this.pointDistance = 10;
        this.grid = this.createGrid(width, height);
        this.objects = {};
    }

    createGrid(width, height) {
        let matrix = [];
        for (let row = 0; row < height; row+=this.pointDistance) {
            let rowOfPoints = [];
            for (let col = 0; col < width; col+=this.pointDistance) {
                rowOfPoints.push(new Point(row, col));
            }
            matrix.push(rowOfPoints);
        }
        return matrix;
    }

    getRelativePos(x = 0, y = 0) {
        x /= this.pointDistance;
        y /= this.pointDistance;
        return {x:x, y:y};
    }

    getPoint(xPos, yPos) {
        let {x, y} = this.getRelativePos(xPos, yPos);
        if(this.grid[y] && this.grid[y][x]) {
            return this.grid[y][x];
        } else {
            return null;
        }
    }

    fillPoints(points, val) {
        points.forEach((point) => {
            if (val) {
                point.fill();
            } else {
                point.remove();
            }
        })
    }

    isInBounds(x, y) {
        return this.getPoint(x, y) ? true : false;
    }

    findAllMapPoints(x, y, width, height) {
        let points = [];
        let overlap = false;
        for (let col = x; col < x + width; col += this.pointDistance) {
            for (let row = y; row < y + height; row += this.pointDistance) {
                let point = this.getPoint(row, col);
                if (point && !point.filled) {
                    points.push(point);
                } else {
                    overlap = true;
                }
            }
        }
        return {points: points, overlap: overlap};
    }

    placeObject(name, x, y, width, height) {
        let { points, overlap } = this.findAllMapPoints(x, y, width, height);
        if (!overlap) {
            let origin = {x:x,y:y};
            this.objects[name] = new Entity(name, points, width, height, origin);
            this.fillPoints(points, true);
            return this.objects[name];
        } else {
            return false;
        }
    }

    updateObject(name, xDir, yDir) {
        if (this.objects[name]) {
            let {points, width, height, origin} = this.objects[name];
            let newPosX = origin.x + xDir;
            let newPosY = origin.y + yDir;
            this.placeObject(name, newPosX, newPosY, width, height);
        }
    }

    deleteObject(name) {
        if (this.objects[name]) {
            delete this.objects[name];
        }
    }

    visualize() {
        let visualGrid = "";
        for (let row = 0; row < this.height; row+=this.pointDistance) {
            let visualRow = "";
            for (let col = 0; col < this.width; col+=this.pointDistance) {
                let point = this.getPoint(row, col);
                if (point.filled) {
                    visualRow += 'X ';
                } else {
                    visualRow += 'O ';
                }
            }
            visualGrid += visualRow + '\n';
        }
        console.log(visualGrid);
        return visualGrid;
    }
};

const _Canvas = new Canvas();
export default _Canvas;