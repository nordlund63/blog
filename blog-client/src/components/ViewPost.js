import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading } from "@chakra-ui/layout";
import axios from 'axios';
import { useParams } from 'react-router';
import { server } from '../config/server';

export default function ViewPost() {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
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
        flexDirection="column"
      >
            <Heading as="h4" size="md">{post.title}</Heading>
            <Box
            paddingTop="3">
                {post.content}
            </Box>
        </Flex>
    );
}