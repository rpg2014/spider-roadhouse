import React from 'react'
import { BoidOrchestrator } from 'wasm-boids'
import * as PIXI from 'pixi.js';
import boid from '../../triangle.png'
import { memory} from 'wasm-boids/wasm_boids_bg'
import { IVec2 } from './BoidInterfaces';
import { Button, Col, Row, InputGroup } from 'react-bootstrap';

interface IBoid {
    boidContainer: PIXI.Container;
}

//TO do local development set the wasm-boids package in package.json to "file:../wasm-boids/pkg",

export default class Boids extends React.Component<{}, {}> {
    app: PIXI.Application;
    orch: BoidOrchestrator;
    fps: number = 60;
    boidScale: number = 0.1;
    rendererRef: React.RefObject<any>;
    
    numBoids = 20;
    fontSize = 120;
    isDebug = false;
    ticker: PIXI.Ticker | undefined;

    //world setings
    worldWidth = window.innerWidth - 100 //1420;
    worldHeight = window.innerHeight - 136//820;
    convergenceValue = 3;
    avoidanceValue = 0.15;
    avoidanceRange =35;
    percivedVelValue = 0.1;
    borderVelModifier = 0.25; //0.25 is good

    boids: PIXI.Container[];
    boidsArray: Float32Array;
    
    constructor(props: any) {
        super(props);
        this.app = new PIXI.Application({width: this.worldWidth, height: this.worldHeight, antialias: true, 
            transparent: false, 
            resolution: 1});
        
        this.orch = BoidOrchestrator.new(this.worldWidth, this.worldHeight, this.numBoids, this.convergenceValue, this.avoidanceValue, this.avoidanceRange, this.percivedVelValue, this.borderVelModifier);
        
        this.rendererRef = React.createRef();
        this.boids = [];   
        this.boidsArray = new Float32Array(memory.buffer, this.orch.items(), this.numBoids * 3);
        this.state = {
            isDebug: this.isDebug
        }
    }

    createWorld = () => {
        this.orch = BoidOrchestrator.new(this.worldWidth, this.worldHeight, this.numBoids, this.convergenceValue, this.avoidanceValue, this.avoidanceRange, this.percivedVelValue, this.borderVelModifier);
        this.boidsArray = new Float32Array(memory.buffer, this.orch.items(), this.numBoids * 3);
    }

    componentDidMount() {
        this.rendererRef.current.appendChild(this.app.view);
        this.app.renderer.backgroundColor = 0x33C4FF;
        for(let i = 0; i< this.numBoids; i++){
            let base = new PIXI.BaseTexture(boid);
            let texture = new PIXI.Texture(base);
            let boidSprite= new PIXI.Sprite(texture);
            let boidContainer = new PIXI.Container();
            
            
            boidSprite.anchor.set(0.5,0.5)
            boidContainer.name = "boid-container-" + i;
            boidContainer.position.set(this.boidsArray[i*3], this.boidsArray[i*3+1]) 
            boidContainer.scale.set(this.boidScale, this.boidScale)
            boidSprite.rotation = this.boidsArray[i*3+2];
            boidSprite.name = 'sprite-'+i;

            boidContainer.addChild(boidSprite);
            if(this.isDebug){
            boidContainer.addChild(
                this.getVelDebugContainer(i,false)
            )
            }


            this.boids.push(boidContainer)
            this.app.stage.addChild(boidContainer);
        }
        
    
    }
    

    getPCVel = (boidId: number): IVec2 => {
        return {
            x: this.orch.get_velocity_to_percived_center_x(boidId),
            y: this.orch.get_velocity_to_percived_center_y(boidId),
        }
    }

    getAvoidanceVel = (boidId: number): IVec2 => {
        return {
            x: this.orch.get_avoidance_velocity_x(boidId),
            y: this.orch.get_avoidance_velocity_y(boidId),
        }
    }

    getPVVel = (boidId: number) :IVec2 => {
        return {
            x: this.orch.get_match_percived_velocity_x(boidId),
            y: this.orch.get_match_percived_velocity_x(boidId),
        }
    }
    getVecText(velocityType: string, velocity: IVec2): PIXI.Text {
        let style = new PIXI.TextStyle();
        style.fontSize = this.fontSize
        let text = new PIXI.Text(velocityType+ " | x: " +velocity.x.toFixed(2) +" y: " + velocity.y.toFixed(2), style);
        return text;
    }

