import dva from 'dva';
// import { createBrowserHistory as createHistory} from 'history';

import './index.css';


// 1. Initialize
const app = dva({
    // history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/me').default);
app.model(require('./models/rooms').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
