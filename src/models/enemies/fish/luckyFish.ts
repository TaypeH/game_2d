import { Game } from "../../game";
import { Enemy } from "../enemy";

export class LuckyFish extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    type: string;
    constructor(game: Game) {
        super(game);
        this.width = 99;
        this.height = 95;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById("lucky") as HTMLImageElement;
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 5;
        this.score = 15;
        this.type ="lucky";
    }
}
