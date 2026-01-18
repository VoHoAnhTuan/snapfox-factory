import { ChakraProvider } from "@chakra-ui/react";
import DashboardLayout from './components/layout/DashboardLayout';
import { Box, Heading, Text } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <DashboardLayout>
        {/* This represents the "Page" content */}
        <Box bg="white" p={8} shadow="sm" borderRadius="lg">
          <Heading size="md" mb={4}>Dashboard Overview</Heading>
          <Text color="gray.600">
            Welcome to the admin panel. Soon, we will fetch data from the ASP.NET backend.
          </Text>
        </Box>
      </DashboardLayout>
    </ChakraProvider>
  )
}