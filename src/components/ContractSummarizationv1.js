// src/components/ContractSummarization.js
import React, { useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Text, VStack, Button, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Input, Select, HStack, IconButton, Tooltip
} from '@chakra-ui/react';
import { FiEye, FiMessageSquare, FiFilter, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const ContractSummarization = () => {
  const contracts = [
    { id: 1, type: 'Service Agreement', parties: ['ABC Corp', 'XYZ Tech'], keyObligations: 'Provide IT support and maintenance', tenure: '2 years', summary: 'IT services contract for software development and support', startDate: '2023-07-01', endDate: '2025-06-30' },
    { id: 2, type: 'Lease Agreement', parties: ['123 Properties', 'Tech Startup Inc'], keyObligations: 'Monthly rent payment, maintain premises', tenure: '5 years', summary: 'Office space lease in downtown tech hub', startDate: '2023-08-01', endDate: '2028-07-31' },
    { id: 3, type: 'Employment Contract', parties: ['Global Corp', 'John Doe'], keyObligations: 'Full-time work, confidentiality', tenure: 'Permanent', summary: 'Senior developer position with stock options', startDate: '2023-09-01', endDate: 'N/A' },
    { id: 4, type: 'Vendor Agreement', parties: ['MegaRetail', 'SupplyChain Co'], keyObligations: 'Supply inventory, maintain quality standards', tenure: '3 years', summary: 'Exclusive supplier for retail chain', startDate: '2023-10-01', endDate: '2026-09-30' },
    { id: 5, type: 'Licensing Agreement', parties: ['InnovaTech', 'GadgetMaker Inc'], keyObligations: 'Royalty payments, quality control', tenure: '10 years', summary: 'Patent licensing for smart home technology', startDate: '2023-11-01', endDate: '2033-10-31' },
    { id: 6, type: 'Non-Disclosure Agreement', parties: ['SecretProject LLC', 'Consultant Group'], keyObligations: 'Maintain confidentiality of project details', tenure: '2 years', summary: 'Protecting information related to AI development', startDate: '2023-12-01', endDate: '2025-11-30' },
    { id: 7, type: 'Partnership Agreement', parties: ['GreenEnergy Co', 'SolarTech Inc'], keyObligations: 'Joint development of solar technology', tenure: '5 years', summary: 'Collaboration on next-gen solar panels', startDate: '2024-01-01', endDate: '2028-12-31' },
    { id: 8, type: 'Franchise Agreement', parties: ['BurgerChain HQ', 'Local Foods LLC'], keyObligations: 'Adhere to brand standards, pay franchise fees', tenure: '10 years', summary: 'New franchise location in suburban area', startDate: '2024-02-01', endDate: '2034-01-31' },
    { id: 9, type: 'Construction Contract', parties: ['Buildrite Construction', 'City Government'], keyObligations: 'Build public library to specifications', tenure: '18 months', summary: 'New city library construction project', startDate: '2024-03-01', endDate: '2025-08-31' },
    { id: 10, type: 'Advertising Contract', parties: ['Ad Agency X', 'Consumer Goods Inc'], keyObligations: 'Develop and run ad campaign', tenure: '1 year', summary: 'National TV and digital advertising campaign', startDate: '2024-04-01', endDate: '2025-03-31' },
    { id: 11, type: 'Distribution Agreement', parties: ['MovieMaker Studios', 'Global Cinemas'], keyObligations: 'Distribute films to specified regions', tenure: '3 years', summary: 'Exclusive distribution rights for Asia Pacific', startDate: '2024-05-01', endDate: '2027-04-30' },
    { id: 12, type: 'Joint Venture Agreement', parties: ['AutoCorp', 'BatteryTech'], keyObligations: 'Develop electric vehicle batteries', tenure: '7 years', summary: 'R&D partnership for EV technology', startDate: '2024-06-01', endDate: '2031-05-31' },
    { id: 13, type: 'Maintenance Contract', parties: ['BuildingCare Services', 'Office Tower LLC'], keyObligations: 'Regular maintenance of building systems', tenure: '2 years', summary: 'Comprehensive building maintenance services', startDate: '2024-07-01', endDate: '2026-06-30' },
    { id: 14, type: 'Merger Agreement', parties: ['TechGiant Inc', 'StartupInnovator'], keyObligations: 'Combine operations and assets', tenure: 'Permanent', summary: 'Strategic merger to enhance AI capabilities', startDate: '2024-08-01', endDate: 'N/A' },
    { id: 15, type: 'Loan Agreement', parties: ['BigBank', 'GrowthCorp'], keyObligations: 'Repay loan with interest', tenure: '5 years', summary: 'Business expansion loan', startDate: '2024-09-01', endDate: '2029-08-31' },
    { id: 16, type: 'Consulting Agreement', parties: ['Management Experts', 'Family Business Inc'], keyObligations: 'Provide strategic advice and implementation support', tenure: '1 year', summary: 'Business transformation consulting', startDate: '2024-10-01', endDate: '2025-09-30' },
    { id: 17, type: 'Sponsorship Agreement', parties: ['MegaSports', 'AthleteX'], keyObligations: 'Wear branded gear, attend events', tenure: '4 years', summary: 'Exclusive athlete sponsorship deal', startDate: '2024-11-01', endDate: '2028-10-31' },
    { id: 18, type: 'Subscription Agreement', parties: ['CloudServices Inc', 'Enterprise Co'], keyObligations: 'Provide cloud storage and computing services', tenure: '3 years', summary: 'Enterprise-level cloud services subscription', startDate: '2024-12-01', endDate: '2027-11-30' },
    { id: 19, type: 'Insurance Policy', parties: ['InsureCo', 'Factory Operations Ltd'], keyObligations: 'Pay premiums, provide coverage', tenure: '1 year', summary: 'Comprehensive business insurance policy', startDate: '2025-01-01', endDate: '2025-12-31' },
    { id: 20, type: 'Research Grant Agreement', parties: ['Government Science Dept', 'University Research Center'], keyObligations: 'Conduct research, publish findings', tenure: '2 years', summary: 'Grant for renewable energy research', startDate: '2025-02-01', endDate: '2027-01-31' },
  ];
  const [filteredContracts, setFilteredContracts] = useState(contracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedContract, setSelectedContract] = useState(null);
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterContracts(term, filterType);
  };

  const handleFilterTypeChange = (event) => {
    const type = event.target.value;
    setFilterType(type);
    filterContracts(searchTerm, type);
  };

  const filterContracts = (term, type) => {
    const filtered = contracts.filter(contract => 
      (contract.type.toLowerCase().includes(term) || 
       contract.summary.toLowerCase().includes(term) || 
       contract.parties.some(party => party.toLowerCase().includes(term))) &&
      (type === '' || contract.type === type)
    );
    setFilteredContracts(filtered);
  };

  const handleSort = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    const sorted = [...filteredContracts].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredContracts(sorted);
  };

  const handlePreview = (contract) => {
    setSelectedContract(contract);
    onPreviewOpen();
  };

  const handleChat = (contract) => {
    setSelectedContract(contract);
    onChatOpen();
  };

  const SortIcon = ({ field }) => (
    <IconButton
      icon={sortField === field ? (sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />) : <FiFilter />}
      size="xs"
      variant="ghost"
      onClick={() => handleSort(field)}
      aria-label={`Sort by ${field}`}
    />
  );

  return (
    <Box>
      <Heading mb={4}>Contract Summarization</Heading>
      <HStack mb={4} spacing={4}>
        <Input
          placeholder="Search contracts..."
          value={searchTerm}
          onChange={handleSearch}
          width="300px"
        />
        <Select
          placeholder="Filter by type"
          value={filterType}
          onChange={handleFilterTypeChange}
          width="200px"
        >
          {Array.from(new Set(contracts.map(c => c.type))).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      </HStack>
      <Box 
        overflowX="auto" 
        overflowY="auto" 
        maxHeight="calc(100vh - 250px)"
        borderWidth={1}
        borderRadius="lg"
      >
        <Table variant="simple" size="sm">
          <Thead position="sticky" top={0} bg="white" zIndex={1}>
            <Tr>
              <Th>Type <SortIcon field="type" /></Th>
              <Th>Parties</Th>
              <Th>Key Obligations</Th>
              <Th>Tenure <SortIcon field="tenure" /></Th>
              <Th>Summary</Th>
              <Th>Start Date <SortIcon field="startDate" /></Th>
              <Th>End Date <SortIcon field="endDate" /></Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredContracts.map((contract) => (
              <Tr key={contract.id}>
                <Td whiteSpace="nowrap">{contract.type}</Td>
                <Td>
                  <VStack align="start" spacing={0}>
                    {contract.parties.map((party, index) => (
                      <Text key={index} fontSize="sm">{party}</Text>
                    ))}
                  </VStack>
                </Td>
                <Td>{contract.keyObligations}</Td>
                <Td whiteSpace="nowrap">{contract.tenure}</Td>
                <Td>{contract.summary}</Td>
                <Td whiteSpace="nowrap">{contract.startDate}</Td>
                <Td whiteSpace="nowrap">{contract.endDate}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Tooltip label="Preview Contract">
                      <IconButton
                        icon={<FiEye />}
                        size="sm"
                        onClick={() => handlePreview(contract)}
                        aria-label="Preview Contract"
                      />
                    </Tooltip>
                    <Tooltip label="Chat about Contract">
                      <IconButton
                        icon={<FiMessageSquare />}
                        size="sm"
                        onClick={() => handleChat(contract)}
                        aria-label="Chat about Contract"
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Contract Preview Modal */}
      <Modal isOpen={isPreviewOpen} onClose={onPreviewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedContract?.type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={3}>
              <Text><strong>Parties:</strong> {selectedContract?.parties.join(', ')}</Text>
              <Text><strong>Key Obligations:</strong> {selectedContract?.keyObligations}</Text>
              <Text><strong>Tenure:</strong> {selectedContract?.tenure}</Text>
              <Text><strong>Summary:</strong> {selectedContract?.summary}</Text>
              <Text><strong>Start Date:</strong> {selectedContract?.startDate}</Text>
              <Text><strong>End Date:</strong> {selectedContract?.endDate}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onPreviewClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Contract Chat Modal */}
      <Modal isOpen={isChatOpen} onClose={onChatClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat about {selectedContract?.type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Ask questions about this specific contract:</Text>
            <VStack spacing={3} align="stretch">
              <Input placeholder="Type your question here..." />
              <Button colorScheme="blue">Send</Button>
              {/* Here you would integrate with your AI chat component */}
              <Text>AI responses would appear here...</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onChatClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContractSummarization;