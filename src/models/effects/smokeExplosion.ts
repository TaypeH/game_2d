import { Game } from "../game";
import { Explosion } from "./explosion";

export class SmokeExplosion extends Explosion {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = document.getElementById("smokeExplosion") as HTMLImageElement;
    }
}
