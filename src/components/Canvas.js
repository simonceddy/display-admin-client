import { useEffect, useRef } from 'react';

/**
 * Canvas component
 * @param {object} props
 * @returns
 */
function Canvas({
  draw, width = 600, height = 450
}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current && canvasRef.current.getContext && draw) {
      draw(canvasRef.current.getContext('2d'));
    }
  }, [canvasRef]);
  // console.log(draw);
  return (
    <canvas width={width} height={height} ref={canvasRef} />
  );
}

export default Canvas;
