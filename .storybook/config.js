import { configure, addDecorator, addParameters } from '@storybook/react';

import { configureActions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withConsole } from '@storybook/addon-console';

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
  },
});

// Plugins

configureActions({
  depth: 20,
  limit: 5,
});

addDecorator(withKnobs);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

configure(require.context('../stories', true, /\.stories\.tsx$/), module);
