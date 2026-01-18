import { Flex, Box, Text } from "@chakra-ui/react";

const NavItem = ({ icon, children, isCollapsed, ...rest }) => {
  return (
    <Flex
      align="center"
      p="3"
      borderRadius="md"
      cursor="pointer"
      color="gray.400"
      _hover={{ bg: "gray.300", color: "#ff8c00" }}
      justify={isCollapsed ? "center" : "flex-start"}
      width="full"
      transition="all 0.2s"
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
