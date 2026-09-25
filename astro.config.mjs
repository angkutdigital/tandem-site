// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'TandemCRM',
      description: 'Docs for TandemCRM — an embeddable, event-sourced partner-attribution and commission-payout engine for Postgres.',
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
