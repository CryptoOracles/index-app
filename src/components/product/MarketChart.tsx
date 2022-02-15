import { useEffect, useState } from 'react'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { colors } from 'styles/colors'
import { selectedTabStyle } from 'styles/tabs'

import { Box, Flex } from '@chakra-ui/layout'
import { Tab, TabList, Tabs, Text, useTheme } from '@chakra-ui/react'

export enum Durations {
  DAILY = 0,
  WEEKLY = 1,
  MONTHLY = 2,
  QUARTERLY = 3,
  YEARLY = 4,
}

export enum PriceChartRangeOption {
  DAILY_PRICE_RANGE = 1,
  WEEKLY_PRICE_RANGE = 7,
  MONTHLY_PRICE_RANGE = 30,
  QUARTERLY_PRICE_RANGE = 90,
  YEARLY_PRICE_RANGE = 365,
}

interface MarketChartOptions {
  width?: number
  hideYAxis?: boolean
}

export interface PriceChartData {
  x: number
  y1: number
  y2?: number
  y3?: number
  y4?: number
  y5?: number
}

const MarketChart = (props: {
  marketData: PriceChartData[][]
  prices: string[]
  priceChanges: string[]
  options: MarketChartOptions
  customSelector?: any
  onMouseMove?: (...args: any[]) => any
  onMouseLeave?: (...args: any[]) => any
}) => {
  const theme = useTheme()
  const formatFloats = (n: number) => n.toFixed(2)
  const [chartData, setChartData] = useState<PriceChartData[]>([])
  const [durationSelector, setDurationSelector] = useState<number>(
    Durations.DAILY
  )

  useEffect(() => {
    const index = durationSelector
    const chartData = props.marketData[index]
    setChartData(chartData)
  }, [durationSelector, props.marketData])

  const onChangeDuration = (index: number) => {
    switch (index) {
      case 0:
        setDurationSelector(Durations.DAILY)
        break
      case 1:
        setDurationSelector(Durations.WEEKLY)
        break
      case 2:
        setDurationSelector(Durations.MONTHLY)
        break
      case 3:
        setDurationSelector(Durations.QUARTERLY)
        break
      case 4:
        setDurationSelector(Durations.YEARLY)
        break
    }
  }

  const dateFormatterOptions = (
    duration: Durations
  ): Intl.DateTimeFormatOptions => {
    switch (duration) {
      case Durations.DAILY:
        return {
          hour: '2-digit',
        }
      default:
        return {
          month: 'short',
          day: '2-digit',
        }
    }
  }

  // TODO: ?
  const formatToolTip = (chartData: any) => {
    if (!chartData) return ['--', 'No Data Available']
    const {
      payload: { x, y },
    } = chartData
    let timeString = new Date(x).toLocaleDateString()
    if (durationSelector === Durations.DAILY) {
      timeString = new Date(x).toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
      })
    }
    return [timeString, '$' + formatFloats(y)]
  }

  const xAxisTickFormatter = (val: any | null | undefined) => {
    var options = dateFormatterOptions(durationSelector)
    return new Date(val).toLocaleString(undefined, options)
  }

  const yAxisTickFormatter = (val: any | null | undefined) => {
    if (val === undefined || val === null) {
      return ''
    }
    return `$${parseInt(val)}`
  }

  const minY = Math.min(
    ...chartData.map<number>((data) =>
      Math.min(
        data.y1,
        data.y2 ?? data.y1,
        data.y3 ?? data.y1,
        data.y4 ?? data.y1,
        data.y5 ?? data.y1
      )
    )
  )
  const maxY = Math.max(
    ...chartData.map<number>((data) =>
      Math.max(
        data.y1,
        data.y2 ?? data.y1,
        data.y3 ?? data.y1,
        data.y4 ?? data.y1,
        data.y5 ?? data.y1
      )
    )
  )
  const minYAdjusted = minY > 4 ? minY - 5 : 0
  const yAxisDomain = [minYAdjusted, maxY + 5]

  return (
    <Flex direction='column' alignItems='center' width='100%'>
      <Flex
        direction='row'
        width='100%'
        alignItems='center'
        justifyContent='space-between'
        mb='24px'
      >
        <PriceDisplay
          price={props.prices[durationSelector]}
          change={props.priceChanges[durationSelector]}
          customSelector={props.customSelector}
        />
        <RangeSelector onChange={onChangeDuration} />
      </Flex>
      <AreaChart
        width={props.options.width ?? 900}
        height={400}
        data={chartData}
      >
        <CartesianGrid stroke={colors.icWhite} strokeOpacity={0.2} />
        <YAxis
          axisLine={false}
          domain={yAxisDomain}
          stroke={strokeColor}
          tickCount={10}
          tickFormatter={yAxisTickFormatter}
          tickLine={false}
          hide={props.options.hideYAxis ?? true}
        />
        <XAxis
          axisLine={false}
          dataKey='x'
          dy={10}
          interval='preserveStart'
          minTickGap={100}
          stroke={strokeColor}
          tickCount={6}
          tickFormatter={xAxisTickFormatter}
          tickLine={false}
        />
        <Area
          type='monotone'
          dataKey='y1'
          stroke={theme.colors.icApricot}
          fill={theme.colors.icApricot}
        />
        <Area
          type='monotone'
          dataKey='y2'
          stroke={theme.colors.icBlue}
          fill={theme.colors.icBlue}
        />
        <Area
          type='monotone'
          dataKey='y3'
          stroke={theme.colors.icPeriwinkle}
          fill={theme.colors.icPeriwinkle}
        />
        <Area
          type='monotone'
          dataKey='y4'
          stroke={theme.colors.icLazurite}
          fill={theme.colors.icLazurite}
        />
        <Area
          type='monotone'
          dataKey='y5'
          stroke={theme.colors.icYellow}
          fill={theme.colors.icYellow}
        />
      </AreaChart>
    </Flex>
  )
}

const PriceDisplay = ({
  price,
  change,
  customSelector,
}: {
  price: string
  change: string
  customSelector: any
}) => (
  <Flex align='center'>
    <Flex align='baseline'>
      <Text fontSize='5xl' color={colors.icYellow} fontWeight='700'>
        {price}
      </Text>
      <Text fontSize='xl' color={colors.icMalachite} fontWeight='700' ml='24px'>
        {change}
      </Text>
    </Flex>
    <Box ml='24px' mt='8px'>
      {customSelector !== null && customSelector}
    </Box>
  </Flex>
)

const RangeSelector = ({ onChange }: { onChange: (index: number) => void }) => (
  <Tabs
    background='#1D1B16'
    borderRadius='8px'
    fontSize='16px'
    fontWeight='500'
    color={colors.icWhite}
    height='45px'
    outline='0'
    variant='unstyle'
    onChange={onChange}
  >
    <TabList>
      <Tab _selected={selectedTabStyle}>1D</Tab>
      <Tab _selected={selectedTabStyle}>1W</Tab>
      <Tab _selected={selectedTabStyle}>1M</Tab>
    </TabList>
  </Tabs>
)

const strokeColor = colors.gray[500]

export default MarketChart
