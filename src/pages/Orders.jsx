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
  IconButton,
} from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { LuRefreshCw } from "react-icons/lu";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const columnCount = 10;
  const pageSize = 100;

  const fetchOrders = async (currentPage) => {
    setLoading(true);
    try {
      const response = await api.get("/api/order/get-all", {
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
      const totalCount = response.data.totalCount || 10;
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

  return (
    <Box p="6">
      <HStack color="fg" justify="space-between" mb="4">
        <Heading mb="6">Order Management</Heading>
        <Button
          variant="ghost"
          size="xs"
          border="none"
          bg="bg.panel"
          _hover={{ bgColor: "#ff8c00" }}
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
        maxHeight="xl"
        overflowX="auto"
        overflowY="auto"
      >
        <Table.Root variant="line" stickyHeader>
          <Table.Header css={{ "& th": { bg: "bg.panel", color: "fg" } }}>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>orderGroupId</Table.ColumnHeader>
              <Table.ColumnHeader>userId</Table.ColumnHeader>
              <Table.ColumnHeader>sellerId</Table.ColumnHeader>
              <Table.ColumnHeader>Customer</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Total</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {loading ? (
              /* 1. Show Spinner while fetching */
              <Table.Row>
                <Table.Cell colSpan={columnCount}>
                  <Center p="10">
                    <Spinner color="orange.500" />
                  </Center>
                </Table.Cell>
              </Table.Row>
            ) : orders.length === 0 ? (
              /* 2. Show "No order found" if API returns [] */
              <Table.Row>
                <Table.Cell colSpan={columnCount}>
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
                  <Table.Cell>{order.customer}</Table.Cell>
                  <Table.Cell>{order.customer}</Table.Cell>
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
      </Box>
      {/* PAGINATION FOOTER */}
      <HStack p="4" justify="space-between">
        <Text fontSize="xs" color="fg.muted">
          Total Pages: {totalPages}
        </Text>
        <HStack gap="1">
          <IconButton
            variant="ghost"
            size="xs"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || loading}
          >
            <LuChevronLeft />
          </IconButton>

          {/* Pages menu */}
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant="outline" size="xs" minW="14" disabled={loading}>
                Page {page}
              </Button>
            </MenuTrigger>
            <MenuContent maxH="200px" overflowY="auto" portalled>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <MenuItem
                    key={pageNum}
                    value={pageNum.toString()}
                    onClick={() => setPage(pageNum)}
                    bg={page === pageNum ? "orange.500" : "transparent"}
                    color={page === pageNum ? "white" : "inherit"}
                  >
                    Page {pageNum}
                  </MenuItem>
                ),
              )}
            </MenuContent>
          </MenuRoot>
          <IconButton
            variant="ghost"
            size="xs"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || loading}
          >
            <LuChevronRight />
          </IconButton>
        </HStack>
      </HStack>
    </Box>
  );
}
