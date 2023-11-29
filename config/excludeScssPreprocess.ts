import path from 'path';
import fs from 'fs/promises';
import { PluginOption } from 'vite';

const patterns = /\.(module\.scss)(\?.*)?/;

export function excludeScssPreprocess(srcDir: string): PluginOption {
  const files: string[] = [];
  return {
    name: 'exclude-scss-preprocess',
    enforce: 'pre',
    resolveId(id, importer) {
      if (patterns.test(id)) {
        const file = id.replace(/\?.*/, '');
        const filepath = file.startsWith('@/')
          ? file.replace('@', srcDir)
          : path.resolve(path.dirname(importer as string), file);
        files.push(filepath);
        return { id: file, external: true };
      }
    },
    async writeBundle(options) {
      await Promise.all(
        files.map((file) => {
          const dist = file.replace(srcDir, options.dir as any);
          return fs.copyFile(file, dist);
        })
      );
    },
  };
}
