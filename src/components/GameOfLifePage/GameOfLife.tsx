import React from 'react'
import { Universe, Cell } from 'wasm-game-of-life'
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg'
import './GameOfLife.css'

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const WIDTH = 64;
const HEIGHT = 64;




interface IGameOfLifeState {
    ctx ? : any;
}
interface IGameOfLifeProps {
    canvasRef ? : any,
}
export default class GameOfLife extends React.Component < IGameOfLifeProps, IGameOfLifeState > {
    canvasRef: React.RefObject < HTMLCanvasElement > ;
    universe: Universe;
    width: any;
    height: any;
    CANVAS_HIGHT: number;
    CANVAS_WIDTH: number;
    animationFrameId: any;


    constructor(props: any) {
        super(props)
        this.canvasRef = React.createRef();
        this.universe = Universe.new(WIDTH, HEIGHT);
        this.width = this.universe.width();
        this.height = this.universe.height()
        this.CANVAS_HIGHT = (CELL_SIZE + 1) * this.height + 1;
        this.CANVAS_WIDTH = (CELL_SIZE + 1) * this.width + 1;
    }


    componentDidMount() {

        if (this.canvasRef.current) {
            this.state = {
                ctx: this.canvasRef.current.getContext('2d')
            };
            this.drawGrid();
            this.drawCells();
            this.animationFrameId = requestAnimationFrame(this.renderLoop);
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animationFrameId);
    }


    render() {
        return (
            
                <main role="main" className="inner cover mt-3 mb-auto container ">
                    <div className='row p-1 rounded transparency'>
                        <p className='lead text-center text-dark m-0 non-transparent'>
                            This is a web assembly implementation of Conway's Game of Life.
                            Created using the <a href='https://rustwasm.github.io/book/game-of-life/introduction.html'
                                className='text-muted non-transparent'>wasm-game-of-life</a> rust tutorial.
                        </p>
                        
                    </div>
                    <div className='row'>
                        <canvas id='game-of-life-canvas' className="col-sm m-4 justify-content-center"
                            width={this.CANVAS_WIDTH} height={this.CANVAS_HIGHT} ref={this.canvasRef} />
                    </div>
                    <div className='row'>
                        <button onClick={this.handleClick}
                            className='m-3 col justify-content-center button btn-dark btn-lg shadow'>Reset</button>
                    </div>
                </main>
            
        )
    }


    handleClick = () => {
        this.universe = Universe.new(WIDTH, HEIGHT);
    }
    renderLoop = () => {
        this.universe.tick();

        this.drawGrid();
        this.drawCells();

        this.animationFrameId = requestAnimationFrame(this.renderLoop);
    };

    drawGrid = () => {
        this.state.ctx.beginPath();
        this.state.ctx.strokeStyle = GRID_COLOR;

        // Vertical lines.
        for (let i = 0; i <= this.width; i++) {
            this.state.ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
            this.state.ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * this.height + 1);
        }

        // Horizontal lines.
        for (let j = 0; j <= this.height; j++) {
            this.state.ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
            this.state.ctx.lineTo((CELL_SIZE + 1) * this.width + 1, j * (CELL_SIZE + 1) + 1);
        }

        this.state.ctx.stroke();
    };

    getIndex = (row: number, column: number) => {
        return row * this.width + column;
    };

    drawCells = () => {
        const cellsPtr = this.universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, this.width * this.height);

        this.state.ctx.beginPath();

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
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