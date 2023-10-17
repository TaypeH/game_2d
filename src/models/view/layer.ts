import { Game } from "../game";

export class Layer {
    game: Game;
    image: HTMLImageElement | null;
    speedModifier: number;
    height: number;
    width: number;
    x: number;
    y: number;
    constructor(game: Game, image: HTMLImageElement | null, speedModifier: number) {
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.width = 1768;
        this.height = 500;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.x <= -this.width) {
            this.x = 0;
        }

        this.x -= this.game.speed * this.speedModifier;
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image as CanvasImageSource, this.x, this.y);
        context.drawImage(this.image as CanvasImageSource, this.x + this.width, this.y);
    }
}
