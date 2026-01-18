import DashboardLayout from './components/layout/DashboardLayout';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

function App() {
  return (
    <DashboardLayout>
      {/* In production, this Box would eventually be a separate 
          component or a Route from 'react-router-dom' 
      */}
      <Box 
        bg="white" 
        p="8" 
        shadow="md" 
        borderRadius="xl" 
        border="1px solid" 
        borderColor="gray.100"
      >
        <VStack align="start" gap="4">
          <Heading size="lg" fontWeight="bold" color="blue.700">
            Dashboard Overview
          </Heading>
          
          <Text color="gray.600" lineHeight="tall">
            Welcome to the admin panel. Soon, we will fetch data from the 
            ASP.NET backend using Axios interceptors.
          </Text>
        </VStack>
      </Box>
    </DashboardLayout>
  );
}

export default App;