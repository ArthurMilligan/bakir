import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions: null
  },
  resolve: {
    alias: {
      'pages': path.resolve('src/pages'),
      'entities': path.resolve('src/entities'),
      'features': path.resolve('src/features'),
      'ui': path.resolve('src/shared/ui'),
      'lib': path.resolve('src/shared/lib'),
      'shared': path.resolve('src/shared/'),
      'widgets': path.resolve('src/widgets'),
      'app': path.resolve('src/app'),
    }
  }
})
