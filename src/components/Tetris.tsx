import { useEffect, useRef, useState, useCallback } from "preact/hooks";
import { Section, Pill } from "@odla-ai/ui";
import { Play, RotateCcw, ArrowLeft, ArrowRight, ArrowDown, RotateCw } from "lucide-preact";

const COLS = 10;
const ROWS = 20;

type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

interface Tetromino {
  shape: number[][];
  color: string;
}

const TETROMINOES: Record<TetrominoType, Tetromino> = {
  I: { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: '#00f0f0' },
  J: { shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: '#0000f0' },
  L: { shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: '#f0a000' },
  O: { shape: [[1, 1], [1, 1]], color: '#f0f000' },
  S: { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: '#00f000' },
  T: { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: '#a000f0' },
  Z: { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: '#f00000' },
};

const getRandomTetromino = () => {
  const keys = Object.keys(TETROMINOES) as TetrominoType[];
  const type = keys[Math.floor(Math.random() * keys.length)];
  return { type, shape: TETROMINOES[type].shape, color: TETROMINOES[type].color };
};

export function Tetris() {
  const [grid, setGrid] = useState<Array<Array<string | null>>>(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [activePiece, setActivePiece] = useState<{ pos: { x: number, y: number }, type: TetrominoType, shape: number[][], color: string }>(() => {
    const p = getRandomTetromino();
    return { pos: { x: 3, y: 0 }, type: p.type, shape: p.shape, color: p.color };
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const dropCounterRef = useRef<number>(0);
  const dropInterval = 800;

  const collide = useCallback((pos: { x: number, y: number }, shape: number[][], currentGrid: Array<Array<string | null>>) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentGrid[newY][newX] !== null)) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const rotate = useCallback((shape: number[][]) => {
    return shape[0].map((_, index) => shape.map(col => col[index]).reverse());
  }, []);

  const merge = useCallback((pos: { x: number, y: number }, shape: number[][], color: string, currentGrid: Array<Array<string | null>>) => {
    const newGrid = currentGrid.map(row => [...row]);
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const newY = pos.y + y;
          if (newY >= 0) {
            newGrid[newY][pos.x + x] = color;
          }
        }
      });
    });
    return newGrid;
  }, []);

  const clearLines = useCallback((currentGrid: Array<Array<string | null>>) => {
    let linesCleared = 0;
    const newGrid = currentGrid.filter(row => {
      const isFull = row.every(cell => cell !== null);
      if (isFull) linesCleared++;
      return !isFull;
    });

    while (newGrid.length < ROWS) {
      newGrid.unshift(Array(COLS).fill(null));
    }

    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100);
    }
    return newGrid;
  }, []);

  const handleGameOver = useCallback(() => {
    setGameOver(true);
    setIsPaused(true);
  }, []);

  const drop = useCallback(() => {
    setActivePiece(prev => {
      const newPos = { ...prev.pos, y: prev.pos.y + 1 };
      if (!collide(newPos, prev.shape, grid)) {
        return { ...prev, pos: newPos };
      } else {
        const newGrid = merge(prev.pos, prev.shape, prev.color, grid);
        const clearedGrid = clearLines(newGrid);
        setGrid(clearedGrid);

        const nextP = getRandomTetromino();
        const nextPos = { x: 3, y: 0 };
        if (collide(nextPos, nextP.shape, clearedGrid)) {
          handleGameOver();
          return prev;
        }
        return { pos: nextPos, type: nextP.type, shape: nextP.shape, color: nextP.color };
      }
    });
  }, [grid, collide, merge, clearLines, handleGameOver]);

  const move = useCallback((dir: number) => {
    setActivePiece(prev => {
      const newPos = { ...prev.pos, x: prev.pos.x + dir };
      if (!collide(newPos, prev.shape, grid)) {
        return { ...prev, pos: newPos };
      }
      return prev;
    });
  }, [grid, collide]);

  const playerRotate = useCallback(() => {
    setActivePiece(prev => {
      const newShape = rotate(prev.shape);
      const newPos = { ...prev.pos };
      // Simple rotation adjustment to prevent getting stuck in walls
      if (collide(newPos, newShape, grid)) {
        newPos.x += 1;
        if (collide(newPos, newShape, grid)) {
          newPos.x -= 2;
          if (collide(newPos, newShape, grid)) {
            return prev;
          }
        }
      }
      return { ...prev, shape: newShape, pos: newPos };
    });
  }, [grid, collide, rotate]);

  const reset = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    const p = getRandomTetromino();
    setActivePiece({ pos: { x: 3, y: 0 }, type: p.type, shape: p.shape, color: p.color });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused || gameOver) return;
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowDown") drop();
      if (e.key === "ArrowUp") playerRotate();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaused, gameOver, move, drop, playerRotate]);

  const animate = useCallback((time: number) => {
    if (isPaused || gameOver) return;

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    dropCounterRef.current += deltaTime;

    if (dropCounterRef.current > dropInterval) {
      drop();
      dropCounterRef.current = 0;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [isPaused, gameOver, drop]);

  useEffect(() => {
    if (!isPaused && !gameOver) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused, gameOver, animate]);

  // Combine grid and active piece for rendering
  const displayGrid = grid.map(row => [...row]);
  activePiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const gridY = activePiece.pos.y + y;
        const gridX = activePiece.pos.x + x;
        if (gridY >= 0 && gridY < ROWS && gridX >= 0 && gridX < COLS) {
          displayGrid[gridY][gridX] = activePiece.color;
        }
      }
    });
  });

  return (
    <Section heading="Tetris">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '240px' }}>
          <span style={{ fontWeight: 'bold' }}>Score: {score}</span>
          {gameOver && <span style={{ color: 'var(--odla-danger)' }}>GAME OVER</span>}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${COLS}, 1fr)`, 
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: '200px',
          height: '400px',
          backgroundColor: 'var(--odla-bg-subtle)',
          border: '2px solid var(--odla-border)',
          gap: '1px'
        }}>
          {displayGrid.map((row, y) => row.map((cell, x) => (
            <div key={`${x}-${y}`} style={{ 
              backgroundColor: cell || 'transparent',
              width: '100%',
              height: '100%'
            }} />
          )))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!isPaused ? (
            <button onClick={() => setIsPaused(true)} style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--odla-bg)', color: 'var(--odla-text)', cursor: 'pointer' }}>
              <Play size={20} />
            </button>
          ) : (
            <button onClick={() => setIsPaused(false)} style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--odla-accent-primary)', color: 'white', cursor: 'pointer' }}>
              <Play size={20} />
            </button>
          )}
          <button onClick={reset} style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--odla-bg)', color: 'var(--odla-text)', cursor: 'pointer' }}>
            <RotateCcw size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          <button onClick={() => move(-1)} style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--odla-bg)', color: 'var(--odla-text)' }}><ArrowLeft size={20} /></button>
          <button onClick={() => playerRotate()} style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--odla-bg)', color: 'var(--odla-text)' }}><RotateCw size={20} /></button>
          <button onClick={() => move(1)} style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--odla-bg)', color: 'var(--odla-text)' }}><ArrowRight size={20} /></button>
          <div />
          <button onClick={() => drop()} style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--odla-bg)', color: 'var(--odla-text)' }}><ArrowDown size={20} /></button>
          <div />
        </div>
      </div>
    </Section>
  );
}
