import { storiesMetadata, kindMetadata } from './types';

function getStoriesMetaData(target) {
  return target[storiesMetadata] =
    target[storiesMetadata] || {
      stories: new Map()
    };
}

function getKindMetaData(target) {
  return target[kindMetadata] =
    target[kindMetadata] || {
      decorators: []
    };
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
  let storyContext = new Object(null);
  storyContext.decorators = [];

  return storyContext;
}

function bindArgumentsToDecorator(decoratorFn, decoratorArgs) {
  if(!decoratorArgs.length)
    return decoratorFn;

  return decoratorFn.bind.apply(decoratorFn, [null, ...decoratorArgs])();
}

function storiesOf(storyKind, module){
  return function (target) {
    const kindMetadata = getKindMetaData(target);
    kindMetadata.storyKind = storyKind;
    kindMetadata.module = module;
  }
}

function add(storyName) {
  return function (target, key, descriptor) {
    const storiesMetadata = getStoriesMetaData(target);
    const storyContext = getStoryContext(storiesMetadata, key);

    storyContext.storyName = storyName;
    storyContext.story = target[key];

    return descriptor;
  }
}

function addDecorator(decoratorFn) {
  let decoratorArgs = [ ...arguments ];
  decoratorArgs.shift();
  const decoratorWithArguments = bindArgumentsToDecorator(decoratorFn, decoratorArgs);

  return function (target, key, descriptor) {
    // class annotation
    if(!key) {
      const kindMetadata = getKindMetaData(target);
      kindMetadata.decorators.push(decoratorWithArguments);
      return;
    }

    const storiesMetadata = getStoriesMetaData(target);
    const storyContext = getStoryContext(storiesMetadata, key);
    storyContext.decorators.push(decoratorWithArguments);

    return descriptor;
  }
}

export {
  storiesOf,
  add,
  addDecorator
};