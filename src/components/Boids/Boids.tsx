import React from 'react'
import { BoidOrchestrator } from 'wasm-boids'
import * as PIXI from 'pixi.js';
import boid from '../../triangle.png'
import water2 from '../../water2.png'
import gravel from '../../gravel.jpg'
import { memory} from 'wasm-boids/wasm_boids_bg'
import { IVec2 } from './BoidInterfaces';
import { Button, Col, Row, InputGroup } from 'react-bootstrap';
import {DropShadowFilter} from '@pixi/filter-drop-shadow'
import {TiltShiftFilter} from '@pixi/filter-tilt-shift'
import caustics from '../../caustics.jpg'
import { CausticFilter } from './CausticFilter';
// import shaderCode from './boid_shader.glsl';

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
    displacementMap: PIXI.Sprite;
    displacementContainer: PIXI.Container;
    dropShadowFilter: PIXI.Filter;
    hasBG: boolean

    
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
    causticSprite: PIXI.TilingSprite;

    causticUniforms: any;
    causticFilter: PIXI.Filter;
    bgSprite: PIXI.Sprite;
    
    constructor(props: any) {
        super(props);

        //Create PIXI app
        this.app = new PIXI.Application({width: this.worldWidth, height: this.worldHeight, antialias: true, 
            transparent: false, 
            resolution: 1});
        
        // Create boid world.  
        this.orch = BoidOrchestrator.new(this.worldWidth, this.worldHeight, this.numBoids, this.convergenceValue, this.avoidanceValue, this.avoidanceRange, this.percivedVelValue, this.borderVelModifier);
        
        this.rendererRef = React.createRef();
        //create boids arrays.  
        this.boids = [];   
        this.boidsArray = new Float32Array(memory.buffer, this.orch.items(), this.numBoids * 3);

        // create the water displacement Filter texture.  
        let base = new PIXI.BaseTexture(water2);
        let texture = new PIXI.Texture(base);
        texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.displacementMap = new PIXI.Sprite(texture);
        let displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementMap,25)
        displacementFilter.enabled = true
        displacementFilter.autoFit= true;

        //Caustics textures 
        let causticbase = new PIXI.BaseTexture(caustics);
        let causticTexture = new PIXI.Texture(causticbase);
        
        causticTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.causticSprite = new PIXI.TilingSprite(causticTexture, this.app.screen.width, this.app.screen.height);
        //This lets us access the texture in the shader.  
        this.causticFilter = CausticFilter
        this.causticFilter.uniforms.uCaustic = causticTexture;
        let textScale1 =3;
        let textScale2 = 6;
        this.causticFilter.uniforms.causticST = [textScale1,textScale1,0,0]
        this.causticFilter.uniforms.causticST2 = [textScale2,textScale2,0,0]
        this.causticFilter.uniforms.blueShift = 0x33C4FF;
        
        //create dropshadow filter for boids
        this.dropShadowFilter  = new DropShadowFilter({distance: 10})

        let tiltShiftFilter =new TiltShiftFilter(20, 1600)

        let colormatrixFilter =new PIXI.filters.ColorMatrixFilter()
        colormatrixFilter.saturate(0.4,false)

        //background sprite to hold the caustic filter and the background image
        // this.bgSprite= new PIXI.Sprite(PIXI.Texture.WHITE);//
        this.bgSprite= new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(gravel)));
        this.bgSprite.name = 'background'
        this.hasBG = true;
        // this.bgSprite.tint = 0x33C4FF

        this.bgSprite.width = this.worldWidth;
        this.bgSprite.height = this.worldHeight;
        this.bgSprite.filters = [this.causticFilter]

        this.displacementContainer = new PIXI.Container();
        this.displacementContainer.addChild(this.bgSprite);
        
        this.app.stage.addChild(this.displacementContainer);
        this.displacementContainer.filters = [displacementFilter, tiltShiftFilter, colormatrixFilter]
        this.app.stage.addChild(this.displacementMap)
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
        
        // var simpleShader = new PIXI.Filter('',shaderCode,uniforms);
        this.app.stage.filterArea = this.app.renderer.screen
        
        
        for(let i = 0; i< this.numBoids; i++){
            let base = new PIXI.BaseTexture(boid);
            let texture = new PIXI.Texture(base);
            let boidSprite= new PIXI.Sprite(texture);
            // boidSprite.tint =0xff0ff0
            let boidContainer = new PIXI.Container();
            
    
            boidSprite.anchor.set(0.5,0.5)
            boidContainer.name = "boid-container-" + i;
            boidContainer.position.set(this.boidsArray[i*3], this.boidsArray[i*3+1]) 
            boidContainer.scale.set(this.boidScale, this.boidScale)
            boidSprite.rotation = this.boidsArray[i*3+2];
            boidSprite.name = 'sprite-'+i;
            boidSprite.filters= [this.dropShadowFilter]
            boidContainer.addChild(boidSprite);
            if(this.isDebug){
            boidContainer.addChild(
                this.getVelDebugContainer(i,false)
            )
            }


            this.boids.push(boidContainer)
            this.displacementContainer.addChild(boidContainer);
        }
        
        this.app.ticker.add(()=> this.updateWater())
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
    updateWater = () => {
        let speed = .1
        this.displacementMap.position.x += speed//(Math.cos(uniforms.time.value/3) + speed + Math.sin(uniforms.time.value/10)) /2//speed;
        this.displacementMap.position.y += speed//
        this.causticFilter.uniforms.causticST[2]+=speed/500
        this.causticFilter.uniforms.causticST[3]-=speed/500
        this.causticFilter.uniforms.causticST2[3] +=speed /1000//(Math.sin(uniforms.time.value/10) + Math.cos(uniforms.time.value/10))/2000
        this.causticFilter.uniforms.causticST2[2] -=speed /1000//(Math.cos(uniforms.time.value/3)  + Math.sin(uniforms.time.value/10)) /3000
    }

    update(dt: any) {
        
        this.orch.tick(dt/4);
        
       
        for (let i =0; i< this.numBoids; i++) {
            this.updateBoidContainer(i)
        }
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
    toggleBG = () => {
        if(this.hasBG) {
            
            this.bgSprite.texture =PIXI.Texture.WHITE;
            this.hasBG = false;
            this.bgSprite.tint = 0x33C4FF
            this.bgSprite.texture.requiresUpdate = true;
        }else {
            this.bgSprite.texture = new PIXI.Texture(new PIXI.BaseTexture(gravel));
            this.bgSprite.texture.requiresUpdate = true;
            this.bgSprite.tint = 0xFFFFFF
            this.hasBG = true;
        }
    }


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
                        <Button variant='dark' className='m-2' onClick={this.toggleBG}>toggleBG</Button>
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


    // DEBUG METHODS 
        

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
}