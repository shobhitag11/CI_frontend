// src/components/VoiceAssistant.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, Heading } from '@chakra-ui/react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("This browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      handleCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleCommand = (command) => {
    // Simple command handling logic
    if (command.includes('summary')) {
      setResponse('Here is a summary of your latest contract...');
    } else if (command.includes('risk')) {
      setResponse('The risk assessment for your latest contract shows a low risk profile...');
    } else {
      setResponse("I'm sorry, I didn't understand that command. You can ask for a summary or risk assessment.");
    }
    speak(response);
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <Box>
      <Heading mb={4}>Voice-Activated Contract Assistant</Heading>
      <VStack spacing={4} align="stretch">
        <Button onClick={() => setIsListening(!isListening)} colorScheme={isListening ? 'red' : 'green'}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Button>
        <Text>You said: {transcript}</Text>
        <Text>Assistant response: {response}</Text>
      </VStack>
    </Box>
  );
};

export default VoiceAssistant;