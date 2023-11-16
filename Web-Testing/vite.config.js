// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//   },
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: ['./src/test/setup.js'],
//   },
//   coverage: {
//     provider: 'istanbul', // or 'v8'
//     reporter: ['text', 'json', 'html'],
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
});
