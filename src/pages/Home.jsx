"use client";

import {
  Heading,
  Grid,
  Text,
  VStack,
  GridItem,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Quote from "inspirational-quotes";
import { DashboardStats } from "@/components/home-dashboard/DashboardStats";
import { RevenueChart } from "@/components/home-dashboard/RevenueChart";
import { TodayTargetChart } from "@/components/home-dashboard/TodayTargetChart";
import { DonutChart } from "@/components/home-dashboard/DonutChart";
import { LuFileDown } from "react-icons/lu";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { OrderProgressTrack } from "@/components/OrderProgressTrack";
import { ShippingTimeChart } from "@/components/home-dashboard/ShippingTimeChart";
import { OrderChart } from "@/components/home-dashboard/OrderChart";

export default function Home() {
  const [timeframe, setTimeframe] = useState("Month");
  const [quote] = useState(() => Quote.getQuote());

  return (
    <VStack color="fg" align="start" gap="6" width="100%" p="4">
      <Heading size="2xl">Dashboard Overview</Heading>

      <HStack width="full" justify="space-between" align="center">
        <Text fontSize="sm" fontStyle="italic" color="fg.muted">
          {quote.text} — {quote.author}
        </Text>

        <HStack gap="3">
          {/* Use the simplified SegmentedControl component */}
          <SegmentedControl
            value={timeframe}
            onValueChange={(e) => setTimeframe(e.value)}
            items={["Date", "Week", "Month"]}
            size="sm"
            bg="bg.panel"
          />

          <IconButton bg="bg.panel" variant="outline" borderColor="border">
            <LuFileDown />
          </IconButton>
        </HStack>
      </HStack>

      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }}
        gap="6"
        width="100%"
        alignItems="stretch"
      >
        <GridItem colSpan={{ base: 4 }}>
          <OrderProgressTrack />
        </GridItem>
        <GridItem colSpan={{ base: 4 }}>
          <DashboardStats timeframe={timeframe} />
        </GridItem>
        <GridItem colSpan={{ base: 4, lg: 2 }}>
          <RevenueChart timeframe={timeframe} />
        </GridItem>
        <GridItem colSpan={{ base: 4, lg: 2 }}>
          <OrderChart timeframe={timeframe} />
        </GridItem>
        <GridItem colSpan={{ base: 4, lg: 1 }}>
          <TodayTargetChart completed="10" total="100" />
        </GridItem>
        <GridItem colSpan={{ base: 4, lg: 1 }}>
          <DonutChart timeframe={timeframe} />
        </GridItem>
        <GridItem colSpan={{ base: 4, lg: 2 }}>
          <ShippingTimeChart />
        </GridItem>
      </Grid>
    </VStack>
  );
}
