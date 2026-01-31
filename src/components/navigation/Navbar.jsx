import { Flex, IconButton, Text, HStack, Box } from "@chakra-ui/react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import ColorModeToggle from "../ColorModeToggle";

const Navbar = ({ onMenuClick }) => {
  return (
    <Flex
      px="4"
      height="16"
      alignItems="center"
      bg="bg.panel"
      borderBottomWidth="1px"
      borderBottomColor="border"
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      {/* Hamburger Menu - Only visible on mobile */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onMenuClick}
        variant="solid"
        bg="bg.panel"
        focusRing="none"
        border="none"
        aria-label="open menu"
      >
        <FiMenu />
      </IconButton>

      <ColorModeToggle />

      {/* Right side items (Notifications, Profile) */}
      <HStack gap="4">
        <IconButton variant="ghost" bg="bg.panel" _hover={{color: "#ff8c00"}} border="none" focusRing="none" aria-label="notifications">
          <FiBell />
        </IconButton>

        <Box 
            p="2" 
            borderRadius="full" 
            bg="gray.400" 
            color="white.400"
            cursor="pointer"
        >
          <FiUser size="20" />
        </Box>
      </HStack>
    </Flex>
  );
};

export default Navbar;