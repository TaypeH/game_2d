import { Game } from "../../game";
import { Enemy } from "../enemy";

export class Stalker extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    type: string;
    constructor(game: Game) {
        super(game);
        this.width = 243;
        this.height = 123;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById("stalker") as HTMLImageElement;
        this.frameY = 0;
        this.lives = 5;
        this.score = this.lives;
        this.type ="stalker";
        this.speedX = Math.random() * -1 - 1;
    }
}
