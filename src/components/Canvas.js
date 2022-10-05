import { forwardRef, useEffect, useRef } from 'react';

const Canvas = forwardRef(({
  draw, width = 600, height = 450, hidden = false
}, ref) => {
  const canvasRef = ref || useRef(null);
  useEffect(() => {
    if (canvasRef.current && canvasRef.current.getContext) {
      if (draw) draw(canvasRef.current.getContext('2d'));
    }
  }, [draw]);
  // console.log(draw);
  return (
    <canvas hidden={hidden} width={width} height={height} ref={canvasRef} />
  );
});

export default Canvas;
