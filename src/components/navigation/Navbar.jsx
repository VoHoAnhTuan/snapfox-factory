import { Flex, IconButton, Text, HStack, Box, VStack } from "@chakra-ui/react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import ColorModeToggle from "../ColorModeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from "@/components/ui/menu";
import { LuLogOut, LuUser } from "react-icons/lu";


const Navbar = ({ onMenuClick }) => {
  const { name, title } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT token
    window.location.href = "/login"; // Redirect to login page
  };

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
      <IconButton
        mr="2"
        variant="ghost"
        bg="bg.panel"
        _hover={{ color: "#ff8c00" }}
        border="none"
        focusRing="none"
        aria-label="notifications"
      >
        <FiBell />
      </IconButton>

      {/* Profile */}
      <MenuRoot>
        <MenuTrigger asChild>
          <HStack gap="3" cursor="pointer" _hover={{ opacity: 0.8 }}>
            <VStack gap="0" align="flex-start" lineHeight="shorter">
              <Text fontWeight="bold" fontSize="sm" color="fg">
                {name}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {title}
              </Text>
            </VStack>
            <Avatar name={name} size="sm" />
          </HStack>
        </MenuTrigger>

        <MenuContent>
          <MenuItem value="profile" valueText="Profile">
            <LuUser /> Profile
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            value="logout"
            color="red.500"
            onClick={handleLogout}
            _hover={{ bg: "red.50" }}
          >
            <LuLogOut /> Logout
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Flex>
  );
};

export default Navbar;
