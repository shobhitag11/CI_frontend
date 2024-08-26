// src/App.js
import React, { useState , useEffect} from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import QuickActionDashboard from './components/QuickActionDashboard';
import ContractSummarization from './components/ContractSummarization';
import ContractRedlining from './components/ContractRedlining';
import RiskAssessment from './components/RiskAssessment';
import ContractCreation from './components/ContractCreation';
import ContractChatbot from './components/ContractChatbot';
import ContractComparison from './components/ContractComparison';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AutomatedReview from './components/AutomatedReview';
import ContractTemplateLibrary from './components/ContractTemplateLibrary';
import ContractExpiryNotifications from './components/ContractExpiryNotifications';
import VoiceAssistant from './components/VoiceAssistant';
import SentimentAnalysis from './components/SentimentAnalysis';
import Gamification from './components/Gamification';
import AIDrafting from './components/AIDrafting';
import AdvancedSearch from './components/AdvancedSearch';
import AIContractAnalysisDashboard from './components/AIContractAnalysisDashboard';
import VersionControl from './components/VersionControl';
import CollaborativeEditing from './components/CollaborativeEditing';
import AISuggestions from './components/AISuggestions';
// import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !user) {
      // Fetch a random user photo
      fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
          setUser({
            name: data.results[0].name.first + ' ' + data.results[0].name.last,
            avatar: data.results[0].picture.medium
          });
        });
    }
  }, [isAuthenticated, user]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSidebarExpand = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Header user={isAuthenticated ? user : null} onLogout={handleLogout} />
          <Flex>
            {isAuthenticated && <Sidebar onExpand={handleSidebarExpand} />}
            <Box
              flex={1}
              ml={isAuthenticated ? (isSidebarExpanded ? "200px" : "70px") : 0}
              mt="64px"
              p={4}
              transition="margin-left 0.2s ease"
            >
              <Routes>
                <Route path="/login" element={
                  isAuthenticated ? <Navigate to="/quickdashboard" /> : <Login onLogin={handleLogin} />
                } />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/quickdashboard" element={isAuthenticated ? <QuickActionDashboard /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={ <Dashboard />} />
                <Route path="/dashboard/summarization" element={<ContractSummarization />} />
                <Route path="/dashboard/redlining" element={<ContractRedlining />} />
                <Route path="/dashboard/risk-assessment" element={<RiskAssessment />} />
                <Route path="/dashboard/creation" element={<ContractCreation />} />
                <Route path="/dashboard/chatbot" element={<ContractChatbot />} />
                <Route path="/dashboard/comparison" element={<ContractComparison />} />
                <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />
                <Route path="/dashboard/automated-review" element={<AutomatedReview />} />
                <Route path="/dashboard/templates" element={<ContractTemplateLibrary />} />
                <Route path="/dashboard/expiry-notifications" element={<ContractExpiryNotifications />} />
                <Route path="/dashboard/gamification" element={<Gamification />} />
                <Route path="/dashboard/voice-assistant" element={<VoiceAssistant />} />
                <Route path="/dashboard/sentiment-analysis" element={<SentimentAnalysis />} />
                <Route path="/dashboard/ai-drafting" element={<AIDrafting />} />
                <Route path="/dashboard/advanced-search" element={<AdvancedSearch />} />
                <Route path="/dashboard/ai-analysis" element={<AIContractAnalysisDashboard />} />
                <Route path="/dashboard/version-control" element={<VersionControl />} />
                <Route path="/dashboard/collaborative-editing" element={<CollaborativeEditing />} />
                <Route path="/dashboard/ai-suggestions" element={<AISuggestions />} />
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
              </Routes>
            </Box>
          </Flex>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;