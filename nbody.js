class Body {
    constructor(x, y, vx, vy, mass) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.mass = mass;
    }
}

var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");

var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var bodies = [];
bodies.push(new Body(0, 0, 0, 0, 20));
bodies.push(new Body(50, 0, 0, -30, 1));


var dt = 0.1;
var polling = start();

function start() {
    if (polling != null) {
        clearInterval(polling);
        polling = null;
    }
    return setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Compute center of mass
        var center_x = 0;
        var center_y = 0;
        var total_mass = 0;

        for (var body of bodies) {
            center_x += body.x * body.mass;
            center_y += body.y * body.mass;
            total_mass += body.mass;
        }

        center_x = center_x / total_mass;
        center_y = center_y / total_mass;

        for (var body of bodies) {
            ctx.beginPath();
            ctx.arc(width / 2 + body.x - center_x, height / 2 + body.y - center_y, Math.sqrt(body.mass) * 3, 0, 2 * Math.PI);
            //ctx.arc(body.x, body.y, Math.sqrt(body.mass) * 3, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Leapfrog integration of next step
        for (var i = 0; i < bodies.length; i++) {
            for (var j = i + 1; j < bodies.length; j++) {
                // Compute displacement vector
                dx = bodies[j].x - bodies[i].x;
                dy = bodies[j].y - bodies[i].y;

                r2 = Math.pow(dx, 2) + Math.pow(dy, 2);

                // Compute magnitude of gravitational force
                ax = 2000 * dx / Math.sqrt(r2) * bodies[j].mass / r2;
                ay = 2000 * dy / Math.sqrt(r2) * bodies[j].mass / r2;

                bodies[i].vx += dt * ax;
                bodies[i].vy += dt * ay;

                ax = -2000 * dx / Math.sqrt(r2) * bodies[i].mass / r2;
                ay = -2000 * dy / Math.sqrt(r2) * bodies[i].mass / r2;

                bodies[j].vx += dt * ax;
                bodies[j].vy += dt * ay;
            }
        }

        for (var i = 0; i < bodies.length; i++) {
            bodies[i].x += dt * bodies[i].vx;
            bodies[i].y += dt * bodies[i].vy;
        }


    }, 10);

}

startButton.onclick = function() {
    polling = start();
}

stopButton.onclick = function() {
    if (polling != null) {
        clearInterval(polling);
        polling = null;
    }
}


