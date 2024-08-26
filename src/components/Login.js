// src/components/Login.js
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username);
    if (user) {
      // In a real app, you'd check the password here
      onLogin(user);
      navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={6}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Log in</Button>
        </VStack>
      </form>
      <Text mt={4}>
        Don't have an account? <ChakraLink as={RouterLink} to="/signup" color="blue.500">Sign up</ChakraLink>
      </Text>
    </Box>
  );
};

export default Login;