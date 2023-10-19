import { Game } from "../game";
import { Explosion } from "./explosion";

export class FireExplosion extends Explosion {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = document.getElementById("fireExplosion") as HTMLImageElement;
    }
}
