"use client";

import { useEffect, useRef } from "react";

export default function NetworkShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId: number;
    let resizeObserver: ResizeObserver;

    // Sync WebGL buffer size with client size
    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width) || 1280;
      const h = Math.floor(rect.height) || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float network(vec2 uv, float t, vec2 m) {
        vec2 p = uv * 8.0;
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        float intensity = 0.0;
        
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 cellId = i + neighbor;
            float h = hash(cellId);
            
            // Random point movement within cell
            vec2 point = 0.5 + 0.35 * sin(t * 0.5 + h * 6.2831);
            
            // Vector from current pixel to random point in cell
            vec2 diff = neighbor + point - f;
            float d = length(diff);
            
            // Base node glow
            float nodeGlow = smoothstep(0.08, 0.0, d) * (sin(t * 1.5 + h * 3.14) * 0.3 + 0.7);
            
            // Interactive mouse hover glow amplification
            vec2 ndc_pos = (cellId + point) / 8.0;
            float mouseDist = length(ndc_pos - m);
            if (mouseDist < 0.25) {
              nodeGlow *= (1.0 + (1.0 - mouseDist / 0.25) * 2.0);
            }
            
            intensity += nodeGlow;
          }
        }
        return intensity;
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 uvAspect = uv * aspect;
        
        // Transform mouse position to normalized coords matching aspect ratio
        vec2 normMouse = (u_mouse / u_resolution) * aspect;
        
        float net = network(uvAspect, u_time * 0.5, normMouse);
        
        // Colors
        vec3 colorBg = vec3(0.043, 0.059, 0.098); // #0B0F19 background
        vec3 colorCyan = vec3(0.424, 0.957, 1.0) * 0.18; // #6CF4FF Cyan accent glow
        
        vec3 finalColor = mix(colorBg, colorCyan, net);
        
        // Add a gentle vignette
        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        finalColor *= vignette;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);

    if (!program || !vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        // Flip Y for WebGL coordinates
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = (time: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      if (timeLoc) gl.uniform1f(timeLoc, time * 0.002);
      if (resLoc) gl.uniform2f(resLoc, canvas.width, canvas.height);
      if (mouseLoc) gl.uniform2f(mouseLoc, mouse.x, mouse.y);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
