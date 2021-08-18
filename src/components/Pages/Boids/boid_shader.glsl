#ifdef GL_ES
precision mediump float;
#endif
vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}
// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main(void)
{
    
    vec4 color = texture2D(uSampler, vTextureCoord);
    // if(color.r ==1.0 ){
    //     if(color.g ==1.0) {
    //         if(color.b ==1.0) {
    //             color =vec4(gl_FragCoord.x/1000.0,gl_FragCoord.y/1000.0,0.0,1.0);
    //         }
    //     }
    // }

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 noise = vec3(0.0);

    float t = 1.0;
    // Uncomment to animate
    //t = abs(1.0-sin(u_time*.1))*5.;
    // Comment and uncomment the following lines:
    st += noise(st*2.)*t; // Animate the coordinate space
    noise = vec3(1.) * smoothstep(.18,.2,noise(st)); // Big black drops
    noise += smoothstep(.15,.2,noise(st*10.)); // Black splatter
    noise -= smoothstep(.35,.4,noise(st*10.)); // Holes on splatter

    gl_FragColor = vec4(1.-noise,1.0) + color;


    
}

// Computes the dot product of the distance and gradient vectors.
float dotGridGradient(int ix, int iy, float x, float y) {

    // Precomputed (or otherwise) gradient vectors at each grid node
    extern float Gradient[IYMAX][IXMAX][2];

    // Compute the distance vector
    float dx = x - (float)ix;
    float dy = y - (float)iy;

    // Compute the dot-product
    return (dx*Gradient[iy][ix][0] + dy*Gradient[iy][ix][1]);
}

// Compute Perlin noise at coordinates x, y
float perlin(float x, float y) {

    // Determine grid cell coordinates
    int x0 = (int)x;
    int x1 = x0 + 1;
    int y0 = (int)y;
    int y1 = y0 + 1;

    // Determine interpolation weights
    // Could also use higher order polynomial/s-curve here
    float sx = x - (float)x0;
    float sy = y - (float)y0;

    // Interpolate between grid point gradients
    float n0, n1, ix0, ix1, value;

    n0 = dotGridGradient(x0, y0, x, y);
    n1 = dotGridGradient(x1, y0, x, y);
    ix0 = lerp(n0, n1, sx);

    n0 = dotGridGradient(x0, y1, x, y);
    n1 = dotGridGradient(x1, y1, x, y);
    ix1 = lerp(n0, n1, sx);

    value = lerp(ix0, ix1, sy);
    return value;
}


varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D caustic1;
uniform sampler2D caustic2;
uniform float time;

void main(void)
{   
    vec4 color1 = texture2D(caustic1, vTextureCoord);
    vec4 color2 = texture2D(caustic2, vTextureCoord);
   gl_FragColor = color1+color2;
}