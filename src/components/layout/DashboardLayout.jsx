import { Box, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "../navigation/Sidebar";
import Navbar from "../navigation/Navbar";
import { 
  DrawerRoot, 
  DrawerContent, 
  DrawerBody, 
  DrawerBackdrop 
} from "@/components/ui/drawer";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const SIDEBAR_WIDTH = isCollapsed ? "80px" : "240px";

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Desktop Sidebar */}
      <Sidebar 
        hideBelow="md" 
        width={SIDEBAR_WIDTH} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        position="fixed"
        h="full"
        transition="width 0.2s ease" // Smooth animation
        zIndex="sticky"
      />

      {/* Mobile Sidebar (Drawer) */}
      <DrawerRoot 
        open={mobileOpen} 
        onOpenChange={(e) => setMobileOpen(e.open)}
        placement="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerBody p="0">
             {/* Mobile sidebar is never collapsed for usability */}
             <Sidebar width="full" onSelect={() => setMobileOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      {/* Main Content Area */}
      <Stack 
        gap="0" 
        ml={{ base: 0, md: SIDEBAR_WIDTH }} 
        transition="margin-left 0.2s ease"
      >
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <Box as="main" p="6">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}