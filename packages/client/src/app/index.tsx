import { type FC } from 'react';
import './style/style.css';
import Routing from 'pages';
import withProviders from './providers';
// TODO: Подумать как пересторить содежание этой папки
const App: FC = () => <Routing />;

export default withProviders(App);
