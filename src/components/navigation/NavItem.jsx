import { Flex, Icon, Box } from '@chakra-ui/react';

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      width="full"
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        cursor="pointer"
        _hover={{ bg: 'blue.500', color: 'white' }}
        transition="background 0.2s"
        {...rest}
      >
        {icon && (
          <Box mr="4" fontSize="18">
            {icon}
          </Box>
        )}
        {children}
      </Flex>
    </Box>
  );
};

// THIS IS THE MISSING PIECE
export default NavItem;