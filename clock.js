var startButton = document.getElementById("action");
var stopButton = document.getElementById("stop");
var polling = startClock();

function startClock() {
    if (polling != null) {
        clearInterval(polling);
        polling = null;
    }

    return setInterval(() => {
        var canvas = document.getElementById("main");
        var ctx = canvas.getContext("2d");

        origin_x = canvas.width / 2;
        origin_y = canvas.height / 2;
        hand_length = origin_x * 0.8;

        var now = new Date(Date.now());

        var seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        var minutes = now.getMinutes() + seconds / 60;
        var hours = (now.getHours() + minutes / 60) % 12;

        //console.log("H: " + hours + " m: " + minutes + " s: " + seconds);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;

        // Ticks
        ctx.strokeStyle = "black";

        for (var hour of [0, 3, 6, 9]) {
            angle = (hour / 12 - 0.25) * 2 * Math.PI;
            ctx.beginPath();
            ctx.moveTo(origin_x + origin_x * Math.cos(angle), origin_y + origin_y * Math.sin(angle));
            ctx.lineTo(origin_x + origin_x * Math.cos(angle) * 0.9, origin_y + origin_y * Math.sin(angle) * 0.9);
            ctx.stroke();
        }

        for (var hour of [1, 2, 4, 5, 7, 8, 10, 11]) {
            angle = (hour / 12 - 0.25) * 2 * Math.PI;
            ctx.beginPath();
            ctx.moveTo(origin_x + origin_x * Math.cos(angle), origin_y + origin_y * Math.sin(angle));
            ctx.lineTo(origin_x + origin_x * Math.cos(angle) * 0.95, origin_y + origin_y * Math.sin(angle) * 0.95);
            ctx.stroke();
        }

        for (var minute = 1; minute < 60; minute++) {
            if (minute % 5 != 0) {
                angle = (minute / 60 - 0.25) * 2 * Math.PI;
                ctx.beginPath();
                ctx.moveTo(origin_x + origin_x * Math.cos(angle), origin_y + origin_y * Math.sin(angle));
                ctx.lineTo(origin_x + origin_x * Math.cos(angle) * 0.98, origin_y + origin_y * Math.sin(angle) * 0.98);
                ctx.stroke();
            }
        }

        ctx.lineWidth = 3;
        // Hour hand
        var hour_angle = hours / 12 * 2 * Math.PI - Math.PI / 2;
        var hour_x = Math.cos(hour_angle);
        var hour_y = Math.sin(hour_angle);

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(origin_x, origin_y);
        ctx.lineTo(origin_x + 0.7 * hand_length * hour_x, origin_y + 0.7 * hand_length * hour_y);
        ctx.stroke();

        // Minute hand
        var minute_angle = minutes / 60 * 2 * Math.PI - Math.PI / 2;
        var minute_x = Math.cos(minute_angle);
        var minute_y = Math.sin(minute_angle);

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(origin_x, origin_y);
        ctx.lineTo(origin_x + hand_length * minute_x, origin_y + hand_length * minute_y);
        ctx.stroke();

        ctx.lineWidth = 2;
        // Second hand
        var second_angle = seconds / 60 * 2 * Math.PI - Math.PI / 2;
        var second_x = Math.cos(second_angle);
        var second_y = Math.sin(second_angle);

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(origin_x, origin_y);
        ctx.lineTo(origin_x + hand_length * second_x, origin_x + hand_length * second_y);
        ctx.stroke();

    }, 125);
};

startButton.onclick = function() {
    polling = startClock();

};

stopButton.onclick = function() {
    if (polling != null) {
        clearInterval(polling);
        polling = null;
    }
};
