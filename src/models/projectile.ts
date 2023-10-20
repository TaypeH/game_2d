import { Game } from "./game";

export class Projectile {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    markedForDeletion: boolean;
    image: HTMLImageElement;
    frameX: number;
    maxFrame: number;
    fps: number;
    interval: number;
    timer: number;
    constructor(game: Game, x: number, y: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        // this.width = 10;
        // this.height = 3;
        this.width = 36.25;
        this.height = 20;
        // this.speed = 3;
        this.speed = Math.random() * 0.2 + 2.8;
        this.markedForDeletion = false;
        // this.image = document.getElementById("projectile") as HTMLImageElement;
        this.image = document.getElementById("fireball") as HTMLImageElement;
        this.frameX = 0;
        this.maxFrame = 3;
        this.fps = 20;
        this.timer = 0;
        this.interval = 1000 / this.fps;
    }

    update(deltaTime: number) {
        this.x += this.speed;
        if (this.timer > this.interval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else {
            this.timer += deltaTime;
        }

        if (this.x > this.game.width * 0.8) {
            this.markedForDeletion = true;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
