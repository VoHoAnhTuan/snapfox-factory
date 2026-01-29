import { Heading, Box, Table, Badge, Text } from "@chakra-ui/react";

export default function Orders() {
  // This is where your teammate will eventually fetch data from ASP.NET
  const mockOrders = [
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
    { id: "1001", customer: "John Doe", status: "Completed", total: "$120.00" },
    { id: "1002", customer: "Jane Smith", status: "Pending", total: "$45.50" },
    { id: "1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
  ];

  return (
    <Box>
      <Heading size="2xl" mb="6" color="gray.900">Orders</Heading>


      
      <Box border="1px solid" borderColor="gray.200" borderRadius="lg" height="70vh" overflow="auto">
        <Table.Root variant="line" size="md" color="gray.700" stickyHeader css={{ "& th": { bg: "blue.100", fontWeight: "bold", color: "gray.700" } }}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader >Order ID</Table.ColumnHeader>
              <Table.ColumnHeader >Customer</Table.ColumnHeader>
              <Table.ColumnHeader >Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Total</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockOrders.map((order) => (
              <Table.Row key={order.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell fontWeight="medium">{order.id}</Table.Cell>
                <Table.Cell>{order.customer}</Table.Cell>
                <Table.Cell>
                  <Badge 
                    colorPalette={order.status === "Completed" ? "green" : order.status === "Pending" ? "orange" : "red"}
                  >
                    {order.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell textAlign="end">{order.total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}