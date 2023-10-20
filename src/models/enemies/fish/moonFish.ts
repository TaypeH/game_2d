import { Game } from "../../game";
import { Enemy } from "../enemy";

export class MoonFish extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    type: string;
    constructor(game: Game) {
        super(game);
        this.width = 227;
        this.height = 240;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById("moonFish") as HTMLImageElement;
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 10;
        this.score = this.lives;
        this.type ="moon";
        this.speedX = Math.random() * -1.2 - 2;
    }
}
