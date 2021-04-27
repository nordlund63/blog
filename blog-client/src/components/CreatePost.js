import { Flex, Stack, Heading, Input, Box, Text, HStack, Button, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { server } from '../config/server';

export default function CreatePost() {
    const [title, setPostTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const post = {
            title: title,
            content: content,
            tags: tags
        };

        axios
            .post(`${server}/post/createpost`, post)
            .then((result) => {
                console.log('Added item!');
            })
            .catch((err) => {
                console.log(`Something went wrong creating new post: ${err}`);
            })
    }

    function onSetPostTitle(e){
        setPostTitle(e.target.value);
    }

    function onTagChange(e){
        setTag(e.target.value);
    }

    function onTagEnter(e){
        if(e.key === "Enter"){
            onTagAdd();
        }
    }

    function onTagAddClick(e){
        onTagAdd();
    }

    function onTagAdd(){
        if(tag !== '' && tags && tags.filter(e => e === tag).length == 0){
            setTags(oldTags => [...oldTags, {name: tag}]);
            setTag('');
        }
    }

    function onTagRemove(tag){
        setTags(tags.filter(e => e.name !== tag.name));
    }

    let renderTags;
    if(tags && tags.length > 0){
        renderTags = tags.map(tag => <NewTag key={tag.name} name={tag.name} onTagRemove={() => onTagRemove(tag)} />)
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
                            w="100%"
                            bg="gray.100"
                            placeholder="Content"
                            color="black" />
                    </Box>
                    <Box>
                        <Text>Tags</Text>
                        <HStack>
                            <Input
                            w="100%"
                            bg="gray.100"
                            placeholder="Press Enter..."
                            color="black"
                            value={tag}
                            onChange={onTagChange}
                            onKeyPress={onTagEnter} ></Input>
                            <Button onClick={onTagAddClick} colorScheme="orange">Add</Button>
                        </HStack>
                        {renderTags}
                    </Box>
                    <HStack
                    justifyContent="flex-end">
                        <Button variant="ghost">Cancel</Button>
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