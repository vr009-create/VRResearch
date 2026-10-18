import { useState } from 'react'

// A minimal demo to copy when starting a new one.
export default function StarterDemo() {
  const [items, setItems] = useState<string[]>(['Ingest a concept into the wiki', 'Write a plan', 'Build the demo'])
  const [draft, setDraft] = useState('')

  const add = () => {
    if (!draft.trim()) return
    setItems([...items, draft.trim()])
    setDraft('')
  }

  return (
    <div className="max-w-md">
      <h2 className="font-semibold">Research loop</h2>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-stone-700 dark:text-stone-300">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          add()
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a step"
          className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-transparent px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-stone-700"
        />
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Add</button>
      </form>
    </div>
  )
}
