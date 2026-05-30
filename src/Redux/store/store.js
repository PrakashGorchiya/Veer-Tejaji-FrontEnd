import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create Redux store with saga middleware
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run root saga
sagaMiddleware.run(rootSaga);

export default store;
