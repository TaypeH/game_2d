import { Game } from "../../game";
import { Enemy } from "../enemy";

export class HiveWhale extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    type: string;
    constructor(game: Game) {
        super(game);
        this.width = 400;
        this.height = 227;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById("hiveWhale") as HTMLImageElement;
        this.frameY = 0;
        this.lives = 20;
        this.score = this.lives;
        this.type ="hive";
        this.speedX = Math.random() * -1.2 - 0.2;
    }
}
