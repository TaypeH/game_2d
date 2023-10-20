import { Player } from './player';
import { Game } from "./game";

export class Shield {
    game: Game;
    width: any;
    height: any;
    frameX: number;
    maxFrame: number;
    image!: HTMLImageElement;
    fps: number;
    timer: number;
    interval: number;
    constructor(game: Game) {
        this.game = game;
        this.width = this.game.player.width;
        this.height = this.game.player.height;
        this.frameX = 0;
        this.maxFrame = 24;
        this.image = document.getElementById('playerShield') as HTMLImageElement;
        this.fps = 30;
        this.timer = 0;
        this.interval = 1000/this.fps;
    }
    update (deltaTime: number) {
        if(this.frameX <= this.maxFrame) {
            if (this.timer > this.interval) {
                this.frameX++;
                this.timer = 0;
            } else {
                this.timer += deltaTime;
            }
        }
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.game.player.x,
            this.game.player.y,
            this.width,
            this.height
        )
    }
    reset(){
        this.frameX = 0;
        this.game.sound.shield();
    }
}
