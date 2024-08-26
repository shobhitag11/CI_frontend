// src/components/ContractCreation.js
import React, { useState } from 'react';
import { Box, VStack, Input, Textarea, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';

const ContractCreation = () => {
  const [contractType, setContractType] = useState('');
  const [contractContent, setContractContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateContract = () => {
    // In a real application, you'd send this data to an API to create the contract
    const blob = new Blob([contractContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${contractType.replace(/\s+/g, '_')}_contract.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Contract Type"
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
        />
        <Textarea
          placeholder="Contract Content"
          value={contractContent}
          onChange={(e) => setContractContent(e.target.value)}
          minHeight="200px"
        />
        <Button onClick={onOpen} colorScheme="blue">
          Preview Contract
        </Button>
        <Button onClick={handleCreateContract} colorScheme="green">
          Create and Download Contract
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contract Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
              <strong>{contractType}</strong>
              <Box mt={4} whiteSpace="pre-wrap">
                {contractContent}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContractCreation;