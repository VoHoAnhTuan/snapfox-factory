import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import NavItem from "./NavItem";

// 1. Define the component
const Sidebar = ({ onClose, ...rest }) => {
  return (
    <Box
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      h="full"
      {...rest}
    >
      <Flex h="20" align="center" mx="8" justify="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="blue.600">Logo</Text>
        {/* Only show close button on mobile */}
        <IconButton 
          display={{ base: "flex", md: "none" }} 
          onClick={onClose} 
          variant="ghost"
        >
          <FiX />
        </IconButton>
      </Flex>
      
      {/* Navigation items go here */}
      <NavItem icon={null}>Dashboard</NavItem>
    </Box>
  );
};

export default Sidebar;