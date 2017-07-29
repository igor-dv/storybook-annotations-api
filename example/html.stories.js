/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text } from '@storybook/addon-knobs';
import { build, addDecorator, add, storiesOf } from '../src';

function externalDecorator(story) {
  return (
    <div style={{ fontSize: 'bold' }}>
      {story()}
    </div>
  );
}

@storiesOf('basic.components.Html', module)
@addDecorator(withKnobs)
@addDecorator(externalDecorator)
@addDecorator(story =>
  <div style={{ color: 'red' }}>
    {story()}
  </div>
)
class HtmlStoriesDescriptor {
  @add('div story')
  addDivStory() {
    return (
      <div>
        {text('div', 'div text')}
      </div>
    );
  }

  @add('span story')
  addSpanStory() {
    return <span>span</span>;
  }

  @add('section story')
  addSectionStory() {
    return <section>section</section>;
  }

  @add('anchor story')
  @addDecorator(withInfo('Very useful anchor story', { inline: true }))
  @addDecorator(withNotes({ notes: 'Very useful anchor story' }))
  addAnchorStory() {
    return <a>anchor</a>;
  }

  @add('table story')
  @addDecorator(withInfo, 'Very useful table story 2', { inline: true })
  @addDecorator(withNotes, { notes: 'Very useful table story 2' })
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
