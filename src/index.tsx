/* @refresh reload */
import 'solid-devtools';
import { render } from 'solid-js/web';

import './index.css';
import { Route, Router } from '@solidjs/router';
import { Search } from './search';
import { Layout } from './Navigation/Layout';
import { Watch } from './watch';

const root = document.getElementById('root');

render(
  () => (
    <Router root={Layout}>
      <Route path="/search" component={Search} />
      <Route path="/watch/:videoId" component={Watch} />
      <Route path="/" />
    </Router>
  ),
  root!,
);
