import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Heading, Flex, Input, Stack, Button } from '@chakra-ui/react';
import {server} from '../config/server';

export default function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setsecondPassword] = useState('');

    const history = useHistory();

    function onUserNameChange(e) {
        setUserName(e.target.value);
    }

    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    function onSecondPasswordChange(e) {
        setsecondPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(password !== secondPassword){
            console.log('They don\'t match!');
        }
        const user = {
            email: userName,
            password: password
        };
        console.log(user);
        axios.post(`${server}/register`, user)
        .then((result) => {
            console.log('Registered!');
            history.push("/");
        })
        .catch((err) => {
            console.log(`Something went wrong signing in: ${err}`);
        });
    }



    return (<Flex
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
                <Heading as="h1" color="black" size="2xl">Register</Heading>
                <Input
                    onChange={onUserNameChange}
                    w="70%"
                    bg="gray.100"
                    placeholder="User Name"
                    color="black" />
                <Input
                    onChange={onPasswordChange}
                    w="70%"
                    bg="gray.100"
                    type="password"
                    placeholder="Password"
                    color="black" />
                <Input
                    onChange={onSecondPasswordChange}
                    w="70%"
                    bg="gray.100"
                    type="password"
                    placeholder="Enter your password again..."
                    color="black" />
                <Button
                    type="submit"
                    w="70%"
                    colorScheme="orange"
                >Sign In</Button>
            </Stack>
        </form>
    </Flex>);
}