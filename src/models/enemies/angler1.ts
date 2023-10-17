import { Game } from "../game";
import { Enemy } from "./enemy";

export class Angler1 extends Enemy {
    constructor(game: Game) {
        super(game);
        this.width = 228 * .2;
        this.height = 169 * .2;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
    }
}
