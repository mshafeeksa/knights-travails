class Cell{
    constructor(row, col , parentCell = null) {
        this.row = row;
        this.col = col;
        this.knightConnections = [];
    }
}

const chessBoard = (function () {
    let chessArray = [];
    
    for (i = 0; i < 8; i++) {
        let rowArray = [];
        for (j = 0; j < 8; j++) {
            const cell = new Cell(i, j);
            rowArray.push(cell);
        }
        chessArray.push(rowArray);
    }
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            setConnections(chessArray[i][j],chessArray);
        }
    }
    
    function getCell(index) {
        let row = index[0];
        let col = index[1];
        return chessArray[row][col];
    }

    console.log(chessArray);

    return{getCell}

})();

function setConnections(cell, ipArray ,opArray = []) {
    let row = cell.row;
    let col = cell.col;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (checkCombination(i, j, row, col) === true) {
                opArray.push(ipArray[i][j]);
            }
        }   
    }
    cell.knightConnections = opArray;
}

function checkCombination(i, j, row, col) {
    let rowDifference = Math.abs(i - row);
    let colDifference = Math.abs(j - col);
    if (rowDifference != colDifference && rowDifference + colDifference === 3 &&
        Math.abs(rowDifference - colDifference) === 1) {
        return true;
    }
    else
        return false;
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
    const startCell = chessBoard.getCell(start);
    const endCell = chessBoard.getCell(end);
    const pathWay = findPath(startCell, endCell);
    let opString = `You made it in ${pathWay.length} moves! Here is your path:\n`;
    pathWay.forEach(cell => {
        opString += `[${cell.row},${cell.col}]\n`;
    })
    console.log(opString);
}

function findPath(start, end) {
    let path = [];
    path.push(start);
    let node = new Node(start, path);
    queue.push(node);
    while (queue.size() > 0) {
        let currentNode = queue.pop();
        if (currentNode.cell === end) {
            console.log("Found");
            console.log(currentNode.path);  
            return currentNode.path;
        }
        else {
            let newPath =  [...currentNode.path];
            currentNode.cell.knightConnections.forEach(cell => {
                let individualPath = [...newPath];
                individualPath.push(cell);
                let newNode = new Node(cell, individualPath);
                queue.push(newNode);
            });
        }
    }
}

knightMoves([3,3], [4,3]);
