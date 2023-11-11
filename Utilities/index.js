const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency'
})

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number)
}

export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatNumber(number) {
  if (typeof number !== 'number') {
    return null
  }

  return (number / 1e12).toFixed(2)
}
