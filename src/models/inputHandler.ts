import { Game } from "./game";

export class InputHandler {
    game: Game;
    constructor(game: Game) {
        this.game = game;

        window.addEventListener("keydown", e => {
            switch (true) {
                case (e.key === "ArrowUp" || e.key === "ArrowDown") && this.game.keys.indexOf(e.key) === -1:
                    this.game.keys.push(e.key)
                    break;
                case e.key === " ":
                    this.game.player.shootTop();
                    break;
                case e.key === "d":
                    this.game.debug = !this.game.debug;
                    break;
                default:
                    break;
            }
        });

        window.addEventListener("keyup", e => {
            const index = this.game.keys.indexOf(e.key);

            if (index > -1) {
                this.game.keys.splice(index, 1);
            }
        });
    }
}
