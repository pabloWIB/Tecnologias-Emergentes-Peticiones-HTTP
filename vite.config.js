import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const src = fileURLToPath(new URL('./src', import.meta.url));

const SRC_FOLDERS = ['api', 'assets', 'components', 'config', 'hooks', 'layout', 'menu-items', 'pages', 'routes', 'store', 'themes', 'utils'];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: SRC_FOLDERS.map((folder) => ({
      find: new RegExp(`^${folder}(/.*)?$`),
      replacement: `${src}/${folder}$1`
    }))
  },
  server: {
    port: 3000
  }
});
