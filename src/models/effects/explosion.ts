import { Game } from "../game";

export class Explosion {
    image!: HTMLImageElement;
    x: number;
    y: number;
    frameX: number;
    spriteHeight: number;
    timer: number;
    interval: number;
    fps: number;
    markedForDeletion: boolean;
    spriteWidth: number;
    width: number;
    height: number;
    maxFrame: number;
    game: Game;

    constructor(game: Game, x: number, y: number) {
        this.game = game;
        this.frameX = 0;
        this.spriteHeight = 200;
        this.fps = 30;
        this.timer = 0;
        this.interval = 1000 / this.fps;
        this.markedForDeletion = false;
        this.maxFrame = 8;
        this.spriteWidth = 200;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
    update(deltaTime: number) {
        this.x -= this.game.speed;
        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        }else{
            this.timer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
