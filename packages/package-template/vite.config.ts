import { UserConfigExport, defineConfig, mergeConfig } from 'vite';

import { defaultViteConfig, splitChunk } from '../config';

const config: UserConfigExport = {
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#2468F2',
        },
        javascriptEnabled: true,
      },
    },
  },
  base: './',
  plugins: [
    splitChunk({
      rules: ['lodash', 'antd', 'moment', '@ant-design/icons', { regex: /rc-/i, to: 'rc-component' }],
    }),
  ],
};

export default defineConfig((env) => mergeConfig(defaultViteConfig(env), config));
