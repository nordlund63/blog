import { Box, Flex } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../config/server';
import { useHistory } from "react-router-dom";
import CreatePost from './CreatePost';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

const lstPosts = [
    {
        user: {
            name: "Brenton"
        },
        tags: [{ name: 'Fire' }, { name: 'Water' }],
        title: "Avatar: The Last Airbender",
        content: 'Its a good show'
    },
    {
        user: {
            name: "Sarah"
        },
        tags: [{ name: 'Fire' }, { name: 'Plants' }],
        title: "Great Plants",
        content: 'Trees and stuff...'
    },
    {
        user: {
            name: "Karen"
        },
        tags: [{ name: 'Plague' }, { name: 'Destruction' }],
        title: "COVID-19",
        content: 'Almost over now.'
    }
]

export default function Explore() {
    const [posts, setPosts] = useState([]);

    const { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        axios
            .get(`${server}/user/explore`)
            .then((result) => {
                setPosts(lstPosts);
            })
            .catch((err) => {
                console.log(`Something went wrong fetching posts: ${err}`);
            });

        history.push('/createpost');
    });

    let postCards;
    if (posts.length > 0) {

    }

    return (
        <Flex>
            <Switch>
                
                
            </Switch>
        </Flex>
    );
}