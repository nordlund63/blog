import React, { useEffect, useState } from 'react';
import { Box } from "@chakra-ui/layout";
import axios from 'axios';
import { useParams } from 'react-router';
import { server } from '../config/server';

export default function ViewPost() {
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let { id } = useParams();

            const post = await axios
                .get(`${server}/posts/${id}`)
                .then(result => {
                    return result.data.post;
                })
                .catch((err) => {
                    console.log(`Something went wrong fetching post: ${err}`);
                });

            setPost(post);
        }

        fetchData();
    }, []);

    return (
        <Box>
            {post.title};
        </Box>
    );
}