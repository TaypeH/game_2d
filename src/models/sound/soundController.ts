export class SoundController {
    powerUpSound!: HTMLAudioElement;
    powerDownSound!: HTMLAudioElement;
    explosionSound!: HTMLAudioElement;
    shotSound!: HTMLAudioElement;
    hitSound!: HTMLAudioElement;
    shieldSound!: HTMLAudioElement;
    constructor() {
        this.powerUpSound = document.getElementById("powerUp") as HTMLAudioElement;
        this.powerDownSound = document.getElementById("powerDown") as HTMLAudioElement;
        this.explosionSound = document.getElementById("explosion") as HTMLAudioElement;
        this.shotSound = document.getElementById("shot") as HTMLAudioElement;
        this.hitSound = document.getElementById("hit") as HTMLAudioElement;
        this.shieldSound = document.getElementById("shield") as HTMLAudioElement;
    }
    powerUp() {
        this.powerUpSound.currentTime = 0;
        this.powerUpSound.play();
    }
    powerDown() {
        this.powerDownSound.currentTime = 0;
        this.powerDownSound.play();
    }
    explosion() {
        this.explosionSound.currentTime = 0;
        this.explosionSound.play();
    }
    shot() {
        this.shotSound.currentTime = 0;
        this.shotSound.play();
    }
    hit() {
        this.hitSound.currentTime = 0;
        this.hitSound.play();
    }
    shield() {
        this.shieldSound.currentTime = 0;
        this.shieldSound.play();
    }
}
