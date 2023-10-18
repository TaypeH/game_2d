import { Game } from './game';
import { Projectile } from './projectile';

export class Player {
    game: Game;
    width: number;
    height: number;
    x: number;
    y: number;
    speedY: number;
    maxSpeed: number;
    projectiles: Projectile[];
    image: HTMLImageElement;
    frameX: number;
    frameY: number;
    maxFrame: number;
    constructor(game: Game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 100;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.speedY = 0;
        this.maxSpeed = 2;
        this.projectiles = [];
        this.image = document.getElementById('player') as HTMLImageElement;
    }

    updateSpeed = (keys: string[]) => {
        switch (true) {
            case keys.includes("ArrowUp"):
                this.speedY = -this.maxSpeed;
                break;
            case keys.includes("ArrowDown"):
                this.speedY = this.maxSpeed;
                break;
            default:
                this.speedY = 0;
                break;
        }
    }

    update() {
        const { keys } = this.game;

        this.updateSpeed(keys);

        this.y += this.speedY;

        //handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update();
        });
        //remove projectiles that are marked for deletion
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);

        //sprite animation
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        // draw projectiles
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
    }

    shootTop() {
        if (this.game.ammo > 0) {
            const projectile = new Projectile(this.game, this.x + 80, this.y + 30);
            this.projectiles.push(projectile);
            this.game.ammo--;
        }
    }
}


