import { Game } from "./game";

export class Particle {
    game: Game;
    x: number;
    y: number;
    image: HTMLImageElement;
    frameX: number;
    frameY: number;
    spriteSize: number;
    sizeModifier: string;
    speedX: number;
    speedY: number;
    gravity: number;
    markedForDeletion: boolean;
    angle: number;
    va: number;
    size: number;
    bounced: number;
    bottomBounceBoundary: number;
    constructor(game: Game, x: number, y: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = document.getElementById("gears") as HTMLImageElement;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 50;
        this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
        this.size = this.spriteSize * +this.sizeModifier;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -15;
        this.gravity = 0.5;
        this.markedForDeletion = false;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
        this.bounced = 0;
        this.bottomBounceBoundary = Math.random() * 100 + 60;

    }
    update() {
        this.angle += this.va;
        this.speedY += this.gravity;
        this.x -= this.speedX;
        this.y += this.speedY;
        if (this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
        if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
            this.bounced++;
            this.speedY *= -0.5;
        }
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.x, this.y, this.size, this.size);
    }
}
