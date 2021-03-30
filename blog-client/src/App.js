import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  theme,
  Text,
  Stack,
} from '@chakra-ui/react';
import { Router, Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import history from './history';
import SignIn from './components/SignIn';
import Register from './components/Register';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.100">
        <Flex justifyContent="center" alignItems="center" minHeight="100vh">
          <Router history={history}>
            <Switch>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </Router>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
