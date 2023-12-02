import { type ReactNode } from 'react';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const withRouter = (component: () => ReactNode) => () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>{component()}</Suspense>
  </BrowserRouter>
);

export default withRouter;
