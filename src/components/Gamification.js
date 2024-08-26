// src/components/Gamification.js
import React, { useState } from 'react';
import { Box, Button, Progress, Text, VStack, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';

const Gamification = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Review Contract', points: 10, completed: false },
    { id: 2, name: 'Complete Risk Assessment', points: 15, completed: false },
    { id: 3, name: 'Update Contract Template', points: 20, completed: false },
  ]);

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    const completedTask = tasks.find(task => task.id === taskId);
    const newPoints = points + completedTask.points;
    setPoints(newPoints);
    if (newPoints >= level * 50) {
      setLevel(level + 1);
    }
  };

  return (
    <Box>
      <Heading mb={4}>Contract Management Achievements</Heading>
      <SimpleGrid columns={2} spacing={4} mb={4}>
        <Stat>
          <StatLabel>Level</StatLabel>
          <StatNumber>{level}</StatNumber>
          <StatHelpText>Keep it up!</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Points</StatLabel>
          <StatNumber>{points}</StatNumber>
          <StatHelpText>Next level at {level * 50} points</StatHelpText>
        </Stat>
      </SimpleGrid>
      <Progress value={(points % (level * 50)) / (level * 50) * 100} colorScheme="green" mb={4} />
      <VStack spacing={4} align="stretch">
        {tasks.map(task => (
          <Button 
            key={task.id} 
            onClick={() => completeTask(task.id)} 
            isDisabled={task.completed}
            colorScheme={task.completed ? 'green' : 'blue'}
          >
            {task.name} (+{task.points} points)
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Gamification;