import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import PageContainer from './components/PageContainer';
import {setContext} from '@apollo/client/link/context'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';

  const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

const App = () => 
<ApolloProvider client={client}>
<PageContainer />
</ApolloProvider>


export default App;
