// // src/components/Dashboard.js
// import React from 'react';
// import { Box, Button, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Heading } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleNewContract = () => {
//     navigate('/creation'); // Assuming '/creation' is the route for contract creation
//   };

//   return (
//     <Box>
//       <Heading mb={6}>Dashboard</Heading>
//       <Button colorScheme="blue" mb={6} onClick={handleNewContract}>New Contract</Button>
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//         <Stat>
//           <StatLabel>Total Contracts</StatLabel>
//           <StatNumber>45</StatNumber>
//           <StatHelpText>
//             <StatArrow type="increase" />
//             23.36%
//           </StatHelpText>
//         </Stat>
//         <Stat>
//           <StatLabel>Active Contracts</StatLabel>
//           <StatNumber>32</StatNumber>
//           <StatHelpText>
//             <StatArrow type="increase" />
//             14.05%
//           </StatHelpText>
//         </Stat>
//         <Stat>
//           <StatLabel>Contracts Expiring Soon</StatLabel>
//           <StatNumber>5</StatNumber>
//           <StatHelpText>
//             <StatArrow type="decrease" />
//             9.05%
//           </StatHelpText>
//         </Stat>
//         <Stat>
//           <StatLabel>Contract Value</StatLabel>
//           <StatNumber>$234,500</StatNumber>
//           <StatHelpText>
//             <StatArrow type="increase" />
//             7.38%
//           </StatHelpText>
//         </Stat>
//       </SimpleGrid>
//       {/* Add more dashboard content here */}
//     </Box>
//   );
// };

// export default Dashboard;
















// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Box, Button, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, 
  Heading, Input, VStack, HStack, Text, Progress, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton,
  Tooltip, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle, FiClock, FiSearch, FiFilter, FiMoreVertical, FiDownload, FiPieChart } from 'react-icons/fi';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isOpen: isReviewOpen, onOpen: onReviewOpen, onClose: onReviewClose } = useDisclosure();
  const { isOpen: isExpiryOpen, onOpen: onExpiryOpen, onClose: onExpiryClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch contracts
    const fetchContracts = async () => {
      // In a real app, this would be an API call
      const mockContracts = [
        { id: 1, name: 'Service Agreement A', type: 'Service', value: 50000, status: 'Active', expiryDate: '2023-12-31' },
        { id: 2, name: 'NDA with Company B', type: 'NDA', value: 0, status: 'Active', expiryDate: '2024-06-30' },
        { id: 3, name: 'License Agreement C', type: 'License', value: 75000, status: 'Expiring Soon', expiryDate: '2023-08-15' },
        { id: 4, name: 'Employment Contract D', type: 'Employment', value: 60000, status: 'Active', expiryDate: '2025-01-01' },
        { id: 5, name: 'Vendor Agreement E', type: 'Vendor', value: 100000, status: 'Review Pending', expiryDate: '2023-11-30' },
      ];
      setContracts(mockContracts);
      setFilteredContracts(mockContracts);
    };
    fetchContracts();
  }, []);

  const handleNewContract = () => {
    navigate('/creation');
  };

  const handleSearch = () => {
    const filtered = contracts.filter(contract => 
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContracts(filtered);
  };

  const handleExport = () => {
    // Simulated export functionality
    alert('Exporting contracts...');
    // In a real app, this would trigger a download of a CSV or Excel file
  };

  const getContractTypeData = () => {
    const typeCounts = contracts.reduce((acc, contract) => {
      acc[contract.type] = (acc[contract.type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(typeCounts),
      datasets: [{
        data: Object.values(typeCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }]
    };
  };

  return (
    <Box>
      <Heading mb={6}>Contract Dashboard</Heading>
      <HStack mb={6} spacing={4}>
        <Button colorScheme="blue" onClick={handleNewContract}>New Contract</Button>
        <Input 
          placeholder="Search contracts..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="300px"
        />
        <Button leftIcon={<FiSearch />} onClick={handleSearch}>Search</Button>
        <Menu>
          <MenuButton as={Button} rightIcon={<FiFilter />}>
            Filter
          </MenuButton>
          <MenuList>
            <MenuItem>Active Contracts</MenuItem>
            <MenuItem>Expiring Contracts</MenuItem>
            <MenuItem>High Value Contracts</MenuItem>
          </MenuList>
        </Menu>
        <Button leftIcon={<FiDownload />} onClick={handleExport}>Export</Button>
      </HStack>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Stat>
          <StatLabel>Total Contracts</StatLabel>
          <StatNumber>{contracts.length}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Active Contracts</StatLabel>
          <StatNumber>{contracts.filter(c => c.status === 'Active').length}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            14.05%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Contracts Expiring Soon</StatLabel>
          <StatNumber>{contracts.filter(c => c.status === 'Expiring Soon').length}</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Contract Value</StatLabel>
          <StatNumber>${contracts.reduce((sum, contract) => sum + contract.value, 0).toLocaleString()}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            7.38%
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
        <Box borderWidth={1} borderRadius="lg" p={4}>
          <Heading size="md" mb={4}>Contract Types</Heading>
          <Box height="300px">
            <Pie data={getContractTypeData()} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>
        <Box borderWidth={1} borderRadius="lg" p={4}>
          <Heading size="md" mb={4}>Recent Activity</Heading>
          <VStack align="stretch" spacing={3}>
            <Text>New contract created: Service Agreement F</Text>
            <Text>Contract amended: NDA with Company B</Text>
            <Text>Contract expiring soon: License Agreement C</Text>
            <Text>Review requested: Vendor Agreement E</Text>
          </VStack>
        </Box>
      </SimpleGrid>

      <Box borderWidth={1} borderRadius="lg" p={4} mb={8}>
        <Heading size="md" mb={4}>Contract Overview</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Value</Th>
              <Th>Status</Th>
              <Th>Expiry Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredContracts.map(contract => (
              <Tr key={contract.id}>
                <Td>{contract.name}</Td>
                <Td>{contract.type}</Td>
                <Td>${contract.value.toLocaleString()}</Td>
                <Td>
                  <Badge colorScheme={
                    contract.status === 'Active' ? 'green' : 
                    contract.status === 'Expiring Soon' ? 'yellow' : 
                    'red'
                  }>
                    {contract.status}
                  </Badge>
                </Td>
                <Td>{contract.expiryDate}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Tooltip label="View Details">
                      <IconButton icon={<FiPieChart />} size="sm" onClick={() => navigate(`/contract/${contract.id}`)} />
                    </Tooltip>
                    {contract.status === 'Review Pending' && (
                      <Tooltip label="Review Required">
                        <IconButton icon={<FiAlertCircle />} size="sm" colorScheme="red" onClick={onReviewOpen} />
                      </Tooltip>
                    )}
                    {contract.status === 'Expiring Soon' && (
                      <Tooltip label="Expiring Soon">
                        <IconButton icon={<FiClock />} size="sm" colorScheme="yellow" onClick={onExpiryOpen} />
                      </Tooltip>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isReviewOpen} onClose={onReviewClose} size="xl">
        <ModalOverlay />
        <ModalContent maxHeight="80vh">
          <ModalHeader>Contracts Pending Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            {/* Add content for contracts pending review */}
            <VStack align="stretch" spacing={4}>
              {[1, 2, 3, 4, 5].map(i => (
                <Box key={i} p={4} borderWidth={1} borderRadius="md">
                  <Text fontWeight="bold">Contract {i}</Text>
                  <Text>Review required by: {new Date().toLocaleDateString()}</Text>
                  <Progress value={80} size="sm" colorScheme="red" mt={2} />
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onReviewClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isExpiryOpen} onClose={onExpiryClose} size="xl">
        <ModalOverlay />
        <ModalContent maxHeight="80vh">
          <ModalHeader>Contracts Expiring Soon</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            {/* Add content for contracts expiring soon */}
            <VStack align="stretch" spacing={4}>
              {[1, 2, 3, 4, 5].map(i => (
                <Box key={i} p={4} borderWidth={1} borderRadius="md">
                  <Text fontWeight="bold">Contract {i}</Text>
                  <Text>Expiry Date: {new Date().toLocaleDateString()}</Text>
                  <Progress value={90} size="sm" colorScheme="yellow" mt={2} />
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onExpiryClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;