import { Box, Flex, Text, IconButton, VStack } from "@chakra-ui/react";
import { FiHome, FiSettings, FiChevronLeft, FiChevronRight, FiGrid } from "react-icons/fi";
import NavItem from "./NavItem";

const Sidebar = ({ isCollapsed, onToggle, ...rest }) => {
  return (
    <Box 
      bg="white" 
      borderRight="1px solid" 
      borderColor="gray.200" 
      h="full" 
      overflow="hidden"
      {...rest}
    >
      <Flex h="16" align="center" px={isCollapsed ? "0" : "6"} justify="center">
        {/* Hide text when collapsed to save space */}
        {!isCollapsed && (
          <Text fontSize="xl" fontWeight="bold" color="blue.600" flex="1">
            SnapFox
          </Text>
        )}
        
        <IconButton 
          onClick={onToggle} 
          variant="ghost" 
          size="sm"
          aria-label="Toggle Sidebar"
          color="gray.500"
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </IconButton>
      </Flex>
      
      <VStack gap="2" mt="4" px="2">
        <NavItem icon={<FiHome />} isCollapsed={isCollapsed}>Dashboard</NavItem>
        <NavItem icon={<FiGrid />} isCollapsed={isCollapsed}>Projects</NavItem>
        <NavItem icon={<FiSettings />} isCollapsed={isCollapsed}>Settings</NavItem>
      </VStack>
    </Box>
  );
};

export default Sidebar;