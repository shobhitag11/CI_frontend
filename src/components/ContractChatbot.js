// components/ContractChatbot.js
import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Box, VStack, Input, Button, Text, Heading, HStack, IconButton, 
//   useToast, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, 
//   ModalFooter, ModalBody, ModalCloseButton, Textarea, Tag, Wrap, WrapItem,
//   Select, Divider, useColorMode, Tooltip, Badge, Table, Thead, Tbody, Tr, Th, Td,
//   Avatar, Flex, Progress, Menu, MenuButton, MenuList, MenuItem
// } from '@chakra-ui/react';
import { 
  Box, VStack, Input, Button, Text, Heading, HStack, IconButton, 
  useToast, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, ModalCloseButton, Textarea, Tag, Wrap, WrapItem,
  Select, Divider, useColorMode, Tooltip, Badge, Table, Thead, Tbody, Tr, Th, Td,
  Avatar, Flex, Progress, Menu, MenuButton, MenuList, MenuItem, Link,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import { FiCopy, FiRefreshCw, FiThumbsUp, FiThumbsDown, FiSave, FiTag, FiPlus, FiMic, FiDownload, FiMoon, FiSun, FiSearch, FiUser, FiMessageSquare, FiUpload, FiGlobe } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ForceGraph2D } from 'react-force-graph';
import SimpleKnowledgeGraph from './SimpleKnowledgeGraph'

// Mock data for demonstrations
const mockChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const mockTableData = [
  { id: 1, contractType: 'Service Agreement', value: '$50,000', duration: '1 year' },
  { id: 2, contractType: 'License Agreement', value: '$75,000', duration: '2 years' },
  { id: 3, contractType: 'Employment Contract', value: 'N/A', duration: 'Permanent' },
];

const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

const ContractChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [savedResponses, setSavedResponses] = useState([]);
  const [conversationCategory, setConversationCategory] = useState('General');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [knowledgeGraph, setKnowledgeGraph] = useState(null);
  const [legalTerms, setLegalTerms] = useState({});
  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
      generateSuggestedQuestions(messages[messages.length - 1].text);
      saveChatHistory();
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatHistory = () => {
    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setChatHistory(history);
    if (history.length > 0) {
      setCurrentSessionId(history[0].id);
      setMessages(history[0].messages);
    } else {
      startNewChat();
    }
  };

  const saveChatHistory = () => {
    let history = chatHistory;
    const currentSession = history.find(session => session.id === currentSessionId);
    if (currentSession) {
      currentSession.messages = messages;
    } else {
      history.unshift({ id: currentSessionId, messages: messages });
    }
    history = history.slice(0, 10); // Keep only last 10 sessions
    setChatHistory(history);
    localStorage.setItem('chatHistory', JSON.stringify(history));
  };

  const startNewChat = () => {
    const newSessionId = Date.now();
    setCurrentSessionId(newSessionId);
    setMessages([]);
    setConversationCategory('General');
  };

  const handleSessionChange = (sessionId) => {
    const session = chatHistory.find(s => s.id === parseInt(sessionId));
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsTyping(true);

      // Simulate sentiment analysis
      const sentiment = await analyzeSentiment(input);
      
      // Simulate streaming response
      const response = await generateStreamingResponse(input, sentiment);
      
      setIsTyping(false);
    }
  };

  const analyzeSentiment = async (text) => {
    // Simulated sentiment analysis
    await new Promise(resolve => setTimeout(resolve, 500));
    const sentiments = ['positive', 'neutral', 'negative'];
    return sentiments[Math.floor(Math.random() * sentiments.length)];
  };

  const generateStreamingResponse = async (userInput, sentiment) => {
    const words = `Based on sentiment analysis (${sentiment}), here's a response: ${userInput} is an interesting point about contracts. In a real application, I would provide a more detailed answer.`.split(' ');
    let partialResponse = { 
      id: Date.now(), 
      sender: 'bot', 
      timestamp: new Date().toISOString(), 
      text: '',
      citations: [
        { id: 1, text: "Contract Law Basics", author: "John Smith", year: 2021, page: 45 },
        { id: 2, text: "Legal Precedents in Contract Disputes", author: "Jane Doe", year: 2020, page: 112 }
      ]
    };
    
    setMessages(prevMessages => [...prevMessages, partialResponse]);

    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Delay between words
      partialResponse.text += words[i] + ' ';
      setMessages(prevMessages => prevMessages.map(msg => 
        msg.id === partialResponse.id ? partialResponse : msg
      ));
    }

    // Simulate generating a knowledge graph
    setKnowledgeGraph({
      nodes: [{ id: 'Contract' }, { id: 'Parties' }, { id: 'Terms' }, { id: 'Obligations' }],
      links: [
        { source: 'Contract', target: 'Parties' },
        { source: 'Contract', target: 'Terms' },
        { source: 'Contract', target: 'Obligations' }
      ]
    });

    // Simulate generating legal term explanations
    setLegalTerms({
      'Force Majeure': 'A clause that frees both parties from obligation if an extraordinary event prevents one or both parties from performing.',
      'Indemnification': 'A provision where one party agrees to compensate the other party for losses or damages under certain circumstances.'
    });
  };
  // const generateStreamingResponse = async (userInput, sentiment) => {
  //   const words = `Based on sentiment analysis (${sentiment}), here's a response: ${userInput} is an interesting point about contracts. In a real application, I would provide a more detailed answer.`.split(' ');
  //   let partialResponse = { id: Date.now(), sender: 'bot', timestamp: new Date().toISOString(), text: '' };
    
  //   setMessages(prevMessages => [...prevMessages, partialResponse]);

  //   for (let i = 0; i < words.length; i++) {
  //     await new Promise(resolve => setTimeout(resolve, 100)); // Delay between words
  //     partialResponse.text += words[i] + ' ';
  //     setMessages(prevMessages => prevMessages.map(msg => 
  //       msg.id === partialResponse.id ? partialResponse : msg
  //     ));
  //   }
  // };

  const handleVoiceInput = () => {
    setIsListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    recognition.start();
  };

  const handleExportChat = () => {
    const chatText = messages.map(msg => `${msg.sender} (${new Date(msg.timestamp).toLocaleString()}): ${msg.text}`).join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `chat_export_${new Date().toISOString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateSuggestedQuestions = (botResponse) => {
    const questions = [
      "Can you provide more details about the contract terms?",
      "What are the key risks associated with this contract?",
      "How does this compare to our standard agreement?",
    ];
    setSuggestedQuestions(questions);
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
    handleSendMessage();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleRetry = (index) => {
    setIsRetrying(true);
    setTimeout(() => {
      setMessages(messages => {
        const newMessages = [...messages];
        newMessages[index] = {
          ...newMessages[index],
          text: "This is a retried response. In a real application, this would be a new response from the API.",
        };
        return newMessages;
      });
      setIsRetrying(false);
    }, 2000);
  };

  const openFeedbackModal = (id, type) => {
    setSelectedMessageId(id);
    setFeedbackType(type);
  };

  const handleFeedbackSubmit = () => {
    setMessages(messages.map(msg => 
      msg.id === selectedMessageId ? {...msg, feedback: feedbackType, feedbackText} : msg
    ));
    toast({
      title: `Feedback submitted`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setFeedbackType(null);
    setFeedbackText('');
    setSelectedMessageId(null);
  };

  const handleSaveResponse = (text) => {
    setSavedResponses([...savedResponses, text]);
    toast({
      title: "Response saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCategoryChange = (category) => {
    setConversationCategory(category);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded for analysis.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // In a real application, you would send this file to your backend for processing
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    toast({
      title: "Language changed",
      description: `Chat language set to ${language}.`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    // In a real application, you would trigger a translation of the UI and messages here
  };

  const renderChart = (chartData) => {
    const ChartComponent = chartData.type === 'bar' ? BarChart : LineChart;
    const DataComponent = chartData.type === 'bar' ? Bar : Line;
    
    return (
      <Box height="300px" width="100%">
        <ResponsiveContainer>
          <ChartComponent data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <DataComponent type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </ChartComponent>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderTable = (tableData) => (
    <Table variant="simple">
      <Thead>
        <Tr>
          {Object.keys(tableData[0]).map(key => (
            <Th key={key}>{key}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {tableData.map((row, index) => (
          <Tr key={index}>
            {Object.values(row).map((value, idx) => (
              <Td key={idx}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );


  const renderMessage = (message, index) => {
    const isUser = message.sender === 'user';
    return (
      <Flex
        key={index}
        mb={4}
        flexDirection="column"
        alignItems={isUser ? 'flex-end' : 'flex-start'}
      >
        <HStack spacing={2} mb={1}>
          <Avatar 
            size="xs" 
            icon={isUser ? <FiUser /> : <FiMessageSquare />}
            bg={isUser ? "blue.500" : "green.500"}
          />
          <Badge>{message.sender}</Badge>
          <Text fontSize="xs" color="gray.500">
            {new Date(message.timestamp).toLocaleTimeString()}
          </Text>
        </HStack>
        <Box 
          bg={isUser ? 'blue.100' : 'gray.100'} 
          p={2} 
          borderRadius="md"
          maxWidth="80%"
        >
          <Text>{message.text}</Text>
          {message.citations && (
            <Wrap mt={2}>
              {message.citations.map((citation) => (
                <WrapItem key={citation.id}>
                  <Popover>
                    <PopoverTrigger>
                      <Link color="blue.500">[{citation.id}]</Link>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Citation</PopoverHeader>
                      <PopoverBody>
                        <Text>{citation.text}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {citation.author}, {citation.year}, p. {citation.page}
                        </Text>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </WrapItem>
              ))}
            </Wrap>
          )}
          {message.chart && renderChart(message.chart)}
          {message.table && renderTable(message.table)}
        </Box>
        {!isUser && (
          <HStack mt={1}>
            <IconButton
              icon={<FiCopy />}
              size="xs"
              onClick={() => handleCopy(message.text)}
              aria-label="Copy response"
            />
            <IconButton
              icon={isRetrying ? <Spinner size="xs" /> : <FiRefreshCw />}
              size="xs"
              onClick={() => handleRetry(index)}
              aria-label="Retry response"
              isDisabled={isRetrying}
            />
            <IconButton
              icon={<FiThumbsUp />}
              size="xs"
              onClick={() => openFeedbackModal(message.id, 'positive')}
              colorScheme={message.feedback === 'positive' ? 'green' : 'gray'}
              aria-label="Positive feedback"
            />
            <IconButton
              icon={<FiThumbsDown />}
              size="xs"
              onClick={() => openFeedbackModal(message.id, 'negative')}
              colorScheme={message.feedback === 'negative' ? 'red' : 'gray'}
              aria-label="Negative feedback"
            />
            <IconButton
              icon={<FiSave />}
              size="xs"
              onClick={() => handleSaveResponse(message.text)}
              aria-label="Save response"
            />
            <IconButton
              icon={<FiTag />}
              size="xs"
              onClick={() => handleCategoryChange('Legal')}
              aria-label="Categorize conversation"
            />
          </HStack>
        )}
      </Flex>
    );
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading>AI Contract Assistant</Heading>
        <HStack>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiGlobe />}>
              {selectedLanguage}
            </MenuButton>
            <MenuList>
              {languages.map((lang) => (
                <MenuItem key={lang} onClick={() => handleLanguageChange(lang)}>
                  {lang}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Tooltip label="Export Chat">
            <IconButton
              icon={<FiDownload />}
              onClick={handleExportChat}
              aria-label="Export Chat"
            />
          </Tooltip>
          <Tooltip label="Upload Document">
            <IconButton
              icon={<FiUpload />}
              onClick={() => fileInputRef.current.click()}
              aria-label="Upload Document"
            />
          </Tooltip>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </HStack>
      </HStack>
      <HStack mb={4} justify="space-between">
        <Tag>{conversationCategory}</Tag>
        <Select 
          width="auto" 
          value={currentSessionId} 
          onChange={(e) => handleSessionChange(e.target.value)}
        >
          {chatHistory.map((session) => (
            <option key={session.id} value={session.id}>
              Session {new Date(session.id).toLocaleString()}
            </option>
          ))}
        </Select>
        <Button leftIcon={<FiPlus />} onClick={startNewChat}>New Chat</Button>
      </HStack>
      <VStack spacing={4} align="stretch" height="500px">
        <Box flex={1} overflowY="auto" borderWidth={1} borderRadius="md" p={2}>
          {messages.map(renderMessage)}
          {isTyping && (
            <Flex align="center" justify="flex-start">
              <Avatar 
                size="xs" 
                icon={<FiMessageSquare />}
                bg="green.500"
                mr={2}
              />
              <Progress size="xs" isIndeterminate width="80px" />
            </Flex>
          )}
          <div ref={messagesEndRef} />
        </Box>
        <Divider />
        <Wrap>
          {suggestedQuestions.map((question, index) => (
            <WrapItem key={index}>
              <Button size="sm" onClick={() => handleSuggestedQuestion(question)}>
                {question}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
        <HStack>
          <Input
            flex={1}
            placeholder="Ask a question about contracts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton
            icon={isListening ? <Spinner /> : <FiMic />}
            onClick={handleVoiceInput}
            aria-label="Voice Input"
            isLoading={isListening}
          />
          <Button onClick={handleSendMessage} colorScheme="blue" isDisabled={isTyping}>
            Send
          </Button>
        </HStack>
      </VStack>
      
      <Tabs>
        <TabList>
          <Tab>Knowledge Graph</Tab>
          <Tab>Legal Terms</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box height="500px">
              <SimpleKnowledgeGraph />
            </Box>
          </TabPanel>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              {Object.entries(legalTerms).map(([term, definition]) => (
                <Box key={term} p={4} borderWidth={1} borderRadius="md">
                  <Heading size="md">{term}</Heading>
                  <Text mt={2}>{definition}</Text>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>



      <Modal isOpen={feedbackType !== null} onClose={() => setFeedbackType(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{feedbackType === 'positive' ? 'Positive' : 'Negative'} Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea 
              value={feedbackText} 
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Please provide your feedback here..."
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFeedbackSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={() => setFeedbackType(null)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContractChatbot;