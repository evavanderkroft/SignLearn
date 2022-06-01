    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "./my_model/";

    let model, webcam, labelContainer, maxPredictions;

    let div = document.createElement("div");
    let predictionContainer = document.getElementById("prediction-container");

    let predictionValues = [];
    let highestIndex;
    let count = 0;
    let previousPrediction;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        //remove button
        let button = document.getElementById("button-start");
        button.parentNode.removeChild(button);

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {


            webcam.update(); // update the webcam frame
            let prediction = await predict();
            window.requestAnimationFrame(loop);


        
        if(count == 0) {
            if(prediction[highestIndex].probability > 0.9) {
                previousPrediction = prediction[highestIndex].className
                count = 1
            }
        }

        if(prediction[highestIndex].className == previousPrediction && prediction[highestIndex].probability > 0.9) {
            count++
        }

        if(prediction[highestIndex].className != previousPrediction) {
            count = 0
        }


        if (count > 60) {

            if(previousPrediction == "Plastic") {
                rotatePlastic();
                count = -1

                var delayInMilliseconds = 6000; 
                setTimeout(function() {
                    count = 0;
                    }, delayInMilliseconds);
                
            }

            if(previousPrediction == "Papier") {
                rotatePapier();
                count = -1
                setTimeout(function() {
                    count = 0;
                    }, 6000);
            }

            if(previousPrediction == "Restafval") {
                rotateRestafval();
                count = -1
                setTimeout(function() {
                    count = 0;
                    }, 6000);
            }
        }

        console.log("count: ", count)
        

    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        predictionValues = [prediction[0].probability, prediction[1].probability, prediction[2].probability];
        highestIndex = predictionValues.indexOf(Math.max.apply(Math, predictionValues))

        div.innerHTML = prediction[highestIndex].className
        predictionContainer.appendChild(div)
        
        console.log(prediction)

        return prediction;
    }

    function myFunction() {
        document.getElementById("demo").innerHTML = "Hello World";
      }