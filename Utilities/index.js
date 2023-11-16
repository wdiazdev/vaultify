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

export function formatNumberBN(number) {
  if (number >= 1e9) {
    // Convert billions to Bn
    return (
      (number / 1e9).toLocaleString('en-US', { maximumFractionDigits: 0 }) +
      'Bn'
    )
  } else {
    // Use default formatting for numbers less than a billion
    return number.toLocaleString('en-US')
  }
}
