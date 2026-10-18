import type { FieldDef, FieldValue } from './schema'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})
const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export const isEmpty = (value: FieldValue | undefined) => value === null || value === undefined || value === ''

export function formatDate(value: string) {
  return date.format(new Date(value))
}

/** Plain-text rendering of a field value; `compact` shortens large currency for header tiles. */
export function formatValue(field: FieldDef, value: FieldValue | undefined, compact = false): string {
  if (isEmpty(value)) return '—'
  switch (field.type) {
    case 'currency':
      return (compact ? compactCurrency : currency).format(Number(value))
    case 'percent':
      return `${Number(value).toFixed(1)}%`
    case 'date':
      return formatDate(String(value))
    case 'boolean':
      return value ? 'Yes' : 'No'
    default:
      return String(value)
  }
}
