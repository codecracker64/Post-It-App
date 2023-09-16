import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


import App from './App';
import reducers from './reducers'

// console.log("Index.js Rendered");

const store = createStore(reducers, compose(applyMiddleware(thunk)));

reactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// const rootElement = document.getElementById('root');
// const root  = createRoot(rootElement);
// root.render(<Provider store={store}>
//     <App />
// </Provider>);