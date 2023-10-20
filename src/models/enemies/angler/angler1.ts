import { Game } from "../../game";
import { Enemy } from "../enemy";

export class Angler1 extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    constructor(game: Game) {
        super(game);
        this.width = 228;
        this.height = 169;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById("angler1") as HTMLImageElement;
        this.frameY = Math.floor(Math.random() * 3);
        this.lives = 5;
        this.score = this.lives;
        this.type = "angler1";
    }
}
