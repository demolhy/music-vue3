import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    // 'process.env': process.env
  },
  server: {
    host: 'localhost',
    https: false,
    
    open: true,
    proxy: {
      '^/dev-api': {
        target: 'https://music.linhaiyu.top',
        changeOrigin: true,
        // secure: true,
        rewrite: path => path.replace('/dev-api', '')
      }
    }
  }
})
