import * as PIXI from 'pixi.js';

const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D uCaustic;

uniform vec4 causticST;
uniform vec4 causticST2;
uniform vec2 u_resolution;
uniform float blueShift;
uniform float time;

vec4 caustics(vec4 causticTransform){
    float s = .001;
    //linearly transform the coords.  
    vec2 uv = vTextureCoord * causticTransform.xy + causticTransform.zw;
    // get caustic color at point.  
    vec4 color1 = texture2D(uCaustic,uv);


    float r = texture2D(uCaustic, uv + vec2(+s, +s)).r;
    float g = texture2D(uCaustic, uv + vec2(+s, -s)).g;
    float b = texture2D(uCaustic, uv + vec2(-s, -s)).b;

    return vec4(r,g,b,color1.a) ;
}

void main(void)
{   
    
    vec2 caustic_res = vec2(800.0,800.0);
    
    vec4 color1 = caustics(causticST);
    vec4 color2 = caustics(causticST2);
    vec4 bg_color = texture2D(uSampler, vTextureCoord);
//    gl_FragColor = color1;
    // color2.a = .1;
    gl_FragColor =  min(color1, color2)*2. + bg_color ;
}`;

export const CausticFilter = new PIXI.Filter(undefined, fragment);
// const combineUniforms = {
//     caustic1: caustic1,
//     caustic2: caustic2,
// };
// let filter =
// filter.blendMode = PIXI.BLEND_MODES.NORMAL
// return filter
// }
