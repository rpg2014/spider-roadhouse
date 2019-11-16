import React, { useEffect } from 'react'
import { Universe, Cell } from 'roadhouse-wasm'
import { memory } from 'roadhouse-wasm/wasm_game_of_life_bg'
import { NavBar } from '../NavBar/NavBar';

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";
const universe = Universe.new();
const width = universe.width();
const height = universe.height();


const CANVAS_HIGHT = (CELL_SIZE + 1) * height + 1;
const CANVAS_WIDTH = (CELL_SIZE + 1) * width + 1;

interface IGameOfLifeState {
    ctx?: any;
}
interface IGameOfLifeProps {
    canvasRef?: any,
}
export default class GameOfLife extends React.Component<IGameOfLifeProps, IGameOfLifeState > {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    
    constructor(props: any) {
        super(props)
        this.canvasRef = React.createRef();
    }
    

    componentDidMount() {
        
        if(this.canvasRef.current){
        this.state = {
            ctx: this.canvasRef.current.getContext('2d')
        };
        this.drawGrid();
        this.drawCells();
        requestAnimationFrame(this.renderLoop);
        }
    }
    

    render() {
        return (
            
        <>
        <NavBar/>
            <canvas id='game-of-life-canvas'
                width={CANVAS_WIDTH}
                height={CANVAS_HIGHT} 
                ref={this.canvasRef}/>
        </>
    
        )
    }
    renderLoop = () => {
        universe.tick();

        this.drawGrid();
        this.drawCells();

        requestAnimationFrame(this.renderLoop);
    };

    drawGrid = () => {
        this.state.ctx.beginPath();
        this.state.ctx.strokeStyle = GRID_COLOR;

        // Vertical lines.
        for (let i = 0; i <= width; i++) {
            this.state.ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
            this.state.ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
        }

        // Horizontal lines.
        for (let j = 0; j <= height; j++) {
            this.state.ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
            this.state.ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
        }

        this.state.ctx.stroke();
    };

    getIndex = (row: number, column: number) => {
        return row * width + column;
    };

    drawCells = () => {
        const cellsPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

        this.state.ctx.beginPath();

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const idx = this.getIndex(row, col);

                this.state.ctx.fillStyle = cells[idx] === Cell.Dead ?
                    DEAD_COLOR :
                    ALIVE_COLOR;

                this.state.ctx.fillRect(
                    col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }

        this.state.ctx.stroke();
    };
}






// Construct the universe, and get its width and height.