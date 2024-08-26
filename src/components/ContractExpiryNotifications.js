import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, VStack, Heading, Text, Button, Badge, HStack, 
  useColorModeValue, Modal, ModalOverlay, ModalContent, 
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Input, useToast
} from '@chakra-ui/react';
import { FiBell, FiMail, FiFile } from 'react-icons/fi';

const ExpiryNotification = ({ contractName, daysUntilExpiry, status, contractType, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.700');
  const statusColor = status === 'urgent' ? 'red' : status === 'upcoming' ? 'yellow' : 'green';

  const handleSetReminder = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/set-reminder', {
        email,
        contractName,
        daysUntilExpiry
      });
      toast({
        title: "Reminder Set",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to set reminder",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg={bgColor} width="100%">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Heading size="sm">{contractName}</Heading>
          <Text fontSize="sm">Expires in {daysUntilExpiry} days</Text>
          <Badge colorScheme={statusColor}>{status}</Badge>
        </VStack>
        <VStack align="end" spacing={1}>
          <Text fontSize="sm">{contractType}</Text>
          <Text fontSize="sm">Value: ${value}</Text>
        </VStack>
      </HStack>
      <Button leftIcon={<FiBell />} colorScheme="blue" size="sm" mt={3} variant="outline" onClick={() => setIsOpen(true)}>
        Set Reminder
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Reminder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSetReminder} isLoading={isLoading}>
              Send Reminder
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const ContractExpiryNotifications = () => {
  const expiringContracts = [
    { contractName: "ABC Corp Service Agreement", daysUntilExpiry: 5, status: "urgent", contractType: "Service", value: 50000 },
    { contractName: "XYZ Inc Software License", daysUntilExpiry: 15, status: "upcoming", contractType: "License", value: 25000 },
    { contractName: "Office Lease Agreement", daysUntilExpiry: 30, status: "upcoming", contractType: "Lease", value: 100000 },
    { contractName: "Consulting Agreement - John Doe", daysUntilExpiry: 45, status: "normal", contractType: "Consulting", value: 15000 },
    { contractName: "DEF Corp Maintenance Contract", daysUntilExpiry: 10, status: "urgent", contractType: "Maintenance", value: 30000 },
    { contractName: "GHI Ltd Partnership Agreement", daysUntilExpiry: 60, status: "normal", contractType: "Partnership", value: 200000 },
    { contractName: "JKL Co. Supply Chain Agreement", daysUntilExpiry: 20, status: "upcoming", contractType: "Supply", value: 75000 },
    { contractName: "MNO Inc. IT Support Contract", daysUntilExpiry: 3, status: "urgent", contractType: "Support", value: 40000 },
  ];

  return (
    <Box p={5} width="100%">
      <Heading mb={4}>Contract Expiry Notifications</Heading>
      <Box height="70vh" overflowY="auto">
        <VStack spacing={4} align="stretch">
          {expiringContracts.map((contract, index) => (
            <ExpiryNotification key={index} {...contract} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default ContractExpiryNotifications;