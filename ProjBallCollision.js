const canvas = document.querySelector('canvas');

document.body.style.backgroundColor = '#201E1F';
document.body.style.margin = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

class Balls {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.lineWidth = 7;
        c.strokeStyle = '#FF4000'
        c.stroke();
        c.closePath();
    }

    update() {

        this.x += this.dx; //making the balls move
        this.y += this.dy;

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        } //making sure balls bounce off the left and right sides of canvas

        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        } //making sure balls bounce off the top and bottom sides of canvas

        //When balls collide, they exhange each others velocity and so bounce off each other and no ball is overlapping any other ball
        for (let j = 0; j < ballsArray.length; j++) {
            const ball = ballsArray[j];
            const xDis = this.x - ball.x;
            const yDis = this.y - ball.y;
            const distance = Math.sqrt(xDis * xDis + yDis * yDis);

            if (distance <= this.radius + ball.radius) {

                const tempDx = this.dx;
                const tempDy = this.dy;
                this.dx = ball.dx;
                this.dy = ball.dy;
                ball.dx = tempDx;
                ball.dy = tempDy;
            }
        }
    }
}

const ballsArray = [];

for (let i = 0; i < 100; i++) {

    let radius = 20;
    let x;
    let y;
    let dx;
    let dy;
    let overlapping;

    //Making sure no ball is created overlapping with any other ball
    do {
        overlapping = false;
        x = Math.random() * (canvas.width - radius * 2) + radius;
        y = Math.random() * (canvas.height - radius * 2) + radius;
        dx = (Math.random() - 0.5) * 3;
        dy = (Math.random() - 0.5) * 3;

        for (let j = 0; j < ballsArray.length; j++) {
            const ball = ballsArray[j];
            const xDis = x - ball.x;
            const yDis = y - ball.y;
            const distance = Math.sqrt(xDis * xDis + yDis * yDis);

            if (distance < radius + ball.radius) {
                overlapping = true;
                break;
            }
        }

    } while (overlapping);

    ballsArray.push(new Balls(x, y, dx, dy, radius));
}

const animate = () => {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {

        ballsArray[i].draw();
        ballsArray[i].update();

    }
};

animate();
