import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy *all* requests to your backend server
      '/': {
        target: 'http://34.226.245.51:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
