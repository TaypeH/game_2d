import { Game } from "../../game";
import { Enemy } from "../enemy";

export class Drone extends Enemy {
    image: HTMLImageElement;
    frameY: number;
    type: string;
    constructor(game: Game, x: number, y: number) {
        super(game);
        this.width = 115;
        this.height = 95;
        this.x = x;
        this.y = y;
        this.image = document.getElementById("drone") as HTMLImageElement;
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 3;
        this.score = this.lives;
        this.type ="drone";
        this.speedX = Math.random() * -4.2 - 0.5;
    }
}
