import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {}
  return {
    plugins,
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return
            if (id.includes('@react-three/fiber')) return 'r3f-fiber'
            if (id.includes('@react-three/drei')) return 'r3f-drei'
            if (id.includes('three')) return 'three'
            if (id.includes('framer-motion')) return 'framer-motion'
            if (id.includes('lucide-react')) return 'lucide'
            if (id.includes('react-dom')) return 'react-dom'
            if (/node_modules[/\\]react[/\\]/.test(id)) return 'react'
            if (id.includes('lenis')) return 'lenis'
            if (id.includes('gsap')) return 'gsap'
            return 'vendor'
          },
        },
      },
    },
  }
})
