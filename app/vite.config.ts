import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // The Pages build serves the app under /VRResearch/demos/; local dev uses /.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
