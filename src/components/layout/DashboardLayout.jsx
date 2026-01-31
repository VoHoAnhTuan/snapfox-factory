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

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  

  const SIDEBAR_WIDTH = isCollapsed ? "80px" : "240px";

  return (
    <Box minH="100vh" minW="100vw" bg="bg.panel">
      {/* Desktop Sidebar */}
      <Sidebar
        hideBelow="md" 
        width={SIDEBAR_WIDTH} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        position="fixed"
        h="full"
        transition="width 0.2s ease"
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
             <Sidebar width="full" height="full" onSelect={() => setMobileOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      {/* Main Content Area */}
      <Stack 
        gap="0" 
        ml={{ base: 0, md: SIDEBAR_WIDTH }} 
        transition="margin-left 0.2s ease"
        minH="100vh"
      >
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        
        {/* 2. Update this Box to use Outlet */}
        <Box as="main" p="6" flex="1">
          <Outlet /> 
        </Box>
      </Stack>
    </Box>
  );
}