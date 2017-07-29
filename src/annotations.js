import { storiesMetadataType, kindMetadataType } from './types';

function storiesOf(storyKind, module) {
  return target => {
    const kindMetadata = getKindMetaData(target);
    kindMetadata.storyKind = storyKind;
    kindMetadata.module = module;
  };
}

function add(storyName) {
  return (target, key, descriptor) => {
    const storiesMetadata = getStoriesMetaData(target);
    const storyContext = getStoryContext(storiesMetadata, key);

    storyContext.storyName = storyName;
    storyContext.story = target[key];

    return descriptor;
  };
}

function addDecorator(decoratorFn, ...decoratorArgs) {
  const decoratorWithArguments = bindArgumentsToDecorator(decoratorFn, decoratorArgs);

  return (target, key, descriptor) => {
    // class annotation
    if (!key) {
      const kindMetadata = getKindMetaData(target);
      kindMetadata.decorators.push(decoratorWithArguments);
      return null;
    }

    const storiesMetadata = getStoriesMetaData(target);
    const storyContext = getStoryContext(storiesMetadata, key);
    storyContext.decorators.push(decoratorWithArguments);

    return descriptor;
  };
}

function bindArgumentsToDecorator(decoratorFn, decoratorArgs) {
  if (!decoratorArgs.length) {
    return decoratorFn;
  }

  return decoratorFn.bind.apply(decoratorFn, [null, ...decoratorArgs])();
}

function getStoriesMetaData(target) {
  return getMetadata(target, storiesMetadataType, () => ({
    stories: new Map(),
  }));
}

function getKindMetaData(target) {
  return getMetadata(target, kindMetadataType, () => ({
    decorators: [],
  }));
}

function getMetadata(target, prop, defaultCreator) {
  let metadata = target[prop];

  if (!metadata) {
    metadata = defaultCreator();
    target[prop] = metadata;
  }

  return metadata;
}

function getStoryContext(metadata, key) {
  let storyContext = metadata.stories.get(key);

  if (!storyContext) {
    storyContext = createEmptyStoryContext();
    metadata.stories.set(key, storyContext);
  }

  return storyContext;
}

function createEmptyStoryContext() {
  return {
    decorators: [],
  };
}

export { storiesOf, add, addDecorator };
