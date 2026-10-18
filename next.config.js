const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
module.exports = { output: 'export', basePath: base, assetPrefix: base || undefined, trailingSlash: true, images: { unoptimized: true } };
