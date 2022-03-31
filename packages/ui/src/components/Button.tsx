//custom chakra-ui button
import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

type CustomButtonProps = Omit<ButtonProps, 'size'> & {
  size: 'sm' | 'lg'
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  size = 'md',
  ...props
}) => (
  <Button
    size={size}
    fontWeight="bold"
    
    {...props}
  >
    {children}
  </Button>
)

export default CustomButton