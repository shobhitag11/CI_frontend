// src/components/AnalyticsDashboard.js
import React from 'react';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Heading, Text, VStack, HStack, Select } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ContractTypeDistribution = () => {
  const data = [
    { name: 'Service', value: 400 },
    { name: 'NDA', value: 300 },
    { name: 'Employment', value: 200 },
    { name: 'Lease', value: 100 },
    { name: 'License', value: 150 },
    { name: 'Partnership', value: 80 },
  ];

  return (
    <Box>
      <Heading size="md" mb={4}>Contract Type Distribution</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

const ContractValueTrend = () => {
  const data = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
  ];

  return (
    <Box>
      <Heading size="md" mb={4}>Contract Value Trend</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

const RiskAssessment = () => {
  const data = [
    { name: 'Low', value: 60 },
    { name: 'Medium', value: 30 },
    { name: 'High', value: 10 },
  ];

  return (
    <Box>
      <Heading size="md" mb={4}>Risk Assessment</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

const ContractDurationDistribution = () => {
  const data = [
    { duration: '0-3 months', count: 20 },
    { duration: '3-6 months', count: 40 },
    { duration: '6-12 months', count: 60 },
    { duration: '1-2 years', count: 30 },
    { duration: '2+ years', count: 15 },
  ];

  return (
    <Box>
      <Heading size="md" mb={4}>Contract Duration Distribution</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="duration" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

const ContractPerformance = () => {
  const data = [
    { name: 'Contract A', performance: 85, value: 50000 },
    { name: 'Contract B', performance: 92, value: 75000 },
    { name: 'Contract C', performance: 78, value: 30000 },
    { name: 'Contract D', performance: 95, value: 100000 },
    { name: 'Contract E', performance: 88, value: 60000 },
  ];

  return (
    <Box>
      <Heading size="md" mb={4}>Contract Performance vs Value</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis type="number" dataKey="performance" name="Performance" unit="%" />
          <YAxis type="number" dataKey="value" name="Value" unit="$" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Contracts" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

const AnalyticsDashboard = () => {
  return (
    <Box>
      <Heading size="lg" mb={6}>Contract Analytics Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Stat>
          <StatLabel>Total Contracts</StatLabel>
          <StatNumber>1,230</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Active Contracts</StatLabel>
          <StatNumber>948</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            14.05%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Contracts Expiring (30 days)</StatLabel>
          <StatNumber>52</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Avg. Contract Value</StatLabel>
          <StatNumber>$54,750</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            7.38%
          </StatHelpText>
        </Stat>
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
        <ContractTypeDistribution />
        <ContractValueTrend />
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
        <RiskAssessment />
        <ContractDurationDistribution />
      </SimpleGrid>
      
      <ContractPerformance />
      
      <Box mt={8}>
        <Heading size="md" mb={4}>Top Performing Contracts</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {['Contract X', 'Contract Y', 'Contract Z'].map((contract, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold">{contract}</Text>
              <Text>Value: ${(80000 + index * 10000).toLocaleString()}</Text>
              <Text>Performance: {95 - index}%</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;