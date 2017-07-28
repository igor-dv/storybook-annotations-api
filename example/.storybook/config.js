import { configure, } from '@storybook/react';

function loadStories() {
  require('../html.stories.js');
}

configure(loadStories, module);
