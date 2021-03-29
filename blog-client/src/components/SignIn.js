import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Heading, Flex, Input, Stack, Button } from '@chakra-ui/react';

import {server} from '../config/server';

export default function SignIn() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function onUserNameChange(e) {
        setUserName(e.target.value);
    }

    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: userName,
            password: password
        };
        // axios.post(`${server}/login`, user)
        // .then((result) => {
        //     console.log(result);
        // })
        // .catch((err) => {
        //     console.log(`Something went wrong signing in: ${err}`);
        // });

        axios.get(`${server}/user/profile`, user)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(`Something went wrong signing in: ${err}`);
        });
    }

    return (
        <Flex
            h="100%"
            maxH="40%"
            bg="white"
            minW="400px"
            w="100%"
            maxW="25%"
            p="5"
            justifyContent="center"
            rounded="md"
            shadow="md"
            flexDirection="column">
            <form onSubmit={handleSubmit}>
                <Stack
                    alignItems="center"
                    spacing="1em">
                    <Heading as="h2" size="2xl">Blog</Heading>
                    <Input
                        onChange={onUserNameChange}
                        w="70%"
                        bg="gray.100"
                        placeholder="User Name" />
                    <Input
                        onChange={onPasswordChange}
                        w="70%"
                        bg="gray.100"
                        type="password"
                        placeholder="Password" />
                    <Button
                        type="submit"
                        w="70%"
                        colorScheme="orange"
                    >Sign In</Button>
                </Stack>
            </form>
        </Flex>
    );
}