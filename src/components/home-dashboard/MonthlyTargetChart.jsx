import { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  StackSeparator,
  IconButton,
  Button,
  NumberInput,
} from "@chakra-ui/react";
// Explicitly importing components to avoid 'undefined' errors
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { LuSettings2 } from "react-icons/lu";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseTrigger,
  PopoverBody,
  PopoverArrow,
} from "../ui/popover";
import { Field } from "../ui/field";

const RenderGaugeSector = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export const MonthlyTargetChart = ({
  current = 51000,
  initialTarget = 60000,
}) => {
  const [target, setTarget] = useState(initialTarget);
  const percentage = Math.round((current / target) * 100);

  // Dynamic color based on achievement
  const activeColor = percentage < 50 ? "#E53E3E" : "#ff8c00";

  const chartData = [
    { value: current, fill: activeColor },
    { value: Math.max(0, target - current), fill: "#FFE4C4" },
  ];

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
    >
      <HStack justify="space-between" mb="2">
        <Text fontWeight="bold" fontSize="lg">
          Monthly Target
        </Text>

        <PopoverRoot positioning={{ placement: "bottom-end" }}>
          <PopoverTrigger asChild>
            <IconButton
              bg="bg.panel"
              color="fg"
              variant="ghost"
              size="xs"
              aria-label="Adjust Target"
            >
              <LuSettings2 />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent width="240px" portalled={false}>
            <PopoverArrow />
            <PopoverBody>
              <VStack align="start" gap="4" p="2">
                <Text>Enter a new target 🚀</Text>
                <NumberInput.Root size="sm" value={target.toString()} onValueChange={(details) => setTarget(Number(details.value))}>
                  <NumberInput.Input/>
                </NumberInput.Root>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      </HStack>

      {/* Gauge Logic */}
      <Box height="200px" position="relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="70%"
              innerRadius={60}
              outerRadius={85}
              startAngle={180}
              endAngle={0}
              stroke="none"
              shape={RenderGaugeSector}
              activeShape={RenderGaugeSector}
              activeIndex={[0, 1]}
            />
          </PieChart>
        </ResponsiveContainer>

        <VStack position="absolute" bottom="15%" width="100%" gap="0">
          <Text fontSize="3xl" fontWeight="bold">
            {percentage}%
          </Text>
        </VStack>
      </Box>

      {/* Footer Data */}
      <VStack gap="4" mt="4">
        <HStack
          width="100%"
          bg="bg.info"
          p="3"
          borderRadius="lg"
          separator={<StackSeparator borderColor="orange.200" />}
        >
          <VStack flex="1" gap="0">
            <Text fontSize="2xs" color="fg.info" textTransform="uppercase">
              Target
            </Text>
            <Text fontWeight="bold" fontSize="sm">
              ${target.toLocaleString()}
            </Text>
          </VStack>
          <VStack flex="1" gap="0">
            <Text fontSize="2xs" color="fg.info" textTransform="uppercase">
              Revenue
            </Text>
            <Text fontWeight="bold" fontSize="sm">
              ${current.toLocaleString()}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
