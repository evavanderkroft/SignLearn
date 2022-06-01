const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())

const {Board, Servo} = require("johnny-five");
const board = new Board();



app.get('/rotatePlastic', (req, res) => {
    const afval = 10;
    res.send("Rotate plastic!");
    servoOpen(afval);
    var delayInMilliseconds = 3000; //1 second

    setTimeout(function() {
    servoClose(afval);
    }, delayInMilliseconds);
})

app.get('/rotatePapier', (req, res) => {
    const afval = 11;
    res.send("Rotate papier!");
    servoOpen(afval);
    var delayInMilliseconds = 3000; //1 second

    setTimeout(function() {
    servoClose(afval);
    }, delayInMilliseconds);
})

app.get('/rotateRestafval', (req, res) => {
    const afval = 12;
    res.send("Rotate restafval!");
    servoOpen(afval);
    var delayInMilliseconds = 3000; //1 second

    setTimeout(function() {
    servoClose(afval);
    }, delayInMilliseconds);
})


app.listen(3000, () => {
    console.log("Server has started and is listening on port 3000")
})

board.on("ready", () => {
  const servoPlastic = new Servo(10);
  const servoPapier = new Servo(11);
  const servoRestafval = new Servo(12);

  // Add servo to REPL (optional)
  board.repl.inject({
    servoPlastic,
    servoPapier,
    servoRestafval
  });



servoOpen = (afval) => {
    if(afval == 10) {
        servoPlastic.to(180);
    } 
    if(afval == 11) {
        servoPapier.to(180);
    } 
    if(afval == 12) {
        servoRestafval.to(180);
    } 
    
}

servoClose = (afval) => {    
    if(afval == 10) {
        servoPlastic.to(10);
    } 
    if(afval == 11) {
        servoPapier.to(10);
    } 
    if(afval == 12) {
        servoRestafval.to(10);
    } 
}
  


//   servo.sweep();
});
