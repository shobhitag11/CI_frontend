// src/components/QuickActionDashboard.js
import React, { useState } from 'react';
import { Box, SimpleGrid, Button, VStack, Text, Heading, useColorModeValue, Input, List, ListItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { FiPlus, FiSearch, FiEdit, FiClock } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import ContractCreation from "./ContractCreation";

const ActionButton = ({ icon, label, onClick }) => (
  <Button
    leftIcon={icon}
    onClick={onClick}
    colorScheme="blue"
    variant="outline"
    size="lg"
    width="full"
  >
    {label}
  </Button>
);

const RecentContract = ({ name, date, to }) => (
  <Button
    as={RouterLink}
    to={to}
    variant="ghost"
    justifyContent="flex-start"
    width="full"
    py={2}
  >
    <VStack align="start" spacing={0}>
      <Text fontWeight="bold">{name}</Text>
      <Text fontSize="sm" color="gray.500">Last edited: {date}</Text>
    </VStack>
  </Button>
);


const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const mockContracts = [
    { id: 1, name: 'Service Agreement - ABC Corp', date: '2023-06-20' },
    { id: 2, name: 'Non-Disclosure Agreement - XYZ Inc', date: '2023-06-18' },
    { id: 3, name: 'Employment Contract - John Doe', date: '2023-06-15' },
    { id: 4, name: 'Software License Agreement - Tech Co', date: '2023-06-12' },
    { id: 5, name: 'Office Lease Agreement - Downtown Property', date: '2023-06-10' },
    { id: 6, name: 'Consulting Agreement - Jane Smith', date: '2023-06-08' },
    { id: 7, name: 'Partnership Agreement - NewCo Ventures', date: '2023-06-05' },
    { id: 8, name: 'Sales Contract - Big Customer LLC', date: '2023-06-03' },
    { id: 9, name: 'Maintenance Agreement - Building Services Inc', date: '2023-06-01' },
    { id: 10, name: 'Intellectual Property License - Innovate Corp', date: '2023-05-30' },
    { id: 11, name: 'Freelance Contract - Designer Pro', date: '2023-05-28' },
    { id: 12, name: 'Supplier Agreement - Parts Unlimited', date: '2023-05-25' },
  ];

  const handleSearch = () => {
    const results = mockContracts.filter(contract => 
      contract.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search Contracts</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            placeholder="Enter contract name" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Button onClick={handleSearch} colorScheme="blue" mb={4}>Search</Button>
          <List spacing={3}>
            {searchResults.map(result => (
              <ListItem key={result.id}>
                <Text fontWeight="bold">{result.name}</Text>
                <Text fontSize="sm">Last edited: {result.date}</Text>
              </ListItem>
            ))}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// const newContractOpen = () => {
//   ContractCreation()
// };

const ReviewPendingModal = ({ isOpen, onClose }) => {
  const pendingContracts = [
    { id: 1, name: 'Service Agreement - XYZ Corp', dueDate: '2023-07-01', assignedTo: 'Alice Johnson' },
    { id: 2, name: 'NDA - ABC Inc', dueDate: '2023-07-03', assignedTo: 'Bob Smith' },
    { id: 3, name: 'Lease Agreement - Office Space', dueDate: '2023-07-05', assignedTo: 'Charlie Brown' },
    { id: 4, name: 'Employment Contract - Jane Doe', dueDate: '2023-07-07', assignedTo: 'David Wilson' },
    { id: 5, name: 'Software License - Tech Giants', dueDate: '2023-07-09', assignedTo: 'Eva Martinez' },
    { id: 6, name: 'Partnership Agreement - NewCo', dueDate: '2023-07-11', assignedTo: 'Frank Thomas' },
    { id: 7, name: 'Supplier Contract - Acme Supplies', dueDate: '2023-07-13', assignedTo: 'Grace Lee' },
    { id: 8, name: 'Maintenance Agreement - BuildWell Inc', dueDate: '2023-07-15', assignedTo: 'Henry Ford' },
    { id: 9, name: 'Consulting Agreement - Expert Advisors', dueDate: '2023-07-17', assignedTo: 'Ivy Chen' },
    { id: 10, name: 'Distribution Agreement - Global Distributors', dueDate: '2023-07-19', assignedTo: 'Jack Robinson' },
    { id: 11, name: 'Freelance Contract - Creative Designs', dueDate: '2023-07-21', assignedTo: 'Kate Hudson' },
    { id: 12, name: 'Intellectual Property License - Innovate Ltd', dueDate: '2023-07-23', assignedTo: 'Liam Nelson' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pending Reviews</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            {pendingContracts.map(contract => (
              <ListItem key={contract.id}>
                <Text fontWeight="bold">{contract.name}</Text>
                <Text fontSize="sm">Due date: {contract.dueDate}</Text>
                <Text fontSize="sm">Assigned to: {contract.assignedTo}</Text>
              </ListItem>
            ))}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ExpiringSoonModal = ({ isOpen, onClose }) => {
  const expiringContracts = [
    { id: 1, name: 'Vendor Agreement - Supplier A', expiryDate: '2023-07-15', value: '$50,000' },
    { id: 2, name: 'Employment Contract - John Doe', expiryDate: '2023-07-20', value: 'N/A' },
    { id: 3, name: 'Software License - Tool X', expiryDate: '2023-07-25', value: '$10,000/year' },
    { id: 4, name: 'Office Lease - Downtown', expiryDate: '2023-07-30', value: '$8,000/month' },
    { id: 5, name: 'Service Agreement - Maintenance Co', expiryDate: '2023-08-05', value: '$25,000' },
    { id: 6, name: 'Distribution Contract - Region East', expiryDate: '2023-08-10', value: 'Variable' },
    { id: 7, name: 'Consulting Agreement - Expert Group', expiryDate: '2023-08-15', value: '$15,000' },
    { id: 8, name: 'Partnership Deal - StartUp Inc', expiryDate: '2023-08-20', value: 'Equity-based' },
    { id: 9, name: 'Licensing Agreement - Patent 123', expiryDate: '2023-08-25', value: '5% royalty' },
    { id: 10, name: 'Supply Chain Contract - Logistics Pro', expiryDate: '2023-08-30', value: '$100,000' },
    { id: 11, name: 'Marketing Services - AdGenius', expiryDate: '2023-09-05', value: '$30,000' },
    { id: 12, name: 'IT Support Contract - TechHelp', expiryDate: '2023-09-10', value: '$5,000/month' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contracts Expiring Soon</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            {expiringContracts.map(contract => (
              <ListItem key={contract.id}>
                <Text fontWeight="bold">{contract.name}</Text>
                <Text fontSize="sm">Expiry date: {contract.expiryDate}</Text>
                <Text fontSize="sm">Contract value: {contract.value}</Text>
              </ListItem>
            ))}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const QuickActionDashboard = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  const { isOpen: isReviewOpen, onOpen: onReviewOpen, onClose: onReviewClose } = useDisclosure();
  const { isOpen: isExpiringOpen, onOpen: onExpiringOpen, onClose: onExpiringClose } = useDisclosure();

  return (
    <Box>
      <Heading size="lg" mb={6}>Quick Actions</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box bg={bgColor} p={6} borderRadius="md" shadow="md">
          <VStack spacing={4} align="stretch">
            <ActionButton icon={<FiPlus />} label="New Contract" onClick={() => {}} />
            <ActionButton icon={<FiSearch />} label="Search Contracts" onClick={onSearchOpen} />
            <ActionButton icon={<FiEdit />} label="Review Pending" onClick={onReviewOpen} />
            <ActionButton icon={<FiClock />} label="Expiring Soon" onClick={onExpiringOpen} />
          </VStack>
        </Box>
        <Box bg={bgColor} p={6} borderRadius="md" shadow="md">
          <Heading size="md" mb={4}>Recent Contracts</Heading>
          <VStack spacing={2} align="stretch">
            <RecentContract name="Service Agreement - ABC Corp" date="2023-06-15" to="/dashboard/contract/1" />
            <RecentContract name="NDA - XYZ Inc" date="2023-06-14" to="/dashboard/contract/2" />
            <RecentContract name="Lease Agreement - Office Space" date="2023-06-13" to="/dashboard/contract/3" />
            <RecentContract name="Employment Contract - John Doe" date="2023-06-12" to="/dashboard/contract/4" />
          </VStack>
        </Box>
      </SimpleGrid>

      <SearchModal isOpen={isSearchOpen} onClose={onSearchClose} />
      <ReviewPendingModal isOpen={isReviewOpen} onClose={onReviewClose} />
      <ExpiringSoonModal isOpen={isExpiringOpen} onClose={onExpiringClose} />
    </Box>
  );
};

export default QuickActionDashboard;