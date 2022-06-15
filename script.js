BALL_START_X = null;
BALL_START_Y = null;
BALL_END_X = null;
BALL_END_Y = null;
FORCE = 0;
ANGLE = 0;
const ball = document.getElementById("ball");
const guide = document.getElementById("guide");
const pins = document.querySelectorAll(".pin");
const message = document.getElementById("message");


const moveBall = (event) => {
    BALL_END_X = event.pageX;
    BALL_END_Y = event.pageY;
    adjustGuide();
    ball.style.top = BALL_END_Y - 30 + 'px';
    ball.style.left = BALL_END_X - 30 + 'px';

}

const handleMouseDown = (event) => {
    BALL_START_X = event.pageX;
    BALL_START_Y = event.pageY;
    document.addEventListener("pointermove", moveBall)
}

const adjustGuide = () => {
    adj = BALL_END_Y - BALL_START_Y;
    opp = BALL_END_X - BALL_START_X;
    tan = opp / adj;
    angle_rad = Math.atan(tan);
    ANGLE = angle_rad;
    FORCE = Math.sqrt(Math.pow(adj, 2) + Math.pow(opp, 2))
    guide.style.height = BALL_END_Y - BALL_START_Y + 'px';
    guide.style.transform = `perspective(150px) rotate(${-angle_rad}rad) rotateX(${adj / 5}deg)`
}

const rollBall = ()=>{
    setInterval(() => {
        ball.style.top = parseInt(ball.style.top) - Math.cos(ANGLE) * 10 + 'px';
        ball.style.left = parseInt(ball.style.left) - Math.sin(ANGLE) * 10 + 'px';
        ball.classList.add("roll")
    }, 2000 / FORCE)
}

const pinsFall = ()=>{
    setTimeout(() => {
        pins.forEach((pin, index) => {
            if (index % 2 === 0) {
                pin.classList.add("fall-left")
            } else {
                pin.classList.add("fall-right")
            }
        })
       setTimeout(()=>{ message.classList.remove("hidden")},300)
    }, 40000 / FORCE)
}

const handleMouseUp = () => {
    rollBall();
    pinsFall();
    document.removeEventListener("pointermove", moveBall)
}

ball.addEventListener('pointerdown', handleMouseDown)
document.addEventListener('pointerup', handleMouseUp)

