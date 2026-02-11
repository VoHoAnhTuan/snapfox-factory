import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      bg="bg.panel"
      focusRing="none"
      border="none"
      _hover={{color: "#ff8c00", bg: "bg.muted"}}
    >
      {colorMode === "light" ? <LuMoon /> : <LuSun />}
    </IconButton>
  );
}