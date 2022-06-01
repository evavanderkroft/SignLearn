function rotatePlastic(){
    const url = 'http://localhost:3000/rotatePlastic';
    fetch(url)
    .then(console.log("rotate plastic"))
}

function rotatePapier(){
    const url = 'http://localhost:3000/rotatePapier';
    fetch(url)
    .then(console.log("Rotate papier"))
}


function rotateRestafval(){
    const url = 'http://localhost:3000/rotateRestafval';
    fetch(url)
    .then(console.log("Rotate restafval"))
}

