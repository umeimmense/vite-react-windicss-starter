import react from '@vitejs/plugin-react';
import { Plugin, UserConfigFn } from 'vite';
import styleImport from 'vite-plugin-style-import';
import windiCSS from 'vite-plugin-windicss';
import tsConfigPath from 'vite-tsconfig-paths';

export function splitChunk(options: { rules: Array<string | { regex: RegExp; to: string }> }): Plugin {
  function matchRule(id: string): { matched: boolean; id?: string } {
    for (const rule of options.rules) {
      if (typeof rule === 'string') {
        if (id.includes(rule)) {
          return { matched: true, id: rule };
        }
      } else if (rule.regex.test(id)) {
        return { matched: true, id: rule.to };
      }
    }

    return { matched: false };
  }

  return {
    name: 'rollup-plugin-multiple-vendors',

    outputOptions(o) {
      o.manualChunks = (id: string) => {
        if (id.includes('node_modules')) {
          const ret = matchRule(id);
          if (ret.matched) {
            return ret.id ?? 'vendor';
          }

          return 'vendor';
        }
      };
      return o;
    },
  };
}

export const defaultViteConfig: UserConfigFn = (env) => ({
  plugins: [
    // only use react-fresh
    env.mode === 'development' && react(),
    tsConfigPath(),
    windiCSS({
      scan: {
        // 使 windicss 扫描公用组件类名
        // 相对于每个项目中 vite.config.ts 的地址
        include: ['../components/**/*.{html,jsx,tsx}'],
      },
    }),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  base: './',
  build: {
    reportCompressedSize: false,
  },
  esbuild: {
    jsxInject: "import React from 'react'",
  },
});
