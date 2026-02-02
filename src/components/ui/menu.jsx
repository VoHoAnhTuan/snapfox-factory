import { Menu as ChakraMenu, Portal } from "@chakra-ui/react"
import * as React from "react"

export const MenuRoot = ChakraMenu.Root
export const MenuTrigger = ChakraMenu.Trigger
export const MenuContent = React.forwardRef(function MenuContent(props, ref) {
  return (
    <Portal>
      <ChakraMenu.Positioner>
        <ChakraMenu.Content ref={ref} {...props} />
      </ChakraMenu.Positioner>
    </Portal>
  )
})
export const MenuItem = ChakraMenu.Item
export const MenuSeparator = ChakraMenu.Separator