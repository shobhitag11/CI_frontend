// src/components/AIContractAnalysis.js
import React, { useState } from 'react';
import { Box, Heading, Textarea, Button, VStack, Text, Progress, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';

const AIContractAnalysis = () => {
  const [contractText, setContractText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const performAnalysis = () => {
    setIsAnalyzing(true);
    // Simulating API call to AI service
    setTimeout(() => {
      setAnalysis({
        summary: "This is a service agreement between Company A and Company B for software development services.",
        keyTerms: ["Payment terms: Net 30", "Duration: 12 months", "Intellectual Property: Work for hire"],
        riskScore: 35,
        complexityScore: 65,
        suggestedImprovements: [
          "Consider adding a more detailed termination clause",
          "Clarify the dispute resolution process",
          "Specify the acceptance criteria for deliverables"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <Box>
      <Heading mb={6}>AI-Powered Contract Analysis</Heading>
      <VStack spacing={4} align="stretch">
        <Textarea
          value={contractText}
          onChange={(e) => setContractText(e.target.value)}
          placeholder="Paste your contract text here..."
          height="200px"
        />
        <Button onClick={performAnalysis} colorScheme="blue" isLoading={isAnalyzing}>
          Analyze Contract
        </Button>
        {isAnalyzing && <Progress size="xs" isIndeterminate />}
        {analysis && (
          <Box borderWidth={1} borderRadius="lg" p={4}>
            <Heading size="md" mb={2}>Analysis Results</Heading>
            <Text fontWeight="bold">Summary:</Text>
            <Text mb={2}>{analysis.summary}</Text>
            <Text fontWeight="bold">Key Terms:</Text>
            <VStack align="start" mb={2}>
              {analysis.keyTerms.map((term, index) => (
                <Text key={index}>{term}</Text>
              ))}
            </VStack>
            <SimpleGrid columns={2} spacing={4} mb={4}>
              <Stat>
                <StatLabel>Risk Score</StatLabel>
                <StatNumber>{analysis.riskScore}/100</StatNumber>
                <StatHelpText>{analysis.riskScore < 50 ? "Low Risk" : "High Risk"}</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Complexity Score</StatLabel>
                <StatNumber>{analysis.complexityScore}/100</StatNumber>
                <StatHelpText>{analysis.complexityScore < 50 ? "Low Complexity" : "High Complexity"}</StatHelpText>
              </Stat>
            </SimpleGrid>
            <Text fontWeight="bold">Suggested Improvements:</Text>
            <VStack align="start">
              {analysis.suggestedImprovements.map((suggestion, index) => (
                <Text key={index}>• {suggestion}</Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default AIContractAnalysis;