import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Add this
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App Name',
        short_name: 'App',
        display: 'standalone', // This hides the URL bar
        theme_color: '#ffffff',
      }
    })// Add this
  ],
})