    getVelLine = (boidId: number): PIXI.Graphics => {
        
        let line = new PIXI.Graphics();
        line.lineStyle(10, 0x000000, 1);
        line.moveTo(0, 0)
        let vel = this.getBoidVelocity(boidId);
        let vecBoost =20;
        line.lineTo(vel.x * vecBoost, vel.y * vecBoost)
        return line;
    }
    getVelDebugContainer = (boidId: number, shouldHaveText?: boolean) => {
        let debugContainer = new PIXI.Container();
        if (shouldHaveText) {
            let textSpacing = this.fontSize;
            
            let pcText = this.getVecText("PC",this.getPCVel(boidId));
            pcText.name = "pc"
            pcText.position.set(96,0);
            let avoidText = this.getVecText("AV",this.getAvoidanceVel(boidId));
            avoidText.name = "avoid"
            avoidText.position.set(96, textSpacing *1 );
            let pvText = this.getVecText("PV",this.getPVVel(boidId));
            pvText.name = 'pv'
            pvText.position.set(96, textSpacing *2);
    
            let total = this.getVecText("total", this.getBoidVelocity(boidId))
            total.name='total'
            total.position.set(96, textSpacing *3);
    
            debugContainer.addChild(pcText)
            debugContainer.addChild(avoidText)
            debugContainer.addChild(pvText)
            debugContainer.addChild(total)
        }
        
        //add line
        debugContainer.addChild(this.getVelLine(boidId))
        debugContainer.name = 'debug-'+ boidId;
        return debugContainer;
    }

    getBoidPosition = (boid_id: number):IVec2 => {
        return {
            x: this.boidsArray[boid_id*3], 
            y: this.boidsArray[boid_id*3+1]
        }
    }

    getBoidVelocity = (boid_id: number): IVec2 => {
        return {
            x: this.orch.get_velocity_x(boid_id),
            y: this.orch.get_velocity_y(boid_id),
        }
    }

    componentWillUnmount() {
        this.app.ticker.destroy();
        this.app.stop();
        
        this.rendererRef.current.removeChild(this.app.view)
        
    }


    updateBoidContainer = (boidId:number) => {
        let container = this.boids[boidId]
        let pos = this.getBoidPosition(boidId);
        container.position.set(pos.x, pos.y);

        let sprite = container.getChildByName("sprite-"+boidId)
        sprite.rotation = this.boidsArray[boidId*3+2] + (Math.PI/2);

        if( container.getChildByName('debug-'+boidId)) {
            let debugContainer = container.getChildByName('debug-'+boidId)
            debugContainer.destroy();
        }

        if(this.isDebug ){
            
            container.addChild(this.getVelDebugContainer(boidId));
        }
        
        
    }
    update(dt: any) {
        
        this.orch.tick(dt/4);

       
        for (let i =0; i< this.numBoids; i++) {
            // this.boids[i].position.set(this.boidsArray[i*3], this.boidsArray[i*3+1]) 
            
            // this.boids[i].rotation = this.boidsArray[i*3+2];
            
            this.updateBoidContainer(i)
            
            // console.log(this.boids[i].x)
        }

        // this.orch.add_boid();
        
    }

    play = () => {
        if(!this.ticker){
            this.ticker =this.app.ticker.add(delta => this.update(delta))
        }else {
            this.ticker.start();
        }
            
        
        //
    };

    tick = () => this.update(1)
    pause = () => this.ticker?.stop()
    reset = () => this.createWorld()


    render() {
        return(
            <main className='inner col mx-auto'>
                <Col>
                    <Row>
                        <div ref={this.rendererRef} className='justify-content-center'></div>
                    </Row>
                    <Row className='justify-content-center'>
                        <Button variant='outline-dark'className='m-2' onClick={this.tick}>tick</Button>
                        <Button  variant='dark' className='m-2' onClick={this.play} >play</Button>
                        <Button  variant='dark' className='m-2' onClick={this.pause}>pause</Button>
                        <Button  variant={this.isDebug?'dark':'outline-dark'} className='m-2' onClick={() => {
                            this.isDebug = this.isDebug? false: true;
                            this.setState({
                                isDebug:this.isDebug? false: true
                            })

                        }} >debug</Button>
                        <Button variant='outline-warning' className='m-2' onClick={this.reset}>reset</Button>
                        {/* <span>
                            Number of Boids:
                        <input value={this.numBoids} onChange={ (e)=> {
                            this.numBoids= e.target.value as unknown as number;
                            
                        } } />
                        </span> */}
                        
                    </Row>
                </Col>
            </main>
        )
    }
}