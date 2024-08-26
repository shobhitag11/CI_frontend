// src/components/AISuggestions.js
import React, { useState } from 'react';
import { Box, Heading, Textarea, Button, VStack, Text, useToast } from '@chakra-ui/react';

const AISuggestions = () => {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const toast = useToast();

  const generateSuggestions = () => {
    // Simulating AI suggestions
    const aiSuggestions = [
      "Consider adding a force majeure clause to address unforeseen circumstances.",
      "The payment terms could be more specific. Consider defining exact payment dates.",
      "You may want to include a confidentiality clause to protect sensitive information.",
    ];
    setSuggestions(aiSuggestions);
    toast({
      title: "Suggestions generated",
      description: "AI has analyzed your contract and provided suggestions.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading mb={6}>AI-Powered Contract Suggestions</Heading>
      <VStack spacing={4} align="stretch">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          height="200px"
          placeholder="Enter your contract text here..."
        />
        <Button onClick={generateSuggestions} colorScheme="blue">
          Generate AI Suggestions
        </Button>
        {suggestions.length > 0 && (
          <Box borderWidth={1} borderRadius="md" p={4}>
            <Text fontWeight="bold" mb={2}>AI Suggestions:</Text>
            {suggestions.map((suggestion, index) => (
              <Text key={index} fontSize="sm" mb={2}>• {suggestion}</Text>
            ))}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default AISuggestions;