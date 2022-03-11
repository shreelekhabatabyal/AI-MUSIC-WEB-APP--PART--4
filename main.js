song = "";
leftwrist_score = 0;
rightwrist_score = 0;

function preload() {
    song = loadSound("music.mp3");
}

leftwristx = 0;
rightwristx = 0;
leftwristy = 0;
rightwristy = 0;

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log(results);
        leftwrist_score = results[0].pose.keypoints[9].score;
        rightwrist_score = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 400);

    fill("#ff0000");
    stroke("#ff0000");
    if (rightwrist_score >= 0.2) {
        circle(rightwristx, rightwristy, 20);
        if (rightwristy > 0 && rightwristy <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "speed=0.5x"

        } else if (rightwristy > 100 && rightwristy <= 200) {
            song.rate(1);

            document.getElementById("speed").innerHTML = "speed=1x";
        } else if (rightwristy > 200 && rightwristy <= 300) {
            song.rate(1.5);

            document.getElementById("speed").innerHTML = "speed=1.5x";
        } else if (rightwristy > 300 && rightwristy <= 400) {
            song.rate(2);

            document.getElementById("speed").innerHTML = "speed=2x";
        }
    }
    circle(leftwristx, leftwristy, 20);
    leftwristy_number = floor(Number(leftwristy));
    volume = leftwristy_number / 400;
    song.setVolume(volume);
}

function play_music() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}