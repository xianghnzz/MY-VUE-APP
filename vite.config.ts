import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                {
                    axios: [['default', 'axios']]
                }
            ],
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'i'
                })
            ],
            eslintrc: {
                enabled: false, // 只打开一次即可，生成.eslintrc-auto-import.json文件后关闭，避免每次都生成文件
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true
            }
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'i',
                    enabledCollections: ['ep']
                })
            ]
        }),
        Icons({
            autoInstall: true
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    base: './',
    server: {
        open: true
    }
});
