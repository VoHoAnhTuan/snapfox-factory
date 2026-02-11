import { Box, Text, VStack } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const TodayTargetChart = ({ completed = 0, total = 0 }) => {
  const valCompleted = Number(completed);
  const valTotal = Number(total);

  const percentage = valTotal > 0 ? Math.round((valCompleted / valTotal) * 100) : 0;
  
  const data = [
    { name: "Completed", value: valCompleted },
    { name: "Remaining", value: Math.max(0, valTotal - valCompleted) },
  ];

  // Professional color palette: Vibrant Orange vs Soft Neutral
  const COLORS = ["#ff8c00", "#f0f0f0"];

  return (
    <Box height="400px" p="6" bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border">
      <VStack align="start" gap="0" mb="4">
        <Text fontWeight="bold" fontSize="lg">Today's Target</Text>
        <Text fontSize="xs" color="fg.muted">Order fulfillment progress</Text>
      </VStack>

      <Box height="250px" width="100%" position="relative">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none" 
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  // Only round the orange progress bar, keep the grey background flat
                  cornerRadius={index === 0 ? 10 : 0} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Percentage Label in Center */}
        <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" gap="0">
          <Text fontSize="3xl" fontWeight="bold">{percentage}%</Text>
          <Text fontSize="xs" color="fg.muted">{valCompleted}/{valTotal}</Text>
        </VStack>
      </Box>
    </Box>
  );
};