import { storiesOf } from '@storybook/react';
import { storiesMetadata, kindMetadata } from './types';

function attachCommonDecorators(storiesHandler, decorators) {
  if (!decorators || !decorators.length) {
    return;
  }

  decorators.reduce((storiesHandler, decoratorFn) => {
    if (decoratorFn && typeof decoratorFn === 'function') {
      storiesHandler.addDecorator(decoratorFn);
    }

    return storiesHandler;
  }, storiesHandler);
}

function decorateStory(story, decorators) {
  if (!decorators || !decorators.length) {
    return story;
  }

  return decorators.reduce((current, next) => {
    if (!next) {
      return current;
    }

    return next(current);
  }, story);
}

function attachStories(storiesHandler, metadata) {
  Array.from(metadata.stories.values())
    .forEach(storyContext => {
      const {storyName, story, decorators} = storyContext;
      storiesHandler.add(storyName, decorateStory(story, decorators));
    });
}

function build(storyDescriptor) {
  const {storyKind, module, decorators} = storyDescriptor[kindMetadata];
  const metadata = new storyDescriptor()[storiesMetadata];
  const storiesHandler = storiesOf(storyKind, module);

  attachCommonDecorators(storiesHandler, decorators);
  attachStories(storiesHandler, metadata);
}

export {
  build
}