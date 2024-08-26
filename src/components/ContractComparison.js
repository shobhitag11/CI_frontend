// src/components/ContractComparison.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Select, Table, Thead, Tbody, Tr, Th, Td, Text, Textarea, Button } from '@chakra-ui/react';

const ContractComparison = () => {
  const [contractType, setContractType] = useState('');
  const [contract1, setContract1] = useState('');
  const [contract2, setContract2] = useState('');

  const contractTypes = ['Service Agreement', 'NDA', 'Employment Contract', 'License Agreement'];

  const contracts = {
    'Service Agreement': ['SA001', 'SA002', 'SA003', 'SA004'],
    'NDA': ['NDA001', 'NDA002', 'NDA003', 'NDA004'],
    'Employment Contract': ['EC001', 'EC002', 'EC003', 'EC004'],
    'License Agreement': ['LA001', 'LA002', 'LA003', 'LA004'],
  };

  const comparisonData = [
    { feature: 'Duration', contract1: '2 years', contract2: '3 years' },
    { feature: 'Payment Terms', contract1: 'Net 30', contract2: 'Net 45' },
    { feature: 'Termination Clause', contract1: '30 days notice', contract2: '60 days notice' },
    { feature: 'Liability Cap', contract1: '$1,000,000', contract2: '$2,000,000' },
  ];

  return (
    <Box>
      <Heading mb={6}>Contract Comparison</Heading>
      <Select placeholder="Select contract type" value={contractType} onChange={(e) => setContractType(e.target.value)} mb={4}>
        {contractTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </Select>
      <Select placeholder="Select first contract" value={contract1} onChange={(e) => setContract1(e.target.value)} mb={4}>
        {contractType && contracts[contractType].map((contract) => (
          <option key={contract} value={contract}>{contract}</option>
        ))}
      </Select>
      <Select placeholder="Select second contract" value={contract2} onChange={(e) => setContract2(e.target.value)} mb={4}>
        {contractType && contracts[contractType]
          .filter(contract => contract !== contract1)
          .map((contract) => (
            <option key={contract} value={contract}>{contract}</option>
          ))}
      </Select>
      {contract1 && contract2 && (
        <Table variant="simple" mb={8}>
          <Thead>
            <Tr>
              <Th>Feature</Th>
              <Th>{contract1}</Th>
              <Th>{contract2}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comparisonData.map((row, index) => (
              <Tr key={index}>
                <Td>{row.feature}</Td>
                <Td>{row.contract1}</Td>
                <Td>{row.contract2}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ContractComparison