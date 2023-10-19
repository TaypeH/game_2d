import { Game } from "./game";

export class UI {
    game: Game;
    fontSize: number;
    fontFamily: string;
    color: string;
    constructor(game: Game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = "Bangers";
        this.color = "yellow";
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = "black";
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        // score
        context.fillText(`Score: ${this.game.score}`, 20, 40);
        // game time
        const formattedTime = (this.game.gameTime / 1000).toFixed(1);
        context.fillText(`Timer: ${formattedTime}`, 20, 100);
        // game over message
        if (this.game.gameOver) {
            context.textAlign = "center";
            let message1;
            let message2;
            if (this.game.score >= this.game.winningScore) {
                message1 = "Most Wondrous!";
                message2 = "Well done explorer!";
            } else {
                message1 = "Blazes";
                message2 = "Get my repair kit and try again!";
            }

            context.font = `70px ${this.fontFamily}`;
            context.fillText(message1, this.game.width / 2, this.game.height / 2 - 20);
            context.font = `25px ${this.fontFamily}`;
            context.fillText(message2, this.game.width / 2, this.game.height / 2 + 20);
        }
        // ammo
        if (this.game.player.powerUp) context.fillStyle = "#ffffbd";
        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(20 + 5 * i, 50, 3, 20);
        }

        context.restore();
    }
}
