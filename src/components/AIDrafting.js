// src/components/AIDrafting.js
import React, { useState } from 'react';
import { Box, Textarea, Button, Text, VStack, Heading, useToast } from '@chakra-ui/react';

const AIDrafting = () => {
  const [contractText, setContractText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const toast = useToast();

  const generateSuggestions = () => {
    // Simulating AI suggestions
    setTimeout(() => {
      const newSuggestions = [
        "Consider adding a force majeure clause to account for unforeseen circumstances.",
        "The payment terms could be more specific. Suggest defining exact payment dates.",
        "The confidentiality clause could be strengthened by specifying the duration of the obligation.",
      ];
      setSuggestions(newSuggestions);
    }, 1000);
  };

  const applySuggestion = (suggestion) => {
    setContractText(contractText + '\n\n' + suggestion);
    toast({
      title: "Suggestion applied",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading mb={4}>AI-Assisted Contract Drafting</Heading>
      <VStack spacing={4} align="stretch">
        <Textarea
          value={contractText}
          onChange={(e) => setContractText(e.target.value)}
          placeholder="Start drafting your contract here..."
          height="200px"
        />
        <Button onClick={generateSuggestions} colorScheme="blue">Generate AI Suggestions</Button>
        {suggestions.map((suggestion, index) => (
          <Box key={index} p={2} borderWidth={1} borderRadius="md">
            <Text mb={2}>{suggestion}</Text>
            <Button size="sm" onClick={() => applySuggestion(suggestion)}>Apply Suggestion</Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AIDrafting;