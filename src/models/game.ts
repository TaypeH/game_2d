import { Explosion } from './effects/explosion';
import { SmokeExplosion } from './effects/smokeExplosion';
import { Angler1 } from './enemies/angler1';
import { Angler2 } from './enemies/angler2';
import { Drone } from './enemies/drone';
import { Enemy } from './enemies/enemy';
import { HiveWhale } from './enemies/hiveWhale';
import { LuckyFish } from './enemies/luckyFish';
import { InputHandler } from './inputHandler';
import { Particle } from './particle';
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
    enemies: Enemy[];
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
    particles: Particle[];
    explosions: Explosion[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.enemies = [];
        this.particles = [];
        this.explosions = [];
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
        this.player.update(deltaTime);

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

        // particles
        this.particles.forEach((particle) => {
            particle.update();
        });
        this.particles = this.particles.filter((particle) => {
            return !particle.markedForDeletion;
        });

        // explosions
        this.explosions.forEach((explosion) => {
            explosion.update(deltaTime);
        });
        this.explosions = this.explosions.filter((explosion) => {
            return !explosion.markedForDeletion;
        });

        // enemies
        this.enemies.forEach((enemy) => {
            enemy.update();
            if (this.checkCollision(this.player, enemy)) {
                enemy.markedForDeletion = true;
                this.addExplosion(enemy);
                for (let i = 0; i < enemy.score; i++) {
                    this.particles.push(new Particle(this, enemy.x + enemy.width * .5, enemy.y + enemy.height * .5));
                }
                if (enemy.type === "lucky") this.player.enterPowerUp();
                else this.score--;
            }
            this.player.projectiles.forEach((projectile) => {
                if (this.checkCollision(projectile, enemy)) {
                    enemy.lives--;
                    projectile.markedForDeletion = true;
                    this.particles.push(new Particle(this, enemy.x + enemy.width * .5, enemy.y + enemy.height * .5));
                    if (enemy.lives <= 0) {
                        for (let i = 0; i < enemy.score; i++) {
                            this.particles.push(new Particle(this, enemy.x + enemy.width * .5, enemy.y + enemy.height * .5));
                        }
                        enemy.markedForDeletion = true;
                        this.addExplosion(enemy);
                        if (enemy.type === "hive") {
                            for (let i = 0; i < 5; i++) {
                                this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * .5));
                            }
                        }
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
        this.ui.draw(context);
        this.player.draw(context);
        this.particles.forEach((particle) => particle.draw(context));
        this.enemies.forEach((enemy) => {
            enemy.draw(context);
        });
        this.explosions.forEach((explosion) => {
            explosion.draw(context);
        });
        this.background.layer4.draw(context);
    }
    addEnemy() {
        const randomize = Math.random();
        if (randomize < 0.3) {
            this.enemies.push(new Angler1(this));
        } else if (randomize < 0.6) {
            this.enemies.push(new Angler2(this));
        } else if (randomize < 0.8) {
            this.enemies.push(new HiveWhale(this));
        } else {
            this.enemies.push(new LuckyFish(this));
        }
    }
    addExplosion(enemy: Enemy) {
        const randomize = Math.random();
        if (randomize < 1) {
            this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-anyd
    checkCollision = (rect1: any, rect2: Angler1) => (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y);
}
