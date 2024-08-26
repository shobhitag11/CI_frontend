// src/components/RiskAssessment.js
import React, { useState } from 'react';
import { Box, Heading, SimpleGrid, Select, Table, Thead, Tbody, Tr, Th, Td, Progress } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const RiskAssessment = () => {
  const [selectedRiskType, setSelectedRiskType] = useState('all');

  const riskData = [
    { id: 1, contract: 'Service Agreement A', type: 'Financial', level: 'High', score: 80, impact: 'Significant', probability: 'Likely' },
    { id: 2, contract: 'NDA B', type: 'Legal', level: 'Low', score: 20, impact: 'Minor', probability: 'Unlikely' },
    { id: 3, contract: 'Employment Contract C', type: 'Compliance', level: 'Medium', score: 50, impact: 'Moderate', probability: 'Possible' },
    { id: 4, contract: 'License Agreement D', type: 'Operational', level: 'High', score: 75, impact: 'Major', probability: 'Likely' },
    { id: 5, contract: 'Partnership Agreement E', type: 'Strategic', level: 'Medium', score: 60, impact: 'Moderate', probability: 'Possible' },
  ];

  const filteredRiskData = selectedRiskType === 'all' 
    ? riskData 
    : riskData.filter(risk => risk.type === selectedRiskType);

  const riskDistribution = [
    { name: 'Financial', value: 35 },
    { name: 'Legal', value: 25 },
    { name: 'Compliance', value: 15 },
    { name: 'Operational', value: 15 },
    { name: 'Strategic', value: 10 },
  ];

  const riskLevels = [
    { name: 'High', value: 30 },
    { name: 'Medium', value: 45 },
    { name: 'Low', value: 25 },
  ];

  return (
    <Box>
      <Heading mb={6}>Risk Assessment</Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
        <Box>
          <Heading size="md" mb={4}>Risk Distribution by Type</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={riskDistribution} fill="#8884d8" label>
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box>
          <Heading size="md" mb={4}>Risk Levels</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskLevels}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
      
      <Box mb={6}>
        <Select value={selectedRiskType} onChange={(e) => setSelectedRiskType(e.target.value)} mb={4}>
          <option value="all">All Risk Types</option>
          <option value="Financial">Financial</option>
          <option value="Legal">Legal</option>
          <option value="Compliance">Compliance</option>
          <option value="Operational">Operational</option>
          <option value="Strategic">Strategic</option>
        </Select>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Contract</Th>
              <Th>Risk Type</Th>
              <Th>Risk Level</Th>
              <Th>Risk Score</Th>
              <Th>Impact</Th>
              <Th>Probability</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredRiskData.map((risk) => (
              <Tr key={risk.id}>
                <Td>{risk.contract}</Td>
                <Td>{risk.type}</Td>
                <Td>{risk.level}</Td>
                <Td>
                  <Progress value={risk.score} colorScheme={risk.score > 70 ? "red" : risk.score > 40 ? "yellow" : "green"} />
                </Td>
                <Td>{risk.impact}</Td>
                <Td>{risk.probability}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default RiskAssessment;