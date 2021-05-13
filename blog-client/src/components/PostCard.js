import { Box, Flex, Spacer, Stack, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PostCard(props) {

    return (
        <Stack bg="white"
            w="90%"
            minW="900px"
            rounded="md"
            borderColor="gray.200"
            border="3px"
            p="2">
            <Link>
                <Text>{props.title}</Text>
            </Link>
            <Flex
                flexDirection="row"
                w="100%"
                alignContent="center"
                justifyContent="space-between">
                <Box>
                    22
                    </Box>
                <Box>
                    {props.email}
                </Box>
            </Flex>
        </Stack>
    );
}