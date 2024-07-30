import { defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
const viteConfig = defineConfig(()=>{
  const env = loadEnv(process.env.NODE_ENV, process.cwd());
  console.log(env)
  return {
    plugins: [vue()],
    base: env.VITE_PUBLIC_PATH,
    server: {
      open: true,
      proxy: { 
        '/api': { 
          target: env.VITE_API_URL, 
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true 
        } 
      }
    },
    resolve: {
      alias: {
        '@': '/src', // 确保这个路径正确
      }
    },
  }
})
export default viteConfig()