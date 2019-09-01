import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo';
import { PersistGate } from 'redux-persist/integration/react';
import persistence from './state/store';

import ArticleContainer from './components/organisms/ArticleContainer';
import LoginContainer from './components/organisms/LoginContainer';
import Navigation from './components/atoms/Navigation';
import RecommendationPage from './components/pages/RecommendationPage';
import SignupContainer from './components/organisms/SignupContainer';

import client from './apollo';
const {store, persistor} = persistence();

const router = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div>
              <Navigation />
              <Route exact path="/article/:id" component={ArticleContainer} />
              <Route exact path="/" component={RecommendationPage} />
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/signup" component={SignupContainer} />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default router;
