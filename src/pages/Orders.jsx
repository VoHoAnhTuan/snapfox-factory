import { useState, useEffect } from "react";
import {
  Box,
  Table,
  Badge,
  Spinner,
  Center,
  Heading,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { LuRefreshCw } from "react-icons/lu";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 15; // Smaller page size is usually better for classic pagination

  const fetchOrders = async (currentPage) => {
    setLoading(true);
    try {
      const response = await api.get("/order/get-all", {
        params: {
          p: currentPage,
          pageSize: pageSize,
        },
      });

      // If API returns a direct array: setOrders(response.data)
      // If API returns an object: setOrders(response.data.items)
      const data = response.data.items || response.data;
      setOrders(Array.isArray(data) ? data : []);

      // Calculate total pages if your API provides a total count
      const totalCount = response.data.totalCount || 0;
      setTotalPages(Math.ceil(totalCount / pageSize) || 1);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever the 'page' state changes
  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <Box p="6">
      <HStack color="fg" justify="space-between" mb="4">
        <Heading  mb="6">Order Management</Heading>
        <Button
          variant="ghost"
          size="xs"
          border="none"
          bg="bg.panel"
          _hover={{bgColor: "#ff8c00"}}
          onClick={() => fetchOrders(page)}
          disabled={loading}
          loading={loading}
        >
          <LuRefreshCw /> Refresh
        </Button>
      </HStack>

      <Box
        border="1px solid"
        borderColor="border"
        borderRadius="lg"
        bg="bg.panel"
        overflow="hidden"
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
            {loading ? (
              /* 1. Show Spinner while fetching */
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Center p="10">
                    <Spinner color="orange.500" />
                  </Center>
                </Table.Cell>
              </Table.Row>
            ) : orders.length === 0 ? (
              /* 2. Show "No order found" if API returns [] */
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Center p="10">
                    <Text color="fg.muted" fontWeight="medium">
                      No order found
                    </Text>
                  </Center>
                </Table.Cell>
              </Table.Row>
            ) : (
              /* 3. Show actual data if items exist */
              orders.map((order) => (
                <Table.Row key={order.id} _hover={{ bg: "bg.muted" }}>
                  <Table.Cell fontWeight="bold">{order.id}</Table.Cell>
                  <Table.Cell>{order.customer}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={
                        order.status === "Completed" ? "green" : "orange"
                      }
                    >
                      {order.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell textAlign="end">{order.total}</Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>

        {/* PAGINATION FOOTER */}
        <HStack
          p="4"
          justify="space-between"
          borderTopWidth="1px"
          borderColor="border"
        >
          <Text fontSize="sm" color="fg.muted">
            Page {page} of {totalPages}
          </Text>
          <HStack gap="2">
            <Button
              variant="outline"
              bg="bg.emphasized"
              _hover={{ backgroundColor: "#ff8c00", opacity: 0.8 }}
              border="none"
              size="sm"
              onClick={handlePrev}
              disabled={page === 1 || loading}
            >
              <LuChevronLeft /> Previous
            </Button>
            <Button
              variant="outline"
              bg="bg.emphasized"
              _hover={{ backgroundColor: "#ff8c00", opacity: 0.8 }}
              border="none"
              size="sm"
              onClick={handleNext}
              disabled={page === totalPages || loading}
            >
              Next <LuChevronRight />
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}
