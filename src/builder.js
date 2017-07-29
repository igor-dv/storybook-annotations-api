import { storiesOf } from '@storybook/react';
import { storiesMetadataType, kindMetadataType } from './types';

function build(StoryDescriptor) {
  const { storyKind, module, decorators } = StoryDescriptor[kindMetadataType];
  const metadata = new StoryDescriptor()[storiesMetadataType];
  const storiesHandler = storiesOf(storyKind, module);

  attachCommonDecorators(storiesHandler, decorators);
  attachStories(storiesHandler, metadata);
}

function attachCommonDecorators(storiesHandler, decorators) {
  if (!decorators || !decorators.length) {
    return;
  }

  decorators.reduce((handler, decoratorFn) => {
    if (decoratorFn && typeof decoratorFn === 'function') {
      handler.addDecorator(decoratorFn);
    }

    return handler;
  }, storiesHandler);
}

function attachStories(storiesHandler, metadata) {
  Array.from(metadata.stories.values()).forEach(storyContext => {
    const { storyName, story, decorators } = storyContext;
    storiesHandler.add(storyName, decorateStory(story, decorators));
  });
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

export { build };
