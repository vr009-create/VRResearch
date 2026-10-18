import { formatValue, isEmpty } from './format'
import type { FieldDef, FieldValue } from './schema'

const link = 'text-blue-700 hover:underline dark:text-blue-400'

export default function FieldValueView({ field, value }: { field: FieldDef; value: FieldValue | undefined }) {
  if (isEmpty(value)) return <span className="text-stone-400 dark:text-stone-600">—</span>

  const text = formatValue(field, value)
  switch (field.type) {
    case 'phone':
      return <a href={`tel:${text}`} className={link}>{text}</a>
    case 'email':
      return <a href={`mailto:${text}`} className={link}>{text}</a>
    case 'url':
      return <a href={text} className={link}>{text}</a>
    case 'lookup':
      return <span className={link}>{text}</span>
    case 'address':
      return <span className="whitespace-pre-line">{text}</span>
    case 'masked':
      return <span className="font-mono tracking-wider">{text}</span>
    default:
      return <span>{text}</span>
  }
}
