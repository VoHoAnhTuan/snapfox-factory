import { Box, Flex, Text, IconButton, VStack } from "@chakra-ui/react";
import { 
  AccordionRoot, 
  AccordionItem, 
  AccordionItemTrigger, 
  AccordionItemContent 
} from "@/components/ui/accordion";
import { FiHome, FiSettings, FiChevronLeft, FiChevronRight, FiGrid } from "react-icons/fi";
import NavItem from "./NavItem";

const NavGroup = ({ item, isCollapsed }) => {
  const hasChildren = item.children && item.children.length > 0;

  // If collapsed, just show the icon (Tooltip logic can be added here)
  if (isCollapsed) {
    return <NavItem icon={item.icon} isCollapsed={true} />;
  }

  if (!hasChildren) {
    return <NavItem icon={item.icon} isCollapsed={false}>{item.label}</NavItem>;
  }

  return (
    <AccordionRoot collapsable variant="unstyled" width="full">
      <AccordionItem value={item.label} border="none">
        {/* We use the Trigger to wrap our NavItem style */}
        <AccordionItemTrigger p="0" _hover={{ bg: "transparent" }}>
          <NavItem icon={item.icon} isCollapsed={false} as="div">
            <Flex align="center" justify="space-between" width="full">
              {item.label}
              {/* Accordion snippet usually handles the arrow automatically */}
            </Flex>
          </NavItem>
        </AccordionItemTrigger>
        
        <AccordionItemContent pb="2">
          <VStack gap="1" ml="9" align="stretch">
            {item.children.map((child) => (
              <NavItem key={child.label} isCollapsed={false} fontSize="xs" p="2">
                {child.label}
              </NavItem>
            ))}
          </VStack>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};