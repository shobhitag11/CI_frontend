// src/components/NavBar.js
import React from 'react';
import { Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

const NavBar = () => {
  return (
    <Box bg="gray.100" py={2}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Flex>
          <Button as={RouterLink} to="/dashboard" variant="ghost" mr={2}>
            Home
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
              Contracts
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/dashboard/summarization">Summarization</MenuItem>
              <MenuItem as={RouterLink} to="/dashboard/redlining">Redlining</MenuItem>
              <MenuItem as={RouterLink} to="/dashboard/creation">Creation</MenuItem>
              <MenuItem as={RouterLink} to="/dashboard/comparison">Comparison</MenuItem>
            </MenuList>
          </Menu>
          <Button as={RouterLink} to="/dashboard/risk-assessment" variant="ghost" mr={2}>
            Risk Assessment
          </Button>
          <Button as={RouterLink} to="/dashboard/analytics" variant="ghost" mr={2}>
            Analytics
          </Button>
        </Flex>
        <Flex>
          <Button as={RouterLink} to="/dashboard/chatbot" variant="ghost" mr={2}>
            Chatbot
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
              Tools
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/dashboard/version-control">Version Control</MenuItem>
              <MenuItem as={RouterLink} to="/dashboard/collaborative-editing">Collaborative Editing</MenuItem>
              <MenuItem as={RouterLink} to="/dashboard/ai-suggestions">AI Suggestions</MenuItem>
              <MenuItem as={RouterLink} to="/dashboard/automated-review">Automated Review</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;