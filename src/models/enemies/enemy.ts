import { Game } from './../game';
export class Enemy {
    game: Game;
    x: number;
    speedX: number;
    markedForDeletion: boolean;
    width: number = 0;
    height: number = 0;
    y: number = 0;
    lives: number;
    score: number;
    constructor(game: Game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.lives = 5;
        this.score = this.lives;
    }

    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = "black";
        context.font = "30px Helvetica";
        context.fillText(this.lives.toString(), this.x, this.y);
    }
}
