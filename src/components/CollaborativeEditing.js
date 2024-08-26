// src/components/CollaborativeEditing.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Textarea, VStack, HStack, Text, Avatar } from '@chakra-ui/react';

const CollaborativeEditing = () => {
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://bit.ly/dan-abramov' },
    { id: 2, name: 'Jane Smith', avatar: 'https://bit.ly/kent-c-dodds' },
  ]);

  // Simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setContent(prevContent => prevContent + ' Collaborative edit');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Heading mb={6}>Collaborative Editing</Heading>
      <HStack mb={4}>
        <Text>Current editors:</Text>
        {users.map(user => (
          <Avatar key={user.id} name={user.name} src={user.avatar} size="sm" />
        ))}
      </HStack>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        height="300px"
        placeholder="Start editing the contract..."
      />
      <Text mt={2} fontSize="sm" color="gray.500">
        Changes are automatically saved and synced with other editors.
      </Text>
    </Box>
  );
};

export default CollaborativeEditing;