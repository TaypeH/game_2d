import { Angler1 } from './enemies/angler1';
import { InputHandler } from './inputHandler';
import { Player } from "./player";
import { UI } from './ui';
import { Background } from './view/background';

export class Game {
    width: number;
    height: number;
    player: Player;
    input: InputHandler;
    keys: string[];
    ammo: number;
    maxAmmo: number;
    ammoTimer: number;
    ammoInterval: number;
    ui: UI;
    enemies: Angler1[];
    enemyInterval: number;
    enemyTimer: number;
    gameOver: boolean;
    score: number;
    winningScore: number;
    gameTime: number;
    timeLimit: number;
    speed: number;
    background: Background;
    debug: boolean;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 10;
        this.gameTime = 0;
        this.timeLimit = 50000;
        this.speed = 1;
        this.debug = false;
    }
    update(deltaTime: number) {
        // hero
        this.player.update();

        // background
        this.background.update();
        this.background.layer4.update();

        // game time
        if (!this.gameOver) {
            this.gameTime += deltaTime;
        }
        if (this.gameTime > this.timeLimit) {
            this.gameOver = true;
        }

        //handle ammo
        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) {
                this.ammo++;
            }
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        // enemies
        this.enemies.forEach((enemy) => {
            enemy.update();
            if (this.checkCollision(this.player, enemy)) {
                enemy.markedForDeletion = true;
            }
            this.player.projectiles.forEach((projectile) => {
                if (this.checkCollision(projectile, enemy)) {
                    enemy.lives--;
                    projectile.markedForDeletion = true;
                    if (enemy.lives <= 0) {
                        enemy.markedForDeletion = true;
                        if (!this.gameOver) {
                            this.score += enemy.score;
                        }
                        if (this.score >= this.winningScore) {
                            this.gameOver = true
                        }
                    }
                }
            });
        });
        this.enemies = this.enemies.filter((enemy) => {
            return !enemy.markedForDeletion;
        });
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }
    draw(context: CanvasRenderingContext2D) {
        this.background.draw(context);
        this.player.draw(context);
        this.ui.draw(context);
        this.enemies.forEach((enemy) => {
            enemy.draw(context);
        });
        this.background.layer4.draw(context);
    }
    addEnemy() {
        this.enemies.push(new Angler1(this));
        console.log(this.enemies);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    checkCollision = (rect1: any, rect2: Angler1) => (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y);
}
