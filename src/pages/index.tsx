import { type FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ERoutes, useScroll } from 'lib';
import About from './About';
import News from './News';
import Home from './Home';
import Partners from './Partners';
import Team from './Team';
import NotFound from './NotFound';
import UI from './UIKit';

const Routing: FC = () => {
  useScroll(Object.values(ERoutes));

  return (
    <Routes>
      <Route path={ERoutes.home} element={<Home />} />
      <Route path={ERoutes.about} element={<About />} />
      <Route path={ERoutes.news} element={<News />} />
      <Route path={ERoutes.partners} element={<Partners />} />
      <Route path={ERoutes.team} element={<Team />} />
      {/* UI presentation */}
      <Route path='/ui' element={<UI />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
