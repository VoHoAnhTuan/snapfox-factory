import { useMemo } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

export const ShippingTimeChart = ({ orders }) => {
  const chartData = useMemo(() => {
    // 1. More detailed Internal Mock Data
    const dataSource = orders || [
      { id: "S-1", createdDate: "2026-02-01T08:00Z", shippedDate: "2026-02-02T08:00Z", status: "Shipped" }, // 1.0 Day
      { id: "S-2", createdDate: "2026-02-01T08:00Z", shippedDate: "2026-02-02T20:00Z", status: "Shipped" }, // 1.5 Days
      { id: "S-3", createdDate: "2026-02-01T08:00Z", shippedDate: "2026-02-03T08:00Z", status: "Shipped" }, // 2.0 Days
      { id: "S-4", createdDate: "2026-02-01T08:00Z", shippedDate: "2026-02-03T20:00Z", status: "Shipped" }, // 2.5 Days
      { id: "S-5", createdDate: "2026-02-01T08:00Z", shippedDate: "2026-02-04T08:00Z", status: "Shipped" }, // 3.0 Days
      { id: "S-6", createdDate: "2026-02-01T08:00Z", shippedDate: "2026-02-02T21:00Z", status: "Shipped" }, // 1.5 Days (approx)
    ];

    const distribution = {};

    dataSource.filter(o => o.shippedDate).forEach(order => {
      const start = new Date(order.createdDate);
      const end = new Date(order.shippedDate);
      
      const diffInHours = Math.abs(end - start) / (1000 * 60 * 60);
      const diffInDays = diffInHours / 24;
      
      // Round to the nearest 0.5
      // Example: 1.2 becomes 1.0, 1.4 becomes 1.5, 1.7 becomes 1.5, 1.8 becomes 2.0
      const roundedDays = Math.round(diffInDays * 2) / 2;
      
      const label = `${roundedDays.toFixed(1)} Day${roundedDays !== 1 ? 's' : ''}`;
      
      if (!distribution[label]) {
        distribution[label] = { name: label, count: 0, days: roundedDays };
      }
      distribution[label].count += 1;
    });

    return Object.values(distribution).sort((a, b) => a.days - b.days);
  }, [orders]);

  return (
    <Box height="400px" p="6" bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border">
      <VStack align="start" gap="0" mb="4">
        <Text fontWeight="bold" fontSize="lg">Shipping Efficiency</Text>
        <Text fontSize="xs" color="fg.muted">From import to shipped</Text>
      </VStack>

      <Box height="300px" width="100%">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
            <XAxis dataKey="name" axisLine={true} tickLine={false} tick={{ fill: "gray", fontSize: 11 }} />
            <YAxis axisLine={true} tickLine={false} tick={{ fill: "gray", fontSize: 12 }} allowDecimals={false} />
            
            <Tooltip 
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
              contentStyle={{ borderRadius: "12px", border: "none", backgroundColor: "#1A1A1A", color: "#fff" }}
              itemStyle={{ color: "#ff8c00" }}
            />
            
            <ReferenceLine x="2.0 Days" stroke="#ff8c00" label={{ position: 'top', value: 'Target', fill: '#ff8c00', fontSize: 10 }} strokeDasharray="3 3" />

            <Bar dataKey="count" fill="#3182ce" radius={[4, 4, 0, 0]} barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};