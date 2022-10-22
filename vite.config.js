import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [glsl({
    defaultExtension: 'glsl', // Shader suffix when no extension is specified
    compress: false,          // Compress output shader code
    watch: true,              // Recompile shader on change
    root: '/'
  })]
});
