import { defineConfig } from './src/libs/next/config/define-config';

const vercelConfig = {
  productionBrowserSourceMaps: false,
  outputFileTracingExcludes: {
    '*': [
      // 官方自带排除项（之前因 VERCEL_ENV 未生效被跳过）
      'node_modules/.pnpm/@img+sharp-libvips-*',
      '**/@img+sharp-libvips-*/**',
      'node_modules/@img/sharp-libvips-*/**',
      'public/_spa/**',
      'dist/desktop/**',
      'dist/mobile/**',
      'apps/desktop/**',
      'packages/database/migrations/**',
      '**/packages/database/migrations/**',

      // 精准剔除截图中的五大超标元凶（合计立省 120MB+）
      '**/ffmpeg-static*/**',
      'node_modules/.pnpm/ffmpeg-static*/**',
      'dist/file-parse-worker/**',
      '**/file-parse-worker/**',
      '**/@larksuiteoapi*/**',
      '**/discord.js*/**',
      '**/pdfjs-dist*/**',

      // 剔除构建期工具与所有调试映射/类型文件
      '**/playwright*/**',
      '**/electron*/**',
      '**/@next+swc*/**',
      '**/*.map',
      '**/*.d.ts',
      '**/*.d.mts',
      '.next/server/**/*.map',
    ],
  },
};

const nextConfig = defineConfig(vercelConfig);

// 关闭服务端 SourceMap，进一步压缩 .next/server/chunks 体积
nextConfig.productionBrowserSourceMaps = false;
nextConfig.experimental = {
  ...nextConfig.experimental,
  serverSourceMaps: false,
};

export default nextConfig;
