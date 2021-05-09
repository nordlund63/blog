import { Flex, Stack } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../config/server';
import { useHistory } from "react-router-dom";
import CreatePost from './CreatePost';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch
} from "react-router-dom";
import PostCard from './PostCard';

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
                .get(`${server}/post/pagination`, { params: { paginationCount: 10, page: 1 } })
                .then(result => {
                    return result.data.posts;
                })
                .catch((err) => {
                    console.log(`Something went wrong fetching posts: ${err}`);
                });

            const postCount = await axios
                .get(`${server}/post/count`)
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
        postCards = pagePosts.posts.map(e => <PostCard key={e.postId} title={e.title} email={e.email}></PostCard>);
    }

    return (
        <Flex>
            <Stack>
                {postCards}
            </Stack>

            <Switch>
            </Switch>
        </Flex>
    );
}