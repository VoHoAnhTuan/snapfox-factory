import { Heading, Grid, Text, VStack, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import Quote from "inspirational-quotes";
import { DashboardStats } from "@/components/home-dashboard/DashboardStats";
import { RevenueChart } from "@/components/home-dashboard/RevenueChart";
import { MonthlyTargetChart } from "@/components/home-dashboard/MonthlyTargetChart";
import { DonutChart } from "@/components/home-dashboard/DonutChart";
export default function Home() {
  // inpirational quote
  const [quote, setQuote] = useState(() => Quote.getQuote());

  return (
    <VStack color="fg" align="start" gap="2" width="100%">
      <Heading size="2xl">Dashboard Overview</Heading>
      <Text fontSize="sm" fontStyle="italic" color="fg.muted">
        {quote.text} _ {quote.author} _
      </Text>

      {/* const Dashboard = () => {
  // Use your actual data fetching state here
  const { data, isLoading } = useGetOrders(); 
  return (
    <VStack gap="8" p="6">
      {isLoading ? (
        <ComponentSkeleton type="stat" count={4} />
      ) : (
        <DashboardStats orders={data} />
      )}

      {isLoading ? (
        <ComponentSkeleton type="chart" />
      ) : (
        <RevenueChart orders={data} />
      )}
    </VStack>
  );
}; */}
      <DashboardStats />

      <Grid templateColumns={{base: "1fr", lg: "repeat(4,1fr)"}} gap="6" width="100%">
        <GridItem colSpan={2}>
          <RevenueChart />
        </GridItem>
        <GridItem><MonthlyTargetChart /></GridItem>
        <GridItem><DonutChart /></GridItem>
      </Grid>
    </VStack>
  );
}
