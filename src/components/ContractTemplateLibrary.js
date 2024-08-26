// src/components/ContractTemplateLibrary.js
import React from 'react';
import { Box, SimpleGrid, VStack, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { FiFileText, FiDownload } from 'react-icons/fi';

const TemplateCard = ({ name, description, lastUpdated }) => {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack align="start" spacing={3}>
        <Heading size="md">{name}</Heading>
        <Text>{description}</Text>
        <Text fontSize="sm" color="gray.500">Last updated: {lastUpdated}</Text>
        <Button leftIcon={<FiDownload />} colorScheme="blue" variant="outline">
          Use Template
        </Button>
      </VStack>
    </Box>
  );
};

const ContractTemplateLibrary = () => {
  const templates = [
    { name: "Service Agreement", description: "Standard template for service contracts", lastUpdated: "2023-06-01" },
    { name: "Non-Disclosure Agreement", description: "Confidentiality agreement for sensitive information", lastUpdated: "2023-05-15" },
    { name: "Employment Contract", description: "Template for full-time employment agreements", lastUpdated: "2023-05-20" },
    { name: "Software License Agreement", description: "For software licensing and usage terms", lastUpdated: "2023-06-10" },
    { name: "Lease Agreement", description: "Standard template for property leasing", lastUpdated: "2023-05-28" },
    { name: "Consulting Agreement", description: "For engaging consultants and freelancers", lastUpdated: "2023-06-05" },
  ];

  return (
    <Box>
      <Heading size="lg" mb={6}>Contract Template Library</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {templates.map((template, index) => (
          <TemplateCard key={index} {...template} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ContractTemplateLibrary;