// src/components/SentimentAnalysis.js
import React, { useState } from 'react';
import { Box, Textarea, Button, Text, Progress, Heading, VStack } from '@chakra-ui/react';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const analyzeSentiment = () => {
    // Simulating API call to sentiment analysis service
    setTimeout(() => {
      const score = Math.random();
      let result;
      if (score > 0.6) result = 'Positive';
      else if (score > 0.4) result = 'Neutral';
      else result = 'Negative';
      setSentiment({ score: score.toFixed(2), result });
    }, 1000);
  };

  return (
    <Box>
      <Heading mb={4}>Negotiation Sentiment Analysis</Heading>
      <VStack spacing={4} align="stretch">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste negotiation communication here..."
          height="200px"
        />
        <Button onClick={analyzeSentiment} colorScheme="blue">Analyze Sentiment</Button>
        {sentiment && (
          <Box>
            <Text>Sentiment: {sentiment.result}</Text>
            <Progress value={sentiment.score * 100} colorScheme={sentiment.result === 'Positive' ? 'green' : sentiment.result === 'Negative' ? 'red' : 'yellow'} />
            <Text>Score: {sentiment.score}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SentimentAnalysis;