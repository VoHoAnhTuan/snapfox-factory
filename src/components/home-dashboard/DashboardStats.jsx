import { SimpleGrid, Box, Text, HStack, Icon, VStack } from "@chakra-ui/react";
import { LuDollarSign, LuShoppingCart, LuHeartCrack, LuTurtle } from "react-icons/lu";

// We now accept "stats" and "timeframe" as props
export const DashboardStats = ({ stats, timeframe = "week" }) => {
  // Use real data from props or fallback to your current hardcoded values
  const data = stats || [
    { label: "Total Sales", value: "$983,410", change: "+3.34%", isPositive: true, icon: LuDollarSign },
    { label: "Total Orders", value: "58,375", change: "-2.89%", isPositive: false, icon: LuShoppingCart },
    { label: "Total Canceled Orders", value: "58,375", change: "-2.89%", isPositive: false, icon: LuHeartCrack },
    { label: "Total Failed Orders", value: "58,375", change: "-2.89%", isPositive: false, icon: LuTurtle },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" width="100%" marginBottom="4">
      {data.map((item, index) => (
        <Box
          key={index}
          p="6"
          bg="bg.panel"
          shadow="0 10px 15px -3px rgba(255, 115, 0, 0.15)"
          transition="all 0.2s ease-in-out"
          _hover={{
            shadow: "0 20px 25px -5px rgba(255, 115, 0, 0.30)",
            transform: "translateY(-4px)",
          }}
          borderRadius="xl"
          position="relative"
          border="1px solid"
          borderColor="border"
        >
          <VStack align="start" gap="1">
            <Text fontSize="sm" color="fg.muted">
              {item.label}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {item.value}
            </Text>
            <HStack gap="1" pt="2">
              <Text 
                fontSize="xs" 
                color={item.isPositive ? "green.500" : "red.500"} 
                fontWeight="bold"
              >
                {item.change}
              </Text>
              <Text fontSize="xs" color="gray.500">
                vs last {timeframe.toLowerCase()}
              </Text>
            </HStack>
          </VStack>

          <Box
            position="absolute"
            top="6"
            right="6"
            p="2"
            border="1px solid"
            borderColor="border"
            borderRadius="lg"
            bg="bg.muted"
          >
            <Icon as={item.icon} color="gray.400" boxSize="5" />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};