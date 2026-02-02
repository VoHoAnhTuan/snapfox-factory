import { Heading, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <VStack align="start" gap="4">
      <Heading size="2xl" color="fg">Dashboard Overview</Heading>
      <Text color="fg">Welcome back! Here is what's happening today.</Text>
    </VStack>
  );
}