// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Box, VStack, Icon, Text, Flex } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FiFileText, FiEdit, FiAlertTriangle, FiPlusCircle, FiMessageCircle, FiGitMerge, FiPieChart, FiCheckSquare, FiFolder, FiBell, FiAward, FiMic, FiTrendingUp, FiEdit3, FiSearch,FiStar, FiEdit2, FiGitPullRequest } from 'react-icons/fi';

const SidebarItem = ({ icon, label, to, isExpanded }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Flex
      as={RouterLink}
      to={to}
      align="center"
      p={3}
      borderRadius="md"
      _hover={{ bg: 'gray.100' }}
      bg={isActive ? 'gray.100' : 'transparent'}
      w="100%"
    >
      <Icon as={icon} w={6} h={6} color={isActive ? 'blue.500' : 'gray.500'} />
      {isExpanded && (
        <Text ml={3} className="sidebar-label">
          {label}
        </Text>
      )}
    </Flex>
  );
};

const Sidebar = ({ onExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onExpand(isExpanded);
  }, [isExpanded, onExpand]);

  return (
    <Box
      w={isExpanded ? "200px" : "70px"}
      bg="white"
      boxShadow="md"
      h="calc(100vh - 64px)"
      position="fixed"
      left={0}
      top="64px"
      transition="width 0.2s ease"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      overflowX="hidden"
      zIndex={1000}
    >
      <VStack spacing={1} align="stretch" p={4}>
        <SidebarItem icon={FiStar} label="Quick Actions" to="/quickdashboard" isExpanded={isExpanded} />
        <SidebarItem icon={FiPieChart} label="Dashboard" to="/dashboard" isExpanded={isExpanded} />
        <SidebarItem icon={FiFileText} label="Summarization" to="/dashboard/summarization" isExpanded={isExpanded} />
        <SidebarItem icon={FiEdit} label="Redlining" to="/dashboard/redlining" isExpanded={isExpanded} />
        <SidebarItem icon={FiAlertTriangle} label="Risk Assessment" to="/dashboard/risk-assessment" isExpanded={isExpanded} />
        <SidebarItem icon={FiPlusCircle} label="Contract Creation" to="/dashboard/creation" isExpanded={isExpanded} />
        <SidebarItem icon={FiMessageCircle} label="Chatbot" to="/dashboard/chatbot" isExpanded={isExpanded} />
        <SidebarItem icon={FiGitPullRequest} label="Comparison" to="/dashboard/comparison" isExpanded={isExpanded} />
        <SidebarItem icon={FiCheckSquare} label="Automated Review" to="/dashboard/automated-review" isExpanded={isExpanded} />
        <SidebarItem icon={FiFolder} label="Template Library" to="/dashboard/templates" isExpanded={isExpanded} />
        <SidebarItem icon={FiBell} label="Expiry Notifications" to="/dashboard/expiry-notifications" isExpanded={isExpanded} />
        <SidebarItem icon={FiAward} label="Gamification" to="/dashboard/gamification" isExpanded={isExpanded} />
        {/* <SidebarItem icon={FiMic} label="Voice Assistant" to="/dashboard/voice-assistant" isExpanded={isExpanded} /> */}
        <SidebarItem icon={FiTrendingUp} label="Sentiment Analysis" to="/dashboard/sentiment-analysis" isExpanded={isExpanded} />
        <SidebarItem icon={FiEdit3} label="AI Drafting" to="/dashboard/ai-drafting" isExpanded={isExpanded} />
        <SidebarItem icon={FiSearch} label="Advanced Search" to="/dashboard/advanced-search" isExpanded={isExpanded} />
        <SidebarItem icon={FiCheckSquare} label="AI Analysis" to="/dashboard/ai-analysis" isExpanded={isExpanded} />
        <SidebarItem icon={FiGitMerge} label="Version Control" to="/dashboard/version-control" isExpanded={isExpanded} />
        <SidebarItem icon={FiEdit2} label="Collaborative Editing" to="/dashboard/collaborative-editing" isExpanded={isExpanded} />
        {/* <SidebarItem icon={FiCheckSquare} label="AI Suggestions" to="/dashboard/ai-suggestions" isExpanded={isExpanded} /> */}

      </VStack>
    </Box>
  );
};

export default Sidebar;