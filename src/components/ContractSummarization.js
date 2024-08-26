// src/components/ContractSummarization.js
import React, { useState, useEffect } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Text, VStack, Button, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Input, Select, HStack, IconButton, Tooltip, Checkbox, Menu,
  MenuButton, MenuList, MenuItem, Tabs, TabList, TabPanels, Tab, TabPanel,
  Progress, Badge, Textarea, Drawer, DrawerBody, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, DrawerFooter, useToast, Switch
} from '@chakra-ui/react';
import { 
  FiEye, FiMessageSquare, FiFilter, FiChevronUp, FiChevronDown, FiMoreVertical,
  FiCalendar, FiUpload, FiClock, FiEdit2, FiSave, FiTrash2, FiDownload, FiBarChart2
} from 'react-icons/fi';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ContractSummarization = () => {
  const [contracts, setContracts] = useState([
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
]);
  const [filteredContracts, setFilteredContracts] = useState(contracts);
  const [selectedContracts, setSelectedContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedContract, setSelectedContract] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContract, setEditedContract] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [customFields, setCustomFields] = useState([]);
  const [newCustomField, setNewCustomField] = useState({ name: '', type: 'text' });
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const toast = useToast();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  useEffect(() => {
    filterContracts();
  }, [searchTerm, filterType, filterDateRange, filterStatus]);

  const filterContracts = () => {
    let filtered = contracts.filter(contract => 
      (contract.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
       contract.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
       contract.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterType === '' || contract.type === filterType) &&
      (filterStatus === '' || getContractStatus(contract) === filterStatus)
    );

    if (filterDateRange.start && filterDateRange.end) {
      filtered = filtered.filter(contract => 
        new Date(contract.startDate) >= new Date(filterDateRange.start) &&
        new Date(contract.endDate) <= new Date(filterDateRange.end)
      );
    }

    setFilteredContracts(filtered);
  };

  const getContractStatus = (contract) => {
    const now = new Date();
    const endDate = new Date(contract.endDate);
    if (endDate < now) return 'Expired';
    if (endDate - now < 30 * 24 * 60 * 60 * 1000) return 'Expiring Soon';
    return 'Active';
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

  const handleSelectContract = (contractId) => {
    setSelectedContracts(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId)
        : [...prev, contractId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContracts(
      selectedContracts.length === filteredContracts.length 
        ? [] 
        : filteredContracts.map(c => c.id)
    );
  };

  const handleBatchAction = (action) => {
    // Simulated batch actions
    switch(action) {
      case 'export':
        toast({
          title: 'Exporting contracts',
          description: `Exporting ${selectedContracts.length} contracts`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        break;
      case 'update':
        toast({
          title: 'Updating contracts',
          description: `Updating ${selectedContracts.length} contracts`,
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        break;
      case 'delete':
        setContracts(contracts.filter(c => !selectedContracts.includes(c.id)));
        setFilteredContracts(filteredContracts.filter(c => !selectedContracts.includes(c.id)));
        toast({
          title: 'Contracts deleted',
          description: `Deleted ${selectedContracts.length} contracts`,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        break;
    }
    setSelectedContracts([]);
  };

  const handlePreview = (contract) => {
    setSelectedContract(contract);
    onPreviewOpen();
  };

  const handleChat = (contract) => {
    setSelectedContract(contract);
    onChatOpen();
  };

  const handleEdit = (contract) => {
    setEditedContract({ ...contract });
    setIsEditMode(true);
    onDrawerOpen();
  };

  const handleSaveEdit = () => {
    setContracts(contracts.map(c => c.id === editedContract.id ? editedContract : c));
    setFilteredContracts(filteredContracts.map(c => c.id === editedContract.id ? editedContract : c));
    setIsEditMode(false);
    onDrawerClose();
    toast({
      title: 'Contract updated',
      description: 'The contract has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddCustomField = () => {
    if (newCustomField.name) {
      setCustomFields([...customFields, newCustomField]);
      setNewCustomField({ name: '', type: 'text' });
    }
  };

  const handleAddComment = () => {
    if (newComment) {
      setComments({
        ...comments,
        [selectedContract.id]: [
          ...(comments[selectedContract.id] || []),
          { text: newComment, timestamp: new Date().toISOString() }
        ]
      });
      setNewComment('');
    }
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

  const ContractHealthScore = ({ contract }) => {
    // Simplified health score calculation
    const score = Math.random() * 100;
    let color = 'green';
    if (score < 40) color = 'red';
    else if (score < 70) color = 'yellow';

    return (
      <Tooltip label={`Health Score: ${score.toFixed(0)}`}>
        <Progress value={score} size="sm" colorScheme={color} />
      </Tooltip>
    );
  };

  const TableView = () => (
    <Table variant="simple" size="sm">
      <Thead position="sticky" top={0} bg="white" zIndex={1}>
        <Tr>
          <Th>
            <Checkbox 
              isChecked={selectedContracts.length === filteredContracts.length}
              isIndeterminate={selectedContracts.length > 0 && selectedContracts.length < filteredContracts.length}
              onChange={handleSelectAll}
            />
          </Th>
          <Th>Type <SortIcon field="type" /></Th>
          <Th>Parties</Th>
          <Th>Key Obligations</Th>
          <Th>Tenure <SortIcon field="tenure" /></Th>
          <Th>Summary</Th>
          <Th>Start Date <SortIcon field="startDate" /></Th>
          <Th>End Date <SortIcon field="endDate" /></Th>
          <Th>Health</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredContracts.map((contract) => (
          <Tr key={contract.id}>
            <Td>
              <Checkbox 
                isChecked={selectedContracts.includes(contract.id)}
                onChange={() => handleSelectContract(contract.id)}
              />
            </Td>
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
            <Td><ContractHealthScore contract={contract} /></Td>
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
                <Tooltip label="Edit Contract">
                  <IconButton
                    icon={<FiEdit2 />}
                    size="sm"
                    onClick={() => handleEdit(contract)}
                    aria-label="Edit Contract"
                  />
                </Tooltip>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const ChartView = () => {
    const contractTypes = filteredContracts.reduce((acc, contract) => {
      acc[contract.type] = (acc[contract.type] || 0) + 1;
      return acc;
    }, {});

    const pieData = {
      labels: Object.keys(contractTypes),
      datasets: [
        {
          data: Object.values(contractTypes),
          backgroundColor: COLORS,
        },
      ],
    };

    const barData = {
      labels: filteredContracts.map(c => c.type),
      datasets: [
        {
          label: 'Contract Value (Simulated)',
          data: filteredContracts.map(() => Math.floor(Math.random() * 100000)),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    return (
      <VStack spacing={8}>
        <Box w="100%" h="300px">
          <Heading size="md" mb={4}>Contract Types Distribution</Heading>
          <Pie data={pieData} />
        </Box>
        <Box w="100%" h="300px">
          <Heading size="md" mb={4}>Contract Values (Simulated)</Heading>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </Box>
      </VStack>
    );
  };

  return (
    <Box>
      <Heading mb={4}>Contract Summarization</Heading>
      <HStack mb={4} spacing={4} wrap="wrap">
        <Input
          placeholder="Search contracts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="300px"
        />
        <Select
          placeholder="Filter by type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          width="200px"
        >
          {Array.from(new Set(contracts.map(c => c.type))).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
        <Select
          placeholder="Filter by status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          width="200px"
        >
          <option value="Active">Active</option>
          <option value="Expiring Soon">Expiring Soon</option>
          <option value="Expired">Expired</option>
        </Select>
        <Input
          placeholder="Start Date"
          type="date"
          value={filterDateRange.start}
          onChange={(e) => setFilterDateRange({ ...filterDateRange, start: e.target.value })}
        />
        <Input
          placeholder="End Date"
          type="date"
          value={filterDateRange.end}
          onChange={(e) => setFilterDateRange({ ...filterDateRange, end: e.target.value })}
        />
        <Switch
          isChecked={viewMode === 'chart'}
          onChange={() => setViewMode(viewMode === 'table' ? 'chart' : 'table')}
        />
        <Text>{viewMode === 'table' ? 'Table View' : 'Chart View'}</Text>
      </HStack>
      
      {selectedContracts.length > 0 && (
        <Menu>
          <MenuButton as={Button} rightIcon={<FiMoreVertical />} mb={4}>
            Batch Actions ({selectedContracts.length})
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleBatchAction('export')}>Export Selected</MenuItem>
            <MenuItem onClick={() => handleBatchAction('update')}>Update Selected</MenuItem>
            <MenuItem onClick={() => handleBatchAction('delete')}>Delete Selected</MenuItem>
          </MenuList>
        </Menu>
      )}

      <Box 
        overflowX="auto" 
        overflowY="auto" 
        maxHeight="calc(100vh - 250px)"
        borderWidth={1}
        borderRadius="lg"
      >
        {viewMode === 'table' ? <TableView /> : <ChartView />}
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
              {customFields.map(field => (
                <Text key={field.name}><strong>{field.name}:</strong> {selectedContract?.[field.name] || 'N/A'}</Text>
              ))}
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

      {/* Contract Edit Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{isEditMode ? 'Edit Contract' : 'Contract Details'}</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Input 
                placeholder="Contract Type" 
                value={editedContract?.type || ''} 
                onChange={(e) => setEditedContract({...editedContract, type: e.target.value})}
                isReadOnly={!isEditMode}
              />
              <Input 
                placeholder="Parties" 
                value={editedContract?.parties.join(', ') || ''} 
                onChange={(e) => setEditedContract({...editedContract, parties: e.target.value.split(', ')})}
                isReadOnly={!isEditMode}
              />
              <Textarea 
                placeholder="Key Obligations" 
                value={editedContract?.keyObligations || ''} 
                onChange={(e) => setEditedContract({...editedContract, keyObligations: e.target.value})}
                isReadOnly={!isEditMode}
              />
              <Input 
                placeholder="Tenure" 
                value={editedContract?.tenure || ''} 
                onChange={(e) => setEditedContract({...editedContract, tenure: e.target.value})}
                isReadOnly={!isEditMode}
              />
              <Textarea 
                placeholder="Summary" 
                value={editedContract?.summary || ''} 
                onChange={(e) => setEditedContract({...editedContract, summary: e.target.value})}
                isReadOnly={!isEditMode}
              />
              <Input 
                placeholder="Start Date" 
                type="date"
                value={editedContract?.startDate || ''} 
                onChange={(e) => setEditedContract({...editedContract, startDate: e.target.value})}
                isReadOnly={!isEditMode}
              />
              <Input 
                placeholder="End Date" 
                type="date"
                value={editedContract?.endDate || ''} 
                onChange={(e) => setEditedContract({...editedContract, endDate: e.target.value})}
                isReadOnly={!isEditMode}
              />
              {customFields.map(field => (
                <Input 
                  key={field.name}
                  placeholder={field.name} 
                  value={editedContract?.[field.name] || ''} 
                  onChange={(e) => setEditedContract({...editedContract, [field.name]: e.target.value})}
                  isReadOnly={!isEditMode}
                />
              ))}
              {isEditMode && (
                <HStack>
                  <Input 
                    placeholder="New Custom Field Name" 
                    value={newCustomField.name}
                    onChange={(e) => setNewCustomField({...newCustomField, name: e.target.value})}
                  />
                  <Select 
                    value={newCustomField.type}
                    onChange={(e) => setNewCustomField({...newCustomField, type: e.target.value})}
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                  </Select>
                  <Button onClick={handleAddCustomField}>Add Field</Button>
                </HStack>
              )}
            </VStack>
            {!isEditMode && (
              <VStack mt={6} align="stretch">
                <Heading size="md">Comments</Heading>
                {comments[selectedContract?.id]?.map((comment, index) => (
                  <Box key={index} p={2} borderWidth={1} borderRadius="md">
                    <Text>{comment.text}</Text>
                    <Text fontSize="sm" color="gray.500">{new Date(comment.timestamp).toLocaleString()}</Text>
                  </Box>
                ))}
                <Textarea 
                  placeholder="Add a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handleAddComment}>Add Comment</Button>
              </VStack>
            )}
          </DrawerBody>
          <DrawerFooter>
            {isEditMode ? (
              <Button colorScheme="blue" onClick={handleSaveEdit}>Save Changes</Button>
            ) : (
              <Button colorScheme="blue" onClick={() => setIsEditMode(true)}>Edit Contract</Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default ContractSummarization;