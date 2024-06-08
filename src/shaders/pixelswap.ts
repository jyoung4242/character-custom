export const pixelSwapFrag = `#version 300 es
    precision mediump float;

    //input texture
    
    //primary, secondary, tertiary, quaternary, quinary
    uniform vec4 primaryColor;
    uniform vec4 secondaryColor;
    uniform vec4 tertiaryColor;
    uniform vec4 quaternaryColor;
    uniform vec4 quinaryColor;
    
    in vec2 v_uv;
    uniform sampler2D u_graphic; 
    out vec4 color;

    const float darkGray = 64.0/255.0;
    const float lightGray = 191.0/255.0;
    const float medGray = 128.0/255.0;

    const vec4 PRIM_BASE = vec4(0.0,0.0,0.0,1.0);
    const vec4 SEC_BASE = vec4(darkGray,darkGray,darkGray,1.0);
    const vec4 TER_BASE = vec4( medGray,medGray,medGray,1.0);
    const vec4 QUART_BASE = vec4( lightGray,lightGray,lightGray,1.0);
    const vec4 QUIN_BASE = vec4(1.0,1.0,1.0,1.0);
        
    void main() {
        vec4 texColor = texture(u_graphic, v_uv);
       
         if (texColor == PRIM_BASE) {
            color  = primaryColor;
        } else if (texColor == SEC_BASE) {
            color = secondaryColor;
        } else if (texColor == TER_BASE) {
            color = tertiaryColor;
        } else if (texColor == QUART_BASE) {
            color = quaternaryColor;
        } else if (texColor == QUIN_BASE) {
            color = quinaryColor;
        } else {
            color = texColor; 
        }
       
    }
    `;
