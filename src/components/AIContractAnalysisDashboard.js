// src/components/AIContractAnalysisDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText,
  StatArrow, Text, VStack, HStack, Progress, Select, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIContractAnalysisDashboard = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState('');

  const contractOptions = [
    { id: 1, name: 'Service Agreement - XYZ Corp' },
    { id: 2, name: 'Software License - ABC Inc' },
    { id: 3, name: 'Employment Contract - John Doe' },
  ];

  useEffect(() => {
    if (selectedContract) {
      // Simulating API call to get AI analysis
      setTimeout(() => {
        setAnalysisData({
          riskScore: 65,
          complianceScore: 82,
          financialImpact: 120000,
          keyTerms: ['Indemnification', 'Limitation of Liability', 'Termination'],
          performanceHistory: [
            { month: 'Jan', value: 4000 },
            { month: 'Feb', value: 3000 },
            { month: 'Mar', value: 5000 },
            { month: 'Apr', value: 4500 },
            { month: 'May', value: 6000 },
            { month: 'Jun', value: 5500 },
          ],
        });
      }, 1000);
    }
  }, [selectedContract]);

  const handleContractSelect = (e) => {
    setSelectedContract(contractOptions.find(c => c.id === parseInt(e.target.value)));
  };

  const generateAIInsight = () => {
    // Simulating AI generating an insight
    setAiInsight("Based on the analysis of this contract and historical data, there's a 78% chance of on-time delivery. However, the current terms leave room for potential cost overruns. Consider renegotiating the payment structure to mitigate this risk.");
    setIsModalOpen(true);
  };

  return (
    <Box>
      <Heading mb={6}>AI-Powered Contract Analysis Dashboard</Heading>
      <Select placeholder="Select a contract" onChange={handleContractSelect} mb={6}>
        {contractOptions.map(contract => (
          <option key={contract.id} value={contract.id}>{contract.name}</option>
        ))}
      </Select>
      
      {analysisData && (
        <VStack spacing={6} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Stat>
              <StatLabel>Risk Score</StatLabel>
              <StatNumber>{analysisData.riskScore}/100</StatNumber>
              <Progress value={analysisData.riskScore} colorScheme={analysisData.riskScore > 70 ? "red" : analysisData.riskScore > 30 ? "yellow" : "green"} />
            </Stat>
            <Stat>
              <StatLabel>Compliance Score</StatLabel>
              <StatNumber>{analysisData.complianceScore}/100</StatNumber>
              <Progress value={analysisData.complianceScore} colorScheme={analysisData.complianceScore > 70 ? "green" : analysisData.complianceScore > 30 ? "yellow" : "red"} />
            </Stat>
            <Stat>
              <StatLabel>Financial Impact</StatLabel>
              <StatNumber>${analysisData.financialImpact.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </SimpleGrid>
          
          <Box>
            <Heading size="md" mb={2}>Key Terms Identified</Heading>
            <HStack>
              {analysisData.keyTerms.map((term, index) => (
                <Button key={index} size="sm" colorScheme="blue" variant="outline">
                  {term}
                </Button>
              ))}
            </HStack>
          </Box>
          
          <Box height="300px">
            <Heading size="md" mb={2}>Performance History</Heading>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analysisData.performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          
          <Button colorScheme="green" onClick={generateAIInsight}>Generate AI Insight</Button>
        </VStack>
      )}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI-Generated Insight</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{aiInsight}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AIContractAnalysisDashboard;