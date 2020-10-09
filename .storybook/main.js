const path = require('path');

module.exports = {
  stories: ['../stories/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
  ],
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    panelPosition: 'right',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~/': path.resolve(__dirname, '../src/'),
    };
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
