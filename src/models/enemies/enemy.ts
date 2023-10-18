import { Game } from './../game';
export abstract class Enemy {
    game: Game;
    x: number;
    speedX: number;
    markedForDeletion: boolean;
    width: number = 0;
    height: number = 0;
    y: number = 0;
    lives: number;
    score: number;
    frameY: number;
    abstract image: HTMLImageElement;
    maxFrame: number;
    frameX: number;

    constructor(game: Game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.lives = 5;
        this.score = this.lives;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
    }

    update() {
        this.x += this.speedX - this.game.speed;
        if (this.x + this.width < 0) this.markedForDeletion = true;
        //sprite animation
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        context.font = "30px Helvetica";
        context.fillText(this.lives.toString(), this.x, this.y);
    }
}
