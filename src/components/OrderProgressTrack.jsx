import { useMemo } from "react";
import { Box, Text, VStack, HStack, Stack } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

// 1. Mock data placed outside to avoid recreation on every render
const MOCK_ORDERS = [
  { id: "ORD-001", createdDate: "2026-02-05T10:00:00Z", status: "Pending", total: 1200 },
  { id: "ORD-002", createdDate: "2026-02-06T14:30:00Z", status: "Pending", total: 850 },
  { id: "ORD-003", createdDate: "2026-02-07T09:15:00Z", status: "Processing", total: 2100 },
  { id: "ORD-004", createdDate: "2026-02-08T11:00:00Z", status: "Processing", total: 1500 },
  { id: "ORD-005", createdDate: "2026-02-09T16:45:00Z", status: "Shipped", total: 3200 },
  { id: "ORD-006", createdDate: "2026-02-09T12:00:00Z", status: "On Hold", total: 4500 },
  { id: "ORD-007", createdDate: "2026-02-10T10:30:00Z", status: "Processing", total: 2800 },
  { id: "ORD-008", createdDate: "2026-02-01T10:30:00Z", status: "Completed", total: 500 },
  { id: "ORD-009", createdDate: "2026-02-11T08:00:00Z", status: "Pending", total: 900 },
  { id: "ORD-010", createdDate: "2026-02-11T10:00:00Z", status: "Processing", total: 1100 }
];

export const OrderProgressTrack = ({ orders = MOCK_ORDERS }) => {
  const { statusData, totalBacklog } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Filter logic: Only past orders that are NOT Completed
    const backlog = orders.filter(
      (o) => new Date(o.createdDate) < now && o.status !== "Completed"
    );

    const total = backlog.length;
    if (total === 0) return { statusData: [], totalBacklog: 0 };

    // Grouping status counts
    const counts = backlog.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const colorMap = {
      Pending: "red.500",
      Processing: "orange.400",
      Shipped: "blue.400",
      "On Hold": "gray.500",
    };

    const formattedData = Object.entries(counts).map(([status, count]) => ({
      status,
      count,
      percentage: (count / total) * 100,
      color: colorMap[status] || "gray.400",
    }));

    return { statusData: formattedData, totalBacklog: total };
  }, [orders]);

  return (
    <Box p="6" bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border" height="full">
      <VStack align="start" gap="4" width="full">
        <VStack align="start" gap="0">
          <Text fontWeight="bold" fontSize="lg">Backlog Breakdown</Text>
          <Text fontSize="xs" color="fg.muted">
            {totalBacklog} unfinished past orders
          </Text>
        </VStack>

        {/* Stacked Bar with Tooltips */}
        <Box width="full" height="12px" bg="bg.muted" borderRadius="full" overflow="hidden">
          <HStack gap="0" height="full" width="full">
            {statusData.map((item) => (
              <Tooltip 
                key={item.status} 
                content={`${item.status}: ${item.count} (${Math.round(item.percentage)}%)`}
              >
                <Box
                  height="full"
                  width={`${item.percentage}%`}
                  bg={item.color}
                  cursor="pointer"
                  _hover={{ filter: "brightness(1.1)" }}
                  transition="all 0.2s"
                />
              </Tooltip>
            ))}
          </HStack>
        </Box>

        {/* Legend */}
        <Stack direction="row" wrap="wrap" gap="4">
          {statusData.map((item) => (
            <HStack key={item.status} gap="2">
              <Box boxSize="2" borderRadius="full" bg={item.color} />
              <Text fontSize="xs" fontWeight="medium">{item.status}</Text>
            </HStack>
          ))}
        </Stack>
      </VStack>
    </Box>
  );
};