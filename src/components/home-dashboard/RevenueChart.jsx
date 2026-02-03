import { useState, useMemo } from "react";
import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import { SegmentedControl } from "../ui/segmented-control";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const RevenueChart = ({ orders = [] }) => {
  const [view, setView] = useState("Month");

  // Transform data based on the selected segment
  const chartData = useMemo(() => {
    const dataMap = {};
    orders.forEach((order) => {
      const date = new Date(order.createdDate);
      let label;

      if (view === "Day") label = date.toLocaleDateString("en-US", { weekday: "short" });
      else if (view === "Month") label = date.toLocaleDateString("en-US", { month: "short" });
      else label = date.getFullYear().toString();

      dataMap[label] = (dataMap[label] || 0) + order.totalAmount;
    });

    return Object.keys(dataMap).map((key) => ({ name: key, revenue: dataMap[key] }));
  }, [orders, view]);

  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  return (
    <Box height="400px" p="6" bg="bg.panel" borderRadius="xl" shadow="sm" border="1px solid" borderColor="border">
      <HStack justify="space-between" mb="8">
        <VStack align="start" gap="0">
          <Text fontWeight="bold" fontSize="lg">Revenue Analysis</Text>
        </VStack>

        <SegmentedControl
          value={view}
          onValueChange={(e) => setView(e.value)}
          items={["Day", "Month", "Year"]}
          size="sm"
        />
      </HStack>

      <Box height="300px" width="100%">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
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
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              cursor={{ fill: "rgba(255, 140, 0, 0.05)" }}
              contentStyle={{ borderRadius: "12px", border: "none", backgroundColor: "#1A1A1A", color: "#fff" }}
              formatter={(val) => [formatCurrency(val), "Revenue"]}
            />
            <Bar 
              dataKey="revenue" 
              fill="var(--chakra-colors-orange-500)" 
              radius={[6, 6, 0, 0]} 
              barSize={view === "Year" ? 60 : 35} 
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};