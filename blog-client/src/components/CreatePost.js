import { Flex, Stack, Heading, Input, Box, Text, HStack, Button, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { server } from '../config/server';
import { useHistory } from "react-router-dom";

export default function CreatePost() {
    const [title, setPostTitle] = useState('');
    const [content, setContent] = useState('');
    //const [tags, setTags] = useState([]);

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const post = {
            title: title,
            content: content,
            //tags: tags
        };

        axios
            .post(`${server}/posts/createpost`, post)
            .then((result) => {
                console.log('Added item!');
                history.push("/explore");
            })
            .catch((err) => {
                console.log(`Something went wrong creating new post: ${err}`);
            })
    }

    function onCancel(e){
        history.push("/explore");
    }

    function onSetPostTitle(e){
        setPostTitle(e.target.value);
    }

    function onSetContent(e){
        setContent(e.target.value);
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
                    spacing="1em"
                    mx="1em">

                    <Heading
                        alignSelf="flex-start"
                        as="h1"
                        fontWeight="bold"
                        color="black"
                        size="md">Create Post</Heading>
                    <Box>
                        <Text>Title</Text>
                        <Input
                            onChange={onSetPostTitle}
                            w="100%"
                            bg="gray.100"
                            placeholder="Title"
                            color="black" />
                    </Box>

                    <Box>
                        <Text>Content</Text>
                        <Textarea
                            onChange={onSetContent}
                            w="100%"
                            bg="gray.100"
                            placeholder="Content"
                            color="black" />
                    </Box>
                    <HStack
                    justifyContent="flex-end">
                        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                        <Button colorScheme="blue" type="submit" variant="solid">New Post</Button>
                    </HStack>
                </Stack>
            </form>
        </Flex>
    );
}

function NewTag(props){
    return (
        <Tag>
            <TagLabel>{props.name}</TagLabel>
            <TagCloseButton onClick={props.onTagRemove} />
        </Tag>
    );
}