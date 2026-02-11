import { useMemo } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MOCK_ORDERS = [
  { createdDate: "2026-02-07T10:00:00Z", totalAmount: 1200 },
  { createdDate: "2026-02-05T14:30:00Z", totalAmount: 850 },
  { createdDate: "2026-02-01T09:15:00Z", totalAmount: 2100 },
  { createdDate: "2026-01-25T11:00:00Z", totalAmount: 1500 },
  { createdDate: "2026-01-15T16:45:00Z", totalAmount: 3200 },
  { createdDate: "2025-12-20T12:00:00Z", totalAmount: 45000 },
  { createdDate: "2025-11-15T10:30:00Z", totalAmount: 2800 },
];

export const OrderChart = ({ orders = MOCK_ORDERS, timeframe = "Month" }) => {
  const chartData = useMemo(() => {
    const dataMap = {};

    orders.forEach((order) => {
      const date = new Date(order.createdDate);
      let label;
      let sortValue;

      if (timeframe === "Date") {
        label = date.toLocaleDateString("en-US", { weekday: "short" });
        sortValue = date.getDay();
      } else if (timeframe === "Week") {
        label = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        sortValue = date.getTime();
      } else {
        label = date.toLocaleDateString("en-US", { month: "short" });
        sortValue = date.getMonth();
      }

      if (!dataMap[label]) {
        // Logic change: tracking orderCount instead of revenue
        dataMap[label] = { name: label, orderCount: 0, sortValue };
      }
      dataMap[label].orderCount += 1; // Increment count for each order
    });

    return Object.values(dataMap).sort((a, b) => a.sortValue - b.sortValue);
  }, [orders, timeframe]);

  return (
    <Box
      height="400px"
      p="6"
      bg="bg.panel"
      borderRadius="xl"
      shadow="sm"
      border="1px solid"
      borderColor="border"
    >
      <VStack align="start" gap="0" mb="4">
        <Text fontWeight="bold" fontSize="lg">
          Order Volume
        </Text>
        <Text fontSize="xs" color="fg.muted">
          Showing total orders by {timeframe.toLowerCase()}
        </Text>
      </VStack>

      <Box height="300px" width="100%">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeOpacity={0.1}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "gray", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "gray", fontSize: 12 }}
              allowDecimals={false} // Orders are whole units
            />
            <Tooltip
              cursor={{ fill: "rgba(255, 140, 0, 0.05)" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#1A1A1A",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
              formatter={(val) => [val, "Orders"]}
            />
            <Bar
              dataKey="orderCount"
              fill="#ff8c00" // Keeping consistent theme color
              radius={[4, 4, 0, 0]} // Rounded top corners for a modern look
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};