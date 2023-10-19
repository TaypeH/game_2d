import { Game } from "../game";
import { Enemy } from "./enemy";

export class Angler2 extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    constructor(game: Game) {
        super(game);
        this.width = 213;
        this.height = 169;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById("angler2") as HTMLImageElement;
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 3;
        this.score = this.lives;
        this.type = "angler2";
    }
}
