import { useColorStyles } from 'styles/colors'

import { Box, Flex, Text } from '@chakra-ui/react'

type NetworkBadgeProps = {
  network: string
}

const NetworkBadge = ({ network }: NetworkBadgeProps) => {
  const { styles } = useColorStyles()
  return (
    <Flex align='center' direction='column' justify='center'>
      <Text fontSize={'sm'} fontWeight='500'>
        You're connected to
      </Text>
      <Box bg={styles.backgroundInverted} borderRadius='16px' px='8px' py='4px'>
        <Text color={styles.textInverted} fontSize='sm' fontWeight='500'>
          {network}
        </Text>
      </Box>
    </Flex>
  )
}

export default NetworkBadge
