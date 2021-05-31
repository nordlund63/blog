import { Flex, Stack } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../config/server';
import { Link, useHistory } from "react-router-dom";
import CreatePost from './CreatePost';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch
} from "react-router-dom";
import PostCard from './PostCard';
import { Button } from '@chakra-ui/button';

export default function Explore() {
    const [pagePosts, setPagePosts] = useState({
        posts: [],
        postCount: 0
    });
    const { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const posts = await axios
                .get(`${server}/posts/`, { params: { paginationCount: 10, page: 1 } })
                .then(result => {
                    return result.data.posts;
                })
                .catch((err) => {
                    console.log(`Something went wrong fetching posts: ${err}`);
                });

            const postCount = await axios
                .get(`${server}/posts/count`)
                .then(result => {
                    return result.data.count.count;
                })
                .catch((err) => {
                    console.log(`Something went wrong fetching posts: ${err}`);
                });

            setPagePosts({
                posts: posts,
                postCount: postCount
            });
        }

        fetchData();

        console.log(pagePosts);
    }, []);

    let postCards;
    if (pagePosts.posts.length > 0) {
        postCards = pagePosts.posts.map(e => <PostCard key={e.postId} postId={e.postId} title={e.title} email={e.email}></PostCard>);
    }

    return (
        <Flex flexDirection="column">
            <Link to="/createpost">
                <Button alignSelf="flex-end" w="2xs" m="2" colorScheme="orange">New Post</Button>
            </Link>
            <Stack>
                {postCards}
            </Stack>
            <Switch>
            </Switch>
        </Flex>
    );
}