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
    powerUp: boolean;
    powerUpTimer: number;
    powerUpLimit: number;
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
        this.powerUp = false;
        this.powerUpTimer = 0;
        this.powerUpLimit = 10000;
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

    update(deltaTime: number) {
        const { keys } = this.game;

        this.updateSpeed(keys);

        this.y += this.speedY;

        // vertical boundaries
        if (this.y > this.game.height - this.height * .5) this.y = this.game.height - this.height * .5;
        else if (this.y < -this.height * .5) this.y = -this.height * .5;

        //handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update(deltaTime);
        });
        //remove projectiles that are marked for deletion
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);

        //sprite animation
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;

        // power up
        if (this.powerUp) {
            if (this.powerUpTimer > this.powerUpLimit) {
                this.powerUp = false;
                this.powerUpTimer = 0;
                this.frameY = 0;
                this.game.sound.powerDown();
            } else {
                this.powerUpTimer += deltaTime;
                this.frameY = 1;
                this.game.ammo += 0.1;
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);

        // draw projectiles
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });

        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    shootTop() {
        if (this.game.ammo > 0) {
            const projectile = new Projectile(this.game, this.x + 80, this.y + 30);
            this.projectiles.push(projectile);
            this.game.ammo--;
        }
        this.game.sound.shot();
        if (this.powerUp) this.shootBottom();
    }

    shootBottom() {
        if (this.game.ammo > 0) {
            const projectile = new Projectile(this.game, this.x + 80, this.y + 175);
            this.projectiles.push(projectile);
            this.game.ammo--;
        }
    }

    enterPowerUp() {
        this.powerUpTimer = 0;
        this.powerUp = true;
        if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
        this.game.sound.powerUp();
    }
}


