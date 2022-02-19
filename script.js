let canvas;
let inpuText;
let context;
let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 150
}
let textData;
let textWidTh;
window.addEventListener("mousemove", (ev) => {
    mouse.x = ev.x;
    mouse.y = ev.y;
})


class Particle {
    constructor(ctx, x, y, r,textLength) {
        this.initialX = Math.random() * 1920;
        this.initialY = Math.random() * 1080;
        this.targetX = x;
        this.targetY = y;
        this.x = this.initialX;
        this.y = this.initialY;
        this.accelerationFactor = 50;
        this.dx =  (this.targetX - this.initialX)/this.accelerationFactor;
        this.dy =  (this.targetY - this.initialY)/this.accelerationFactor;
        this.ctx = ctx;
        this.r = r;
        this.d = r * 2;
        this.isConvergedX = false;
        this.isConvergedY = false;
        this.textLength = textLength * 200;
    }

    draw = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fillStyle = "#09f";
        this.ctx.fill();
    }

    update = () => {
        if(!this.isConvergedX){
        if (Math.abs(this.targetX - this.x) > 0.5) {
            this.x += this.dx;
        }else{
            this.isConvergedX = true;
        }} else{
            this.x = this.targetX + (Math.sin(Date.now()/1000)*this.textLength);
        }
        if (Math.abs(this.targetY - this.y) > 0.5) {
            this.y += this.dy;
        }
        this.draw();
    }
}

let renderPreview = (text) => {
    particles = [];
    context.font = "30px Verdana";
    context.fillStyle = "#09f";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, 100, 200);
    let tr = 0;
    let tc = 0;
    let px = 0;
    textData = context.getImageData(100, 170, 1440, 40);

    textData.data.map((t, i) => {
        px += t;
        if (i % 3 == 0) {
            if (px > 0) {
                particles.push(new Particle(context, (tc * 25) + (canvas.width/2.0-(text.length * 300)), (tr * 25), 1, text.length));
                px = 0;
            }
            tc++;
            if (tc == 1920) {
                tr++;
                tc = 0;
            }
        }
    });
}

let init = () => {
    input = document.createElement("input");
    input.placeholder = "enter some text..."
    input.value = "Metrophobe";
    canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    document.body.appendChild(input);
    document.body.appendChild(canvas);
}

let wireup = () => {
    input.addEventListener("keyup", (ev) => {
        renderPreview(ev.target.value);
    });
}

let animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.map((p, i) => {
            p.update();
        });
    window.requestAnimationFrame(animate);
}




document.addEventListener("DOMContentLoaded", () => {
    init();
    wireup();
    renderPreview("Metrophobe");
    animate();

})







