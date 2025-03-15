import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      // Убедитесь, что rehype-katex установлен и настроен правильно
      ['rehype-katex', { strict: true, throwOnError: true }],
    ],
  },
});

export default withMDX(nextConfig);