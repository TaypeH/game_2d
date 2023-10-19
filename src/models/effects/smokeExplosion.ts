import { Game } from "../game";
import { Explosion } from "./explosion";

export class SmokeExplosion extends Explosion {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = document.getElementById("smokeExplosion") as HTMLImageElement;
        this.spriteWidth = 200;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
}
