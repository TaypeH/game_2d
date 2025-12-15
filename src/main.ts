import { Game } from './models/game';
import './style.css'

window.addEventListener('load', () => {
  //canvas setup
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = 1500;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  //animation loop
  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.draw(ctx);
    game.update(deltaTime);

    requestAnimationFrame(animate);
  }

  animate(0);
})
