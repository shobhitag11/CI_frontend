// src/components/AutomatedReview.js
import React, { useState } from 'react';
import { Box, Heading, VStack, Button, Textarea, Text, Progress } from '@chakra-ui/react';

const AutomatedReview = () => {
  const [contract, setContract] = useState('');
  const [review, setReview] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleReview = () => {
    setIsReviewing(true);
    // Simulating API call for automated review
    setTimeout(() => {
      setReview({
        score: 85,
        issues: [
          'Unclear termination clause in Section 3.2',
          'Missing data protection provisions',
          'Ambiguous payment terms in Appendix A'
        ]
      });
      setIsReviewing(false);
    }, 3000);
  };

  return (
    <Box>
      <Heading mb={6}>Automated Contract Review</Heading>
      <VStack spacing={4} align="stretch">
        <Textarea
          value={contract}
          onChange={(e) => setContract(e.target.value)}
          placeholder="Paste your contract text here..."
          height="200px"
        />
        <Button onClick={handleReview} colorScheme="blue" isLoading={isReviewing}>
          Review Contract
        </Button>
        {isReviewing && <Progress size="xs" isIndeterminate />}
        {review && (
          <Box mt={4} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold">Review Score: {review.score}/100</Text>
            <Text mt={2}>Issues Identified:</Text>
            <VStack align="start" mt={2}>
              {review.issues.map((issue, index) => (
                <Text key={index}>• {issue}</Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default AutomatedReview;