// src/components/SignUp.js
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignUp = () => {
    // Validate inputs
    if (!username || !firstName || !lastName || !email) {
      toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if username already exists
    if (existingUsers.some(user => user.username === username)) {
      toast({
        title: "Error",
        description: "Username already exists",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Add new user
    const newUser = { username, firstName, lastName, email };
    existingUsers.push(newUser);

    // Save updated users array
    localStorage.setItem('users', JSON.stringify(existingUsers));

    toast({
      title: "Success",
      description: "Account created successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate('/login');
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={6}>Sign Up</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleSignUp}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUp;