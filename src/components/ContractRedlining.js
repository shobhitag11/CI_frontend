import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Text, Heading, Flex, Button, VStack, HStack, useToast, Progress,
  Tabs, TabList, TabPanels, Tab, TabPanel, List, ListItem, ListIcon,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Input, Select, Table, Thead, Tbody, Tr, Th, Td,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, InfoIcon, SearchIcon, DownloadIcon } from '@chakra-ui/icons';
import { jsPDF } from "jspdf";

const ContractRedlining = () => {
  const [originalContract, setOriginalContract] = useState(null);
  const [newContract, setNewContract] = useState(null);
  const [redlinedText, setRedlinedText] = useState([]);
  const [keyDifferences, setKeyDifferences] = useState([]);
  const [dateChanges, setDateChanges] = useState([]);
  const [partyChanges, setPartyChanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightColor, setHighlightColor] = useState({ added: 'green.500', removed: 'red.500' });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileUpload = (event, setContract) => {
    const file = event.target.files[0];
    if (file) {
      setContract(file);
    }
  };

  const compareContracts = async () => {
    if (!originalContract || !newContract) {
      toast({
        title: "Error",
        description: "Please upload both contracts before comparing.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('original_contract', originalContract);
    formData.append('new_contract', newContract);

    try {
      const response = await fetch('http://localhost:8000/api/compare-contracts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to compare contracts');

      const result = await response.json();
      setRedlinedText(result.redlinedText);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compare contracts. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const extractKeyDifferences = useCallback(() => {
    const differences = redlinedText.filter(part => part.type !== 'unchanged');
    const significantDifferences = differences.filter(diff => 
      diff.text.length > 10 || diff.text.includes('\n')
    );
    setKeyDifferences(significantDifferences);

    // Extract date changes
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/g;
    const dates = differences.filter(diff => dateRegex.test(diff.text));
    setDateChanges(dates);

    // Extract party changes
    const partyRegex = /\b(?:Party\s+[A-Z]|Contractor|Client|Vendor|Customer)\b/g;
    const parties = differences.filter(diff => partyRegex.test(diff.text));
    setPartyChanges(parties);
  }, [redlinedText]);

  useEffect(() => {
    extractKeyDifferences();
  }, [redlinedText, extractKeyDifferences]);

  const RedlinedSpan = ({ type, children }) => (
    <Text
      as="span"
      textDecoration={type === 'removed' ? 'line-through' : 'none'}
      color={type === 'removed' ? highlightColor.removed : type === 'added' ? highlightColor.added : 'black'}
      fontWeight={type === 'added' ? 'bold' : 'normal'}
      bg={searchTerm && children.toLowerCase().includes(searchTerm.toLowerCase()) ? 'yellow.200' : 'transparent'}
    >
      {children}
    </Text>
  );

  const DifferenceIcon = ({ type }) => (
    type === 'added' ? <AddIcon color={highlightColor.added} /> : <MinusIcon color={highlightColor.removed} />
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleColorChange = (type, color) => {
    setHighlightColor(prev => ({ ...prev, [type]: color }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Contract Redlining Report", 20, 10);
    
    let yOffset = 30;
    keyDifferences.forEach((diff, index) => {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
      if (diff.type === 'added') {
        doc.setTextColor(0, 128, 0); // Green for additions
      } else {
        doc.setTextColor(255, 0, 0); // Red for removals
      }
      doc.text(`${diff.type === 'added' ? 'Added' : 'Removed'}: ${diff.text.substring(0, 100)}`, 20, yOffset);
      yOffset += 10;
    });

    doc.save("contract-redlining-report.pdf");
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Contract Redlining</Heading>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Button as="label" htmlFor="original-contract">
            Upload Original Contract
            <input
              id="original-contract"
              type="file"
              hidden
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, setOriginalContract)}
            />
          </Button>
          <Text>{originalContract ? originalContract.name : 'No file chosen'}</Text>
        </HStack>
        <HStack>
          <Button as="label" htmlFor="new-contract">
            Upload New Contract
            <input
              id="new-contract"
              type="file"
              hidden
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, setNewContract)}
            />
          </Button>
          <Text>{newContract ? newContract.name : 'No file chosen'}</Text>
        </HStack>
        <Button onClick={compareContracts} colorScheme="blue" isLoading={isLoading}>
          Compare Contracts
        </Button>
        {isLoading && <Progress size="xs" isIndeterminate />}
        
        {redlinedText.length > 0 && (
          <>
            <HStack>
              <Input
                placeholder="Search in redlined text"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Select
                placeholder="Added color"
                value={highlightColor.added}
                onChange={(e) => handleColorChange('added', e.target.value)}
              >
                <option value="green.500">Green</option>
                <option value="blue.500">Blue</option>
                <option value="purple.500">Purple</option>
              </Select>
              <Select
                placeholder="Removed color"
                value={highlightColor.removed}
                onChange={(e) => handleColorChange('removed', e.target.value)}
              >
                <option value="red.500">Red</option>
                <option value="orange.500">Orange</option>
                <option value="pink.500">Pink</option>
              </Select>
            </HStack>
            <Tabs>
              <TabList>
                <Tab>Full Comparison</Tab>
                <Tab>Key Differences</Tab>
                <Tab>Date Changes</Tab>
                <Tab>Party Changes</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box border="1px" borderColor="gray.200" p={4} borderRadius="md" maxHeight="500px" overflowY="auto">
                    {redlinedText.map((part) => (
                      <RedlinedSpan key={part.id} type={part.type}>
                        {part.text}
                      </RedlinedSpan>
                    ))}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Accordion allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            Additions
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <List spacing={3}>
                          {keyDifferences.filter(diff => diff.type === 'added').map((diff, index) => (
                            <ListItem key={index}>
                              <ListIcon as={AddIcon} color={highlightColor.added} />
                              {diff.text.substring(0, 100)}{diff.text.length > 100 ? '...' : ''}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            Removals
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <List spacing={3}>
                          {keyDifferences.filter(diff => diff.type === 'removed').map((diff, index) => (
                            <ListItem key={index}>
                              <ListIcon as={MinusIcon} color={highlightColor.removed} />
                              {diff.text.substring(0, 100)}{diff.text.length > 100 ? '...' : ''}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </TabPanel>
                <TabPanel>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Type</Th>
                        <Th>Date Change</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dateChanges.map((change, index) => (
                        <Tr key={index}>
                          <Td>{change.type === 'added' ? 'New Date' : 'Removed Date'}</Td>
                          <Td color={change.type === 'added' ? highlightColor.added : highlightColor.removed}>
                            {change.text}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TabPanel>
                <TabPanel>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Type</Th>
                        <Th>Party Change</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {partyChanges.map((change, index) => (
                        <Tr key={index}>
                          <Td>{change.type === 'added' ? 'New Party' : 'Removed Party'}</Td>
                          <Td color={change.type === 'added' ? highlightColor.added : highlightColor.removed}>
                            {change.text}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
        
        <HStack>
          <Button leftIcon={<InfoIcon />} onClick={onOpen}>
            View Redlining Guide
          </Button>
          <Button leftIcon={<DownloadIcon />} onClick={exportToPDF} isDisabled={redlinedText.length === 0}>
            Export to PDF
          </Button>
        </HStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redlining Guide</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>This tool helps you compare two versions of a contract:</Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={AddIcon} color={highlightColor.added} />
                Highlighted text indicates additions in the new contract.
              </ListItem>
              <ListItem>
                <ListIcon as={MinusIcon} color={highlightColor.removed} />
                Strikethrough text indicates removals from the original contract.
              </ListItem>
            </List>
            <Text mt={4}>Use the tabs to view different aspects of the changes:</Text>
            <List spacing={2}>
              <ListItem>
                <Text fontWeight="bold">Full Comparison:</Text> Shows the entire redlined document.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Key Differences:</Text> Highlights major changes between the contracts.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Date Changes:</Text> Shows changes to dates in the contract.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Party Changes:</Text> Highlights changes to party names or roles.
              </ListItem>
            </List>
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

export default ContractRedlining;