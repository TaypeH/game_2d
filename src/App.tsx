import { useEffect } from 'react'
import './App.css'
import { Game } from './models/game';

// @no-double-invocation
function App() {
  useEffect(() => {
    //canvas setup
    const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = 1500;
    canvas.height = 500;

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    //animation loop
    function animate(timeStamp: number){
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update(deltaTime);
      game.draw(ctx);
      requestAnimationFrame(animate);
    }

    animate(0);

  }, [])

  console.log('App.tsx')
  return (
    <canvas id="canvas1"></canvas>
  )
}

export default App
