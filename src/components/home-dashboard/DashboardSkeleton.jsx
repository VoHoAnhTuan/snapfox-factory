import { Box, Skeleton, HStack, Stack, SimpleGrid } from "@chakra-ui/react";

export const DashboardSkeleton = ({ type = "card", count = 1 }) => {
  // 1. Define the different "flavors" of skeletons
  const layouts = {
    // For your Total Sales / Total Orders cards
    stat: (
      <Box p="6" bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border">
        <HStack justify="space-between">
          <Stack gap="2" flex="1">
            <Skeleton height="4" width="60%" />
            <Skeleton height="8" width="80%" />
            <Skeleton height="3" width="40%" />
          </Stack>
          <Skeleton height="10" width="10" borderRadius="lg" />
        </HStack>
      </Box>
    ),
    // For your Revenue Chart
    chart: (
      <Box p="6" bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border">
        <HStack justify="space-between" mb="8">
          <Skeleton height="6" width="140px" />
          <Skeleton height="8" width="180px" borderRadius="md" />
        </HStack>
        <HStack height="300px" align="end" gap="4">
          <Skeleton height="10" width="140px" />
        </HStack>
      </Box>
    ),
  };

  // 2. Render multiple skeletons if "count" is provided
  return (
    <SimpleGrid columns={type === "stat" ? { base: 1, md: 4 } : 1} gap="6" width="100%">
      {[...Array(count)].map((_, i) => (
        <Box key={i}>{layouts[type]}</Box>
      ))}
    </SimpleGrid>
  );
};