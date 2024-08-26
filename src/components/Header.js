// src/components/Header.js
import React from 'react';
import { Box, Flex, Text, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, HStack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Logo = () => (
  <Box
    width="40px"
    height="40px"
    borderRadius="50%"
    bg="blue.500"
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="white"
    fontWeight="bold"
    fontSize="20px"
    mr={4}
  >
    CI
  </Box>
);

const NavItem = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button
      as={RouterLink}
      to={to}
      variant="ghost"
      color={isActive ? "blue.500" : "gray.600"}
      fontWeight={isActive ? "bold" : "normal"}
    >
      {children}
    </Button>
  );
};

const Header = ({ user, onLogout }) => {
  return (
    <Flex as="header" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="white" color="gray.600" boxShadow="sm">
      <Flex align="center" mr={5}>
        <Logo />
        <Text fontSize="xl" fontWeight="bold">Contract Intelligence</Text>
      </Flex>

      {user ? (
        <>
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <NavItem to="/dashboard">Dashboard</NavItem>
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
            <NavItem to="/dashboard/risk-assessment">Risk Assessment</NavItem>
            <NavItem to="/dashboard/analytics">Analytics</NavItem>
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
          </HStack>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" name={user.name} src={user.avatar} mr={2} />
              {user.name}
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <Button as={RouterLink} to="/login" colorScheme="blue">
          Login
        </Button>
      )}
    </Flex>
  );
};

export default Header;