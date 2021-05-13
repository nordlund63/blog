import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  theme,
} from '@chakra-ui/react';
import { Router, Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import history from './history';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Explore from './components/Explore';
import CreatePost from './components/CreatePost';
import Cookies from 'js-cookie';
import ViewPost from './components/ViewPost';

function App() {
  axios.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    if (token) {
      console.log(token);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.100">
        <Flex justifyContent="center" alignItems="center" minHeight="100vh">
          <BrowserRouter history={history}>
            <Switch>
              <Route exact path="/">
                <SignIn />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/explore">
                <Explore />
              </Route>
              <Route path={"/createpost"}>
                <CreatePost />
              </Route>
              <Route path={"/post/:id"}>
                <ViewPost />
              </Route>
            </Switch>
          </BrowserRouter>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
