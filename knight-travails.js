class Cell{
    constructor(cellIndex) {
        this.index = cellIndex;
        this.knightConnections = setKnightConnections(cellIndex[0],cellIndex[1]);
    }
}


function setKnightConnections(row,col,opArray = []) {
    const knightMoveOffsets = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1],[2, -1], [-2, 1],[-2, -1]];
    knightMoveOffsets.forEach(offset => {
        let index = [offset[0] + row, offset[1] + col];
        if((offset[0] + row)<8 && (offset[0] + row)>=0 &&  (offset[1] + col)<8 && (offset[1] + col)>=0)
            opArray.push(index);
    });
    return opArray;
}


class Node{
    constructor(cell, path) {
        this.cell = cell;
        this.path = path;
    }
}

const queue = (function () {
    queueArray = [];
    function push(node) {
        queueArray.push(node);
    }
    function pop() {
        const node = queueArray[0];
        queueArray.shift();
        return node;
    }
    function size() {
        return queueArray.length;
    }
    
    return {push,pop,size}
})();

function knightMoves(start, end) {
    const startCell = new Cell(start);
    const endCell = new Cell(end);
    const pathWay = findPath(startCell, endCell);
    let opString = `You made it in ${pathWay.length-1} moves! Here is your path:\n`;
    pathWay.forEach(cell => {
        opString += `[${cell}]\n`;
    })
    console.log(opString);
}

function findPath(start, end) {
    let path = [];
    path.push(start.index);
    let node = new Node(start, path);
    queue.push(node);
    while (queue.size() > 0) {
        let currentNode = queue.pop();
        if ((currentNode.cell.index[0] === end.index[0])&&(currentNode.cell.index[1] === end.index[1])) {
            return currentNode.path;
        }
        else {
            let newPath =  [...currentNode.path];
            currentNode.cell.knightConnections.forEach(cellIndex => {
                let individualPath = [...newPath];
                individualPath.push(cellIndex);
                let newCell = new Cell(cellIndex);
                let newNode = new Node(newCell, individualPath);
                queue.push(newNode);
            });
        }
    }
}

knightMoves([0,0], [5,4]);
