import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/atoms/Navigation';

storiesOf('Navigation', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('as is', () => <Navigation></Navigation>)