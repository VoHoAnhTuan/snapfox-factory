import { Flex, Box, Text } from "@chakra-ui/react";

const NavItem = ({ icon, children, isCollapsed, ...rest }) => {
  return (
    <Flex
      align="center"
      p="3"
      borderRadius="md"
      cursor="pointer"
      width="full"
      transition="all 0.2s"
      color="gray.500"
      // Parent controls the hover state
      _hover={{ bg: "gray.100", color: "#ff8c00" }}
      justify={isCollapsed ? "center" : "flex-start"}
      {...rest}
    >
      <Box
        fontSize="20"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Box>

      {!isCollapsed && (
        <Text ml="4" fontWeight="medium" fontSize="sm" whiteSpace="nowrap">
          {children}
        </Text>
      )}
    </Flex>
  );
};

export default NavItem;