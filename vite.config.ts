import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
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
                ElementPlusResolver({ importStyle: 'sass', directives: true, version: '2.1.5' }),
                IconsResolver({
                    prefix: 'i',
                    enabledCollections: ['ep']
                })
            ]
        }),
        Icons({
            autoInstall: true
        }),
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element-plus.scss" as *;`
            }
        }
    },
    base: './',
    server: {
        open: true
    }
});
