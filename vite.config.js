import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: 'https://kickerkiat.github.io/Portfolio/', // ⚠️ IMPORTANT
});