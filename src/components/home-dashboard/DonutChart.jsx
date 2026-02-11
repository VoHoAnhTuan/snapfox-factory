"use client";

import { useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

export const DonutChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Fallback data if your teammate hasn't provided it yet
  const chartData = data || [
    { name: "BurgerPrints", value: 100, color: "#3182ce" },
    { name: "KBT", value: 300, color: "#ed8936" },
    { name: "TeeAllOver", value: 300, color: "#d53f8c" },
    { name: "Thai Vu", value: 200, color: "#38a169" },
    { name: "My Duyen", value: 200, color: "#9da138" },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Box
      height="400px"
      p="6"
      bg="bg.panel"
      borderRadius="xl"
      border="1px solid"
      borderColor="border"
      width="100%"
      boxShadow="sm"
      position="relative"
    >
      <Text fontWeight="bold" fontSize="lg">
        Top 5 Partners
      </Text>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Pie
            activeIndex={activeIndex}
            activeShape={<Sector outerRadius={110} cornerRadius={6} />}
            data={chartData}
            innerRadius={70}
            outerRadius={95}
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={() => setActiveIndex(null)}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <VStack
        position="absolute"
        top="56%"
        left="50%"
        transform="translate(-50%, -50%)"
        pointerEvents="none"
        gap="0"
      >
        <Text fontSize="24px" fontWeight="bold" color="fg">
          {totalValue.toLocaleString()}
        </Text>
        <Text fontSize="14px" color="gray.400">
          Orders
        </Text>
      </VStack>
    </Box>
  );
};
