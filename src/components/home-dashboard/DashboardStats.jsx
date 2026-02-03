import { SimpleGrid, Box, Text, HStack, Icon, VStack } from "@chakra-ui/react";
import { LuDollarSign, LuShoppingCart, LuHeartCrack, LuTurtle } from "react-icons/lu";

export const DashboardStats = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 4 }} gap="6" width="100%" marginBottom="4">
      {/* Total Sales Card */}
      <Box
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
      >
        <VStack align="start" gap="1">
          <Text fontSize="sm" color="fg">
            Total Sales
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            $983,410
          </Text>
          <HStack gap="1" pt="2">
            <Text fontSize="xs" color="green.500" fontWeight="bold">
              +3.34%
            </Text>
            <Text fontSize="xs" color="gray.500">
              vs last week
            </Text>
          </HStack>
        </VStack>

        <Box
          position="absolute"
          top="6"
          right="6"
          p="2"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          bg="bg.panel"
          color="fg"
        >
          <Icon as={LuDollarSign} color="gray.400" boxSize="5" />
        </Box>
      </Box>

      {/* Total Orders Card */}
      <Box
        role="group"
        p="6"
        bg="bg.panel"
        shadow="0 10px 15px -3px rgba(255, 115, 0, 0.15)"
        transition="all 0.2s ease-in-out"
        _hover={{
          shadow: "0 20px 25px -5px rgba(255, 115, 0, 0.30)",
          transform: "translateY(-4px)",
        }}
        borderColor="gray.100"
        borderRadius="xl"
        position="relative"
      >
        <VStack align="start" gap="1">
          <Text fontSize="sm">
            Total Orders
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            58,375
          </Text>
          <HStack gap="1" pt="2">
            <Text fontSize="xs" color="red.500" fontWeight="bold">
              -2.89%
            </Text>
            <Text fontSize="xs" color="gray.500">
              vs last week
            </Text>
          </HStack>
        </VStack>

        <Box
          position="absolute"
          top="6"
          right="6"
          p="2"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          bg="bg.panel"
          color="fg"
        >
          <Icon
            as={LuShoppingCart}
            color="gray.400"
            boxSize="5"
          />
        </Box>
      </Box>

      {/* Total Canceled Orders Card */}
      <Box
        role="group"
        p="6"
        bg="bg.panel"
        shadow="0 10px 15px -3px rgba(255, 115, 0, 0.15)"
        transition="all 0.2s ease-in-out"
        _hover={{
          shadow: "0 20px 25px -5px rgba(255, 115, 0, 0.30)",
          transform: "translateY(-4px)",
        }}
        borderColor="gray.100"
        borderRadius="xl"
        position="relative"
      >
        <VStack align="start" gap="1">
          <Text fontSize="sm">
            Total Canceled Orders
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            58,375
          </Text>
          <HStack gap="1" pt="2">
            <Text fontSize="xs" color="red.500" fontWeight="bold">
              -2.89%
            </Text>
            <Text fontSize="xs" color="gray.500">
              vs last week
            </Text>
          </HStack>
        </VStack>

        <Box
          position="absolute"
          top="6"
          right="6"
          p="2"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          bg="bg.panel"
          color="fg"
        >
          <Icon
            as={LuHeartCrack}
            color="gray.400"
            boxSize="5"
          />
        </Box>
      </Box>

      {/* Total Delayed Orders Card */}
      <Box
        role="group"
        p="6"
        bg="bg.panel"
        shadow="0 10px 15px -3px rgba(255, 115, 0, 0.15)"
        transition="all 0.2s ease-in-out"
        _hover={{
          shadow: "0 20px 25px -5px rgba(255, 115, 0, 0.30)",
          transform: "translateY(-4px)",
        }}
        borderColor="gray.100"
        borderRadius="xl"
        position="relative"
      >
        <VStack align="start" gap="1">
          <Text fontSize="sm">
            Total Delayed Orders
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            58,375
          </Text>
          <HStack gap="1" pt="2">
            <Text fontSize="xs" color="red.500" fontWeight="bold">
              -2.89%
            </Text>
            <Text fontSize="xs" color="gray.500">
              vs last week
            </Text>
          </HStack>
        </VStack>

        <Box
          position="absolute"
          top="6"
          right="6"
          p="2"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          bg="bg.panel"
          color="fg"
        >
          <Icon
            as={LuTurtle}
            color="gray.400"
            boxSize="5"
          />
        </Box>
      </Box>
    </SimpleGrid>
  );
};
