import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";

import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@/components/ui/accordion";
import { Tooltip } from "@/components/ui/tooltip";
import {
  FiHome,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiShoppingCart,
} from "react-icons/fi";
import NavItem from "./NavItem";
import logoSvg from "../../assets/snapfox-logo.svg";

const NavGroup = ({ item, isCollapsed }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (isCollapsed) {
    return (
      <Tooltip content={item.label} placement="right" portalled>
        <Box width="full">
          <NavItem icon={item.icon} isCollapsed={true} to={item.to} />
        </Box>
      </Tooltip>
    );
  }

  if (!hasChildren) {
    return (
      <NavItem icon={item.icon} isCollapsed={false} to={item.to}>
        {item.label}
      </NavItem>
    );
  }

  return (
    <AccordionRoot
      collapsible // click to close
      variant="unstyled"
      width="full"
      defaultValue={[]} // Ensures it starts in a clean state
    >
      <AccordionItem value={item.label} border="none" bg="transparent">
        {/* We move the NavItem style INSIDE the trigger to ensure the trigger captures the click */}
        <AccordionItemTrigger p="0" width="full" _focus={{ boxShadow: "none" }}>
          <NavItem
            icon={item.icon}
            isCollapsed={false}
            as="div"
            width="full"
            pointerEvents="none" // Prevents the NavItem from blocking the Accordion click
          >
            {item.label}
          </NavItem>
        </AccordionItemTrigger>

        <AccordionItemContent>
          <VStack gap="1" ml="9" mt="1" align="stretch">
            {item.children.map((child) => (
              <NavItem
                key={child.label}
                isCollapsed={false}
                fontSize="xs"
                p="2"
              >
                {child.label}
              </NavItem>
            ))}
          </VStack>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};

const Sidebar = ({
  width = "240px",
  isCollapsed = false,
  onToggle,
  hideBelow,
  ...rest
}) => {
  const items = [
    { label: "Home", icon: <FiHome />, to: "/home" },
    {
      label: "Order",
      icon: <FiShoppingCart />,
      to: "/orders",
    },
    {
      label: "Settings",
      icon: <FiSettings />,
      to: "/settings",
      children: [{ label: "Subgrid A" }, { label: "Subgrid B" }],
    },
  ];

  return (
    <Box
      as="aside"
      bg="bg.panel"
      borderRightWidth="1px"
      borderRightColor="border"
      width={width}
      minW={width}
      display={{ base: hideBelow ? "none" : "block", md: "block" }}
      p="4"
      transition="width 0.2s ease"
      {...rest}
    >
      <Flex direction="column" height="full">
        {/* LOGO SECTION: Centered icon, no text */}
        <Flex align="center" justify="center" mb="8">
          <Box as="img" src={logoSvg} alt="Logo" w="24px" h="24px" />
        </Flex>

        {/* NAVIGATION SECTION */}
        <VStack align="stretch" gap="1">
          {items.map((item) => (
            <NavGroup key={item.label} item={item} isCollapsed={isCollapsed} />
          ))}
        </VStack>

        {/* SPACER: Pushes the toggle button to the bottom */}
        <Box flex="1" />

        {/* TOGGLE SECTION: Anchored at the end */}
        {onToggle && (
          <Flex
            justify={isCollapsed ? "center" : "flex-end"}
            pt="4"
            borderTopWidth="1px"
            borderTopColor="border"
          >
            <Tooltip
              content={isCollapsed ? "Expand" : "Collapse"}
              placement="right"
            >
              <IconButton
                aria-label="toggle-sidebar"
                size="md"
                variant="ghost"
                bg="bg.panel"
                focusRing="none"
                _hover={{ bg: "bg.panel", color: "#ff8c00", borderColor: "#ff8c00" }}
                color="gray.400"
                onClick={onToggle}
                width="auto"
                justifySelf="flex-end"
              >
                {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
              </IconButton>
            </Tooltip>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
