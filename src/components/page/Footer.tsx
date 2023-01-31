import { colors, useColorStyles } from 'styles/colors'

import { Flex, Image, Link, Text } from '@chakra-ui/react'

import indexLogoFullBlack from 'assets/index-logo-full-black.png'
import indexLogoFullWhite from 'assets/index-logo-full-white.png'

const Footer = () => {
  const { isDarkMode, styles } = useColorStyles()
  return (
    <Flex
      flexDir={'column'}
      alignItems='center'
      m={[
        '80px auto 64px',
        '96px auto 64px',
        '96px auto 64px',
        '96px auto 64px',
      ]}
      w='100vw'
    >
      <Flex
        direction='column'
        p={['32px', '32px', '32px', 0]}
        w={['100%', '100%', '100%', '1024px']}
      >
        <Links textColor={styles.text2} />
        <Flex m={'40px 0'}>
          <Logo isDarkMode={isDarkMode} />
        </Flex>
        <Disclaimer />
      </Flex>
    </Flex>
  )
}

const Disclaimer = () => (
  <Flex direction='column'>
    <Text fontSize={'2xs'}>
      Disclaimer: This content is for informational purposes only and is not
      legal, tax, investment, financial, or other advice. You should not take,
      or refrain from taking, any action based on any information contained
      herein, or any other information that we make available at any time,
      including blog posts, data, articles, links to third-party content,
      discord content, news feeds, tutorials, tweets, and videos. Before you
      make any financial, legal, technical, or other decisions, you should seek
      independent professional advice from a licensed and qualified individual
      in the area for which such advice would be appropriate. This information
      is not intended to be comprehensive or address all aspects of Index or its
      products. There is additional documentation on Index’s website about the
      functioning of Index Coop, and its ecosystem and community.
      <br />
      <br />
      You shall not purchase or otherwise acquire any of our token products if
      you are: a citizen, resident (tax or otherwise), green card holder,
      incorporated in, owned or controlled by a person or entity in, located in,
      or have a registered office or principal place of business in the U.S. (a
      “U.S. Person”), or if you are a person in any jurisdiction in which such
      offer, sale, and/or purchase of any of our token products is unlawful,
      prohibited, or unauthorized (together with U.S. Person, a “Restricted
      Person”). The term “Restricted Person” includes, but is not limited to,
      any natural person residing in, or any firm, company, partnership, trust,
      corporation, entity, government, state or agency of a state, or any other
      incorporated or unincorporated body or association, association or
      partnership (whether or not having separate legal personality) that is
      established and/or lawfully existing under the laws of, a jurisdiction in
      which such offer, sale, and/or purchase of any of our token products is
      unlawful, prohibited, or unauthorized). You shall not resell or otherwise
      transfer any of our token products to any Restricted Person. The transfer
      or resale of any of our token products to any Restricted Person is not
      permitted. Click{' '}
      <Link
        target={'_blank'}
        href='https://indexcoop.com/legal/tokens-restricted-for-us-persons'
        textDecoration={'underline'}
      >
        here
      </Link>{' '}
      to view the list of Tokens Restricted for Restricted Persons. You shall
      read the{' '}
      <Link
        target={'_blank'}
        href='https://indexcoop.com/legal/terms-of-service'
        textDecoration={'underline'}
      >
        Terms of Service
      </Link>{' '}
      and use our Website in compliance with the Terms of Service.
    </Text>
  </Flex>
)

const Links = ({ textColor }: { textColor: string }) => (
  <Flex direction={['column', 'column', 'column', 'row']}>
    <Flex direction={['column', 'column', 'column', 'column']}>
      <Link
        color={textColor}
        href='https://immunefi.com/bounty/indexcoop/'
        isExternal
      >
        <Text color={textColor} mr='4'>
          Bug Bounty
        </Text>
      </Link>
      <Link
        color={textColor}
        href='https://legacyproducts.indexcoop.com/'
        isExternal
      >
        <Text color={textColor} mr='4'>
          Legacy Products
        </Text>
      </Link>
      <Link
        color={textColor}
        href='https://archive.indexcoop.com/liquidity-mining'
        isExternal
      >
        <Text color={textColor} mr='4'>
          Liquidity Mining (discontinued)
        </Text>
      </Link>
    </Flex>
    <Flex
      direction={['column', 'column', 'column', 'column']}
      ml={[0, 0, 0, 20]}
    >
      <Link color={textColor} href='https://indexcoop.com/legal/privacy-policy'>
        <Text color={textColor} mr='4'>
          Privacy Policy
        </Text>
      </Link>
      <Link
        color={textColor}
        href='https://indexcoop.com/legal/terms-of-service'
      >
        <Text color={textColor} mr='4'>
          Terms of Service
        </Text>
      </Link>
      <Link
        color={textColor}
        href='https://indexcoop.com/legal/tokens-restricted-for-us-persons'
      >
        <Text color={textColor} mr='4'>
          Tokens Restricted for US Persons
        </Text>
      </Link>
    </Flex>
  </Flex>
)

const Logo = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const fullLogo = isDarkMode ? indexLogoFullWhite : indexLogoFullBlack
  return (
    <Image src={fullLogo} alt='Index Coop Logo' minWidth='24px' height='24px' />
  )
}

export default Footer
