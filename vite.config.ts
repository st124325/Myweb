import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Myweb/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/rutube': {
        target: 'https://rutube.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rutube/, '/api'),
      },
    },
  },
})
