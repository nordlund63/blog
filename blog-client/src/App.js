import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  theme,
} from '@chakra-ui/react';
import SignIn from './components/SignIn';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.100">
        <Flex
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <SignIn />
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
