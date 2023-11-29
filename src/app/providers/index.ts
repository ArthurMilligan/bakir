import compose from 'compose-function';
import withRouter from './withRouter';

const withProviders = compose(withRouter);

export default withProviders;
