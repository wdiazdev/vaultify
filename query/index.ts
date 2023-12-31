const baseURL = 'https://api.coingecko.com/api/v3'

export const singleCoin = async (coin: string) => {
  const response = await fetch(
    `${baseURL}/coins/markets?vs_currency=usd&ids=${coin}`
  )
  const result = await response.json()
  return result[0]
}

export const marketCap = async () => {
  const response = await fetch(`${baseURL}/global/`)
  const result = await response.json()
  return result
}

export const coinsData = async () => {
  const response = await fetch(
    `${baseURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  )
  const result = await response.json()
  return result
}

export const trendingCoins = async () => {
  const response = await fetch(`${baseURL}/search/trending`)
  const result = await response.json()
  return result
}

export const fetchCoinData = async (id: string) => {
  const response = await fetch(`${baseURL}/coins/${id}`)
  const result = await response.json()
  return result
}

export const historicalChartData = async (id: string, days: string) => {
  const response = await fetch(
    `${baseURL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  )
  const result = await response.json()
  return result
}
