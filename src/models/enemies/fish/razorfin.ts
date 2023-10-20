import { Game } from "../../game";
import { Enemy } from "../enemy";

export class RazorFin extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    type: string;
    constructor(game: Game) {
        super(game);
        this.width = 187;
        this.height = 149;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById("razorFin") as HTMLImageElement;
        this.frameY = 0;
        this.lives = 7;
        this.score = this.lives;
        this.type ="razorFin";
        this.speedX = Math.random() * -1 - 1;
    }
}
