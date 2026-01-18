import { Box, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "../navigation/Sidebar";
import Navbar from "../navigation/Navbar";
// Import the specific named exports from your snippet
import { 
  DrawerRoot, 
  DrawerContent, 
  DrawerBody, 
  DrawerBackdrop 
} from "@/components/ui/drawer";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box minH="100vh" minW="100vw" bg="gray.50">
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar 
        hideBelow="md" 
        width="240px" 
        position="fixed" 
      />

      {/* Mobile Sidebar using your specific Drawer snippets */}
      <DrawerRoot 
        open={mobileOpen} 
        onOpenChange={(e) => setMobileOpen(e.open)}
        placement="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerBody p="0">
             <Sidebar width="full" onSelect={() => setMobileOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      {/* Main Content Area */}
      <Stack gap="0" ml={{ base: 0, md: "240px" }}>
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <Box as="main" p="6">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}