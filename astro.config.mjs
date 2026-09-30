// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://tandemcrm.dev',
  integrations: [
    starlight({
      title: 'TandemCRM',
      description: 'Docs for TandemCRM: partner commissions with holds, approvals, disputes and a replayable audit trail, stored in your own Postgres.',
      customCss: ['./src/styles/starlight-tandem.css'],
      logo: {
        src: './src/assets/logo-mark.svg',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/angkutdigital/tandem-crm' },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [{ autogenerate: { directory: 'guides' } }],
        },
      ],
    }),
  ],
});
