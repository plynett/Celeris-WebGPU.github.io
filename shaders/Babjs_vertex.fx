precision highp float;

// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Varying: used to pass data to the fragment shader
varying vec2 vUV;

void main() {
    gl_Position = worldViewProjection * vec4(position, 1.0);
    vUV = uv;
}
