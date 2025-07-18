import type { Config } from './types';
import { getYear } from 'date-fns';
import { url } from '@/utils/url';

const config: Config = {
  title: 'asadsnote',
  description: 'a tech blog',
  author: 'Asad',
  favicon: url('favicon.ico'),
  navbar: {
    logo: 'asadsnote',
    menu: [
      {
        label: 'Home',
        url: url('/'),
        icon: 'tabler:home'
      },
      {
        label: 'Tags',
        url: url('/tags'),
        icon: 'tabler:tag'
      },
      {
        label: 'Categories',
        url: url('/categories'),
        icon: 'tabler:category'
      },
      {
        label: 'Archive',
        url: url('/archive'),
        icon: 'tabler:archive'
      },
      {
        label: 'Friends',
        url: url('/friends'),
        icon: 'tabler:heart-handshake'
      },
      {
        label: 'About',
        url: url('/about'),
        icon: 'tabler:info-circle'
      },
      // {
      //   label: '菜单示例',
      //   icon: 'tabler:menu-2',
      //   children: [
      //     { label: 'SubItem1', url: '#', icon: 'tabler:circle'},
      //     { label: 'SubItem2', url: '#', icon: 'tabler:circle'},
      //     {
      //       label: 'SubItem3',
      //       icon: 'tabler:menu-2',
      //       children: [
      //         { label: 'SubItem1', url: '#', icon: 'tabler:circle'},
      //         { label: 'SubItem2', url: '#', icon: 'tabler:circle'},
      //         { label: 'SubItem3', url: '#', icon: 'tabler:circle'},
      //       ]
      //     },
      //   ]
      // },
    ],
    hasSearchToggle: true,
    hasThemeToggle: true,
  },
  hero: {
    background: import('src/assets/hero-bg.jpg'),
    description: 'Welcome to my little universe!',
    // title: import('@/custom/HeroLogo.astro'),
    title: 'asadsnote',
  },
  sidebar: {
    widgets: [
      {
        name: 'profile',
        author: 'Asad M.',
        description: 'Front-end Developer',
        avatar: import('src/assets/myImg.webp'),
        background: import('src/assets/profile-bg.jpg'),
        socialIcons: [
          {
            label: 'github',
            color: '#7c8690',
            icon: 'tabler:brand-github',
            url: 'https://github.com/asadmash'
          },
          // {
          //   label: 'bilibili',
          //   color: '#fc87b2',
          //   icon: 'tabler:brand-bilibili',
          //   url: 'https://space.bilibili.com/293591084'
          // },
          // {
          //   label: 'netease music',
          //   color: '#ff4e6a',
          //   icon: 'tabler:brand-netease-music',
          //   url: 'https://music.163.com/user/390631653'
          // },
          // {
          //   label: 'twitter',
          //   color: '#1d9bf0',
          //   icon: 'tabler:brand-twitter',
          //   url: 'https://twitter.com/vviderx'
          // },
          {
            label: 'mail',
            color: '#7562c7',
            icon: 'tabler:mail',
            url: 'mailto:mdasad.mash@gmail.com'
          }
        ],
      },
      
      {
        name: 'category-tree',
        sortBy: 'count',
        order: 'desc',
        expandDepth: 2,
      },
      
      {
        name: 'tag-cloud',
        sortBy: 'count',
        order: 'desc',
        limit: 30,
      },
      {
        name: 'component',
        // component: import('src/assets/promo.jpg'),
        component: import('@/components/custom/Recommend.astro'),
      },
    ]
  },
  pagination: {
    pageSize: 20,
    hasControls: true,
    hasEdges: false,
    siblings: 2,
    boundaries: 1,
  },
  article: {
    outdateTip: {
      outdateLimit: 180,
    },
    license: {
      licenseName: 'CC BY-NC-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
      infoText: 'Please indicate the author and source when reprinting or quoting this article. It may not be used for commercial purposes.',
    }
  },
  comment: {
    provider: 'giscus',
    options: {
      repo: 'asadmash/asadsnote.github.io',
      repoId: 'R_kgDOPOxLNA',
      category: 'General',
      categoryId: 'DIC_kwDOPOxLNM4CtJgq',
      mapping: 'pathname',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      lang: 'en-US',
    },
    // provider: 'giscus',
    // options: {
    //   repo: 'asadmash/asadsnote.github.io',
    //   repoId: 'R_kgDOJIxtIQ',
    //   category: 'General',
    //   categoryId: 'DIC_kwDOJIxtIc4CU1cl',
    //   mapping: 'pathname',
    //   reactionsEnabled: '1',
    //   emitMetadata: '0',
    //   inputPosition: 'top',
    //   lang: 'en-US',
    // },
    
    // provider: 'waline',
    // options: {
    //   serverURL: 'https://waline-vercel.wider.ink/',
    //   meta: ['nick', 'mail', 'link'],
    //   requiredMeta: ['nick', 'mail'],
    //   wordLimit: 200,
    //   commentSorting: 'latest',
    //   login: 'disable',
    //   search: false,
    //   copyright: false,
    //   reaction: false,
    //   emoji: [
    //     '//unpkg.com/@waline/emojis@1.1.0/weibo',
    //     '//unpkg.com/@waline/emojis@1.1.0/bilibili',
    //     // '//cdn.jsdelivr.net/gh/GamerNoTitle/ValineCDN@master/Coolapk/',
    //   ],
    // }
  },
  footer: {
    // links: [
    //   { label: '更新日志', url: url('changelog')},
    //   { label: '引用声明', url: url('reference')},
    //   { label: '关于', url: url('about')},
    //   { label: '归档', url: url('archive')},
    //   { label: '友情链接', url: url('friends')},
    //   { label: 'Github', url: 'https://github.com/izmttk'},
    // ],
    declarations: [
      `Copyright © ${getYear(new Date())} asadsnote All Rights Reserved.`,
    ],
    generator: true,
    rss: true,
    sitemap: true,
  },
  algolia: {
    appId: "1IIXBX6FGH",
    apiKey: "91aa4234096f4963e33d53262340b1ec",
    indexName: "wider",
  }
}

export default config;
