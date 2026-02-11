"use client";

import { IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LuMaximize, LuMinimize } from "react-icons/lu";

export const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Sync state if user exits via 'Esc' key
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const handleToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <IconButton
      variant="ghost"
      aria-label="Toggle Fullscreen"
      bg="bg.panel"
      border="none"
      onClick={handleToggle}
      size="sm"
      color="fg.muted"
      _hover={{ color: "orange.500", bg: "bg.muted" }}
    >
      {isFullscreen ? <LuMinimize /> : <LuMaximize />}
    </IconButton>
  );
};