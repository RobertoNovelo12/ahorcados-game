let currentWrongCount = 0;
let isInitialized = false;

export function initStickman() {
    const canvas = document.getElementById('stickman-canvas');
    if (!canvas) return;
    canvas.width = 300;
    canvas.height = 300;
    isInitialized = true;
    redrawStickman(0); 
}

export function updateStickmanDisplay(wrongCount) {
    currentWrongCount = wrongCount;
    redrawStickman(wrongCount);
}

export function redrawStickman(wrongCount) {
    if (!isInitialized) return;
    const canvas = document.getElementById('stickman-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--text-color').trim();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    const centerX = canvas.width / 2;
    const baseY = canvas.height * 0.9;
    drawStaticStructure(ctx, centerX, baseY);
    if (wrongCount >= 1) drawHead(ctx, centerX + 80, baseY - 145);
    if (wrongCount >= 2) drawBody(ctx, centerX + 80, baseY - 120, baseY - 60);
    if (wrongCount >= 3) drawLeftArm(ctx, centerX + 80, baseY - 110, centerX + 55, baseY - 85);
    if (wrongCount >= 4) drawRightArm(ctx, centerX + 80, baseY - 110, centerX + 105, baseY - 85);
    if (wrongCount >= 5) drawLeftLeg(ctx, centerX + 80, baseY - 60, centerX + 60, baseY - 20);
    if (wrongCount >= 6) drawRightLeg(ctx, centerX + 80, baseY - 60, centerX + 100, baseY - 20);
}


function drawStaticStructure(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x - 50, y);
    ctx.lineTo(x + 50, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 200);
    ctx.lineTo(x + 80, y - 200);
    ctx.lineTo(x + 80, y - 170);
    ctx.stroke();
}

function drawHead(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.stroke();
}

function drawBody(ctx, x, y1, y2) {
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
}

function drawLeftArm(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawRightArm(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawLeftLeg(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawRightLeg(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


export function resetStickman() {
    const canvas = document.getElementById('stickman-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentWrongCount = 0;  
    const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--text-color').trim();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    const centerX = canvas.width / 2;
    const baseY = canvas.height * 0.9;
    drawStaticStructure(ctx, centerX, baseY);
}