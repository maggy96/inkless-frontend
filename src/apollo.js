import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_BACKEND_URL,
  fetchOptions: {
    credentials: 'include'
  },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      }
    });
  },
});
