## Requirements
* 2d boids with basic rules
  * use pixijs? and in react
  * https://github.com/kittykatattack/learningPixi
  * http://www.vergenet.net/~conrad/boids/pseudocode.html
* add random scatter rule
* add a boid you can control and steer left and right.  extra goal
* use smoothie to interpolate frames and optimize
* Do game tick in webassembly / rust.  Can probably do all 


Will have to send the list of boids to javascript as a list of positions.  see: https://github.com/carlmw/birbs/blob/master/src/lib.rs#L31-L40
push x -> y -> theta
not sure if velocity is needed.  but angle is.  
Then the tick function just modifes the array in place to update the positions.  