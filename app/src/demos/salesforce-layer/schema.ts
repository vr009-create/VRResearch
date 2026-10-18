// Field and record shapes modeled on Salesforce describe/UI API results, so live mode
// can fill them from the org while showcase mode uses mock data.

export type FieldType =
  | 'text'
  | 'currency'
  | 'percent'
  | 'date'
  | 'picklist'
  | 'boolean'
  | 'phone'
  | 'email'
  | 'url'
  | 'address'
  | 'lookup'
  | 'masked'

export interface FieldDef {
  apiName: string
  label: string
  type: FieldType
  section: string
}

export interface SectionDef {
  id: string
  label: string
}

export type FieldValue = string | number | boolean | null

export interface RelatedContact {
  name: string
  title: string
  email: string
  primary?: boolean
}

export interface RelatedOpportunity {
  name: string
  stage: string
  amount: number
  closeDate: string
}

export interface RelatedCase {
  number: string
  subject: string
  status: string
  priority: 'High' | 'Medium' | 'Low'
}

export interface Activity {
  kind: 'call' | 'email' | 'meeting' | 'task'
  subject: string
  date: string
  who: string
}

// Financial Services Cloud components that appear on the Wealth Management Account page.
export interface Alert {
  severity: 'info' | 'warning' | 'critical'
  message: string
}

export interface Milestone {
  label: string
  date: string
}

export interface InteractionSummary {
  title: string
  date: string
  author: string
  summary: string
}

export interface AccountRecord {
  id: string
  values: Record<string, FieldValue>
  contacts: RelatedContact[]
  opportunities: RelatedOpportunity[]
  cases: RelatedCase[]
  activities: Activity[]
  alerts: Alert[]
  milestones: Milestone[]
  interestTags: string[]
  interactions: InteractionSummary[]
}
