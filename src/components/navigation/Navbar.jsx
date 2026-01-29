import { Flex, IconButton, Text, HStack, Box } from "@chakra-ui/react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

const Navbar = ({ onMenuClick }) => {
  return (
    <Flex
      px="4"
      height="16"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      {/* Hamburger Menu - Only visible on mobile */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onMenuClick}
        variant="solid"
        bg="transparent"
        focusRing="none"
        border="none"
        aria-label="open menu"
      >
        <FiMenu />
      </IconButton>

      {/* Right side items (Notifications, Profile) */}
      <HStack gap="4">
        <IconButton variant="ghost" bg="transparent" border="none" focusRing="none" aria-label="notifications">
          <FiBell />
        </IconButton>
        <Box 
            p="2" 
            borderRadius="full" 
            bg="blue.50" 
            color="blue.600"
            cursor="pointer"
        >
          <FiUser size="20" />
        </Box>
      </HStack>
    </Flex>
  );
};

export default Navbar;