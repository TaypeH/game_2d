import { InputHandler } from './inputHandler';
import { Player } from "./player";

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

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.keys = [];
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
    }
    update(deltaTime: number) {
        this.player.update();

        //handle ammo
        // if(this.ammo < this.maxAmmo){
        //     this.ammoTimer += deltaTime;
        //     if(this.ammoTimer > this.ammoInterval){
        //         this.ammoTimer = 0;
        //         this.ammo++;
        //     }
        // }
        if(this.ammoTimer > this.ammoInterval){
            if (this.ammo < this.maxAmmo) {
                this.ammo++;
            }
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }
        console.log("🚀 ~ file: game.ts:40 ~ Game ~ update ~ this.ammo+:", this.ammo)
    }
    draw(context: CanvasRenderingContext2D) {
        this.player.draw(context);
    }
}
