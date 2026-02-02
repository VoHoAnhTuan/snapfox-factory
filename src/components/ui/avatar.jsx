import { Avatar as ChakraAvatar, Group } from "@chakra-ui/react"
import * as React from "react"

export const Avatar = React.forwardRef(function Avatar(props, ref) {
  const { name, src, srcSet, loading, icon, fallback, children, ...rest } = props
  return (
    <ChakraAvatar.Root ref={ref} {...rest}>
      <AvatarFallback name={name} icon={icon}>
        {fallback || children}
      </AvatarFallback>
      <ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} />
    </ChakraAvatar.Root>
  )
})

const AvatarFallback = (props) => {
  const { name, icon, children, ...rest } = props
  return (
    <ChakraAvatar.Fallback {...rest}>
      {children}
      {name != null && children == null && <>{getInitials(name)}</>}
      {name == null && children == null && (
        <ChakraAvatar.Icon asChild={!!icon}>{icon}</ChakraAvatar.Icon>
      )}
    </ChakraAvatar.Fallback>
  )
}

function getInitials(name) {
  const names = name.trim().split(" ")
  const firstName = names[0] ?? ""
  const lastName = names.length > 1 ? names[names.length - 1] : ""
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

export const AvatarGroup = React.forwardRef(function AvatarGroup(props, ref) {
  const { size, variant, borderless, ...rest } = props
  return (
    <ChakraAvatar.Context value={{ size, variant, borderless }}>
      <Group ref={ref} {...rest} />
    </ChakraAvatar.Context>
  )
})