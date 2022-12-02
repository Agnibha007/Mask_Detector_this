// https://teachablemachine.withgoogle.com/models/6qCzDUWXe/
prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6qCzDUWXe/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded")
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = speaking;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speaking = "";

        if (prediction_1 == "Mask") {
            document.getElementById("result_emotion_name").innerHTML = "You can go in";
            speaking = "You can go in";
        } else if (prediction_1 == "Improper_Mask") {
            document.getElementById("result_emotion_name").innerHTML = "Correct your mask and go in";
            speaking = "Correct your mask and go in";
        } else if (prediction_1 == "No_Mask") {
            document.getElementById("result_emotion_name").innerHTML = "You can not go in";
            speaking = "You can not go in";
        }

        speak();

    }
}