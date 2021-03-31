import { Flex } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect } from 'react';
import {server} from '../config/server';

export default function Explore() {
    useEffect(() => {
        axios
            .get(`${server}/user/explore`)
            .then((result) => {
                console.log('Great success');
            })
    });

    return (
        <Flex>

        </Flex>
    );
}