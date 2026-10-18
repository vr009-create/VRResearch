import type { DemoStatus } from './registry'

const styles: Record<DemoStatus, string> = {
  live: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
  'in-progress': 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  planned: 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
}

export default function StatusBadge({ status }: { status: DemoStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status.replace('-', ' ')}
    </span>
  )
}
