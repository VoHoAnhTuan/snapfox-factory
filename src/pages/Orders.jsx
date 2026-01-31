import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Table, Badge, Spinner, Center, Heading } from "@chakra-ui/react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollParentRef = useRef(null);

  // Use useCallback to keep the function stable
  const fetchOrders = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Axios uses 'params' to automatically build the query string: ?page=1&pageSize=50
      const response = await api.get("/orders", {
        params: {
          page: page,
          pageSize: 50,
        },
      });

      const newItems = response.data.items;

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setOrders((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      // Axios error handling is more robust
      console.error("Error fetching orders:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Handle scrolling logic
  const handleScroll = () => {
    if (!scrollParentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollParentRef.current;
    
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      fetchOrders();
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box p="6">
      <Heading mb="6">Order Management</Heading>

      <Box 
        ref={scrollParentRef}
        onScroll={handleScroll}
        height="70vh" 
        overflow="auto"
        border="1px solid" 
        borderColor="gray.200" 
        borderRadius="lg"
        bg="bg.panel"
      >
        <Table.Root variant="line" stickyHeader>
          <Table.Header css={{ "& th": { bg: "bg.panel", color: "fg" } }}>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Customer</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Total</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orders.map((order, index) => (
              <Table.Row key={`${order.id}-${index}`} _hover={{ bg: "bg.panel" }}>
                <Table.Cell fontWeight="bold">{order.id}</Table.Cell>
                <Table.Cell>{order.customer}</Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={order.status === "Completed" ? "green" : "orange"}>
                    {order.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell textAlign="end">{order.total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {loading && (
          <Center p="10">
            <Spinner size="xl" color="blue.500" />
          </Center>
        )}
      </Box>
    </Box>
  );
}