const Menu = {
  parts: ['menu', 'button', 'item', 'list'],
  baseStyle: {
    menu: {
      boxShadow: 'lg',
      rounded: 'lg',
      flexDirection: 'column',
      py: '2',
      color: 'white',
      borderColor: 'whiteAlpha.50',
    },
    list: {
      bg: 'blackAlpha.800',
    },
    item: {
      fontWeight: 'medium',
      lineHeight: 'tall',
      color: 'white',
      _hover: { bg: 'link.500' },
      _active: { bg: 'link.500' },
      _focus: { bg: 'link.500' },
    },
  },
  sizes: {},
  defaultProps: {
    size: 'md',
  },
};

export default Menu;
