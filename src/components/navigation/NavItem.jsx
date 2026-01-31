import { Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, children, to, isCollapsed, ...rest }) => {
  return (
    <Flex
      as={to ? Link : "div"} //If 'to' exists, act as a Link; otherwise stay a div
      to={to}
      align="center"
      p="3"
      borderRadius="md"
      cursor="pointer"
      width="full"
      transition="all 0.2s"
      color="gray.500"
      // Parent controls the hover state
      _hover={{ bg: "bg.panel", color: "#ff8c00" }}
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