// src/components/VersionControl.js
import React, { useState } from 'react';
import { Box, Heading, VStack, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';

const VersionControl = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVersion, setSelectedVersion] = useState(null);

  const versions = [
    { id: 1, date: '2023-06-01', author: 'John Doe', changes: 'Initial draft' },
    { id: 2, date: '2023-06-15', author: 'Jane Smith', changes: 'Updated payment terms' },
    { id: 3, date: '2023-07-01', author: 'Mike Johnson', changes: 'Added confidentiality clause' },
  ];

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
    onOpen();
  };

  return (
    <Box>
      <Heading mb={6}>Document Version Control</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Version</Th>
            <Th>Date</Th>
            <Th>Author</Th>
            <Th>Changes</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {versions.map((version) => (
            <Tr key={version.id}>
              <Td>{version.id}</Td>
              <Td>{version.date}</Td>
              <Td>{version.author}</Td>
              <Td>{version.changes}</Td>
              <Td>
                <Button size="sm" onClick={() => handleVersionSelect(version)}>View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Version {selectedVersion?.id} Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={3}>
              <Box>
                <strong>Date:</strong> {selectedVersion?.date}
              </Box>
              <Box>
                <strong>Author:</strong> {selectedVersion?.author}
              </Box>
              <Box>
                <strong>Changes:</strong> {selectedVersion?.changes}
              </Box>
              {/* Add more details or diff view here */}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default VersionControl;