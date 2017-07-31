# Annotations API for Storybook #

Creating Storybook stories with es6 decorators.

## API ##

1. **`@storiesOf(storyKind, module)`**
2. **`@add(storyName)`**
3. **`@addDecorator(decorator, [arguments])`**
4. **`build(descriptor)`**

TBD

## Installation ##

```sh
npm i -D storybook-annotations-api 
```

Add [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) to your babel configuration for Storybook.

#### For Example .babelrc ####

```json
{
  "plugins": ["transform-decorators-legacy"]
}
```

## Example ##

### How to run ###

```sh
npm run storybook
```

### Example of the stories file ###

```js
import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text } from '@storybook/addon-knobs';
import { build, addDecorator, add, storiesOf } from 'storybook-annotations-api';

function externalDecorator(story) {
  return (
    <div style={{fontSize: 'bold'}}>
      {story()}
    </div>
  )
}

@storiesOf('basic.components.Html', module)
@addDecorator(withKnobs)
@addDecorator(externalDecorator)
@addDecorator(story => (
  <div style={{color: 'red'}}>
    {story()}
  </div>
))
class HtmlStoriesDescriptor {
  @add('div story')
  addDivStory() {
    return (
      <div>{text('div', 'div text')}</div>
    );
  }

  @add('span story')
  addSpanStory() {
    return (
      <span>span</span>
    );
  }

  @add('section story')
  addSectionStory() {
    return (
      <section>section</section>
    );
  }

  @add('anchor story')
  @addDecorator(withInfo({text: 'Very useful anchor story', inline: true}))
  @addDecorator(withNotes({text: 'Very useful anchor story'}))
  addAnchorStory() {
    return (
      <a>anchor</a>
    );
  }

  @add('table story')
  @addDecorator(withInfo, {text: 'Very useful table story 2', inline: true})
  @addDecorator(withNotes, {text: 'Very useful table story 2'})
  addTableStory() {
    return (
      <table>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>a</td>
          <td>b</td>
          <td>c</td>
        </tr>
      </table>
    );
  }
}

build(HtmlStoriesDescriptor);
```
