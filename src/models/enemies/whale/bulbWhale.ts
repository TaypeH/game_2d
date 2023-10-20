import { Game } from "../../game";
import { Enemy } from "../enemy";

export class BulbWhale extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    type: string;
    constructor(game: Game) {
        super(game);
        this.width = 270;
        this.height = 219;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById("bulbWhale") as HTMLImageElement;
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 20;
        this.score = this.lives;
        this.type ="bulb";
        this.speedX = Math.random() * -1.2 - 0.2;
    }
}
