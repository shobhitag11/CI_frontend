// src/components/AdvancedSearch.js
import React, { useState } from 'react';
import { Box, Input, Button, Text, VStack, Heading, List, ListItem } from '@chakra-ui/react';

const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const performSearch = () => {
    // Simulating search results
    setTimeout(() => {
      const searchResults = [
        { id: 1, title: "Service Agreement with XYZ Corp", relevance: "90%" },
        { id: 2, title: "Non-Disclosure Agreement for Project Alpha", relevance: "85%" },
        { id: 3, title: "Employment Contract for John Doe", relevance: "75%" },
      ];
      setResults(searchResults);
    }, 1000);
  };

  return (
    <Box>
      <Heading mb={4}>Advanced Contract Search</Heading>
      <VStack spacing={4} align="stretch">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query in natural language..."
        />
        <Button onClick={performSearch} colorScheme="blue">Search</Button>
        {results.length > 0 && (
          <List spacing={3}>
            {results.map(result => (
              <ListItem key={result.id} p={2} borderWidth={1} borderRadius="md">
                <Text fontWeight="bold">{result.title}</Text>
                <Text>Relevance: {result.relevance}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Box>
  );
};

export default AdvancedSearch;