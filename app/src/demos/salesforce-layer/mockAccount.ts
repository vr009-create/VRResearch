import type { AccountRecord, FieldDef, SectionDef } from './schema'

// Fictional sample data for showcase mode. Never put real client data here — this repo is public.

export const sections: SectionDef[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'contact', label: 'Contact information' },
  { id: 'financial', label: 'Financial profile' },
  { id: 'relationship', label: 'Relationship' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'system', label: 'System information' },
]

export const fields: FieldDef[] = [
  { apiName: 'Name', label: 'Account name', type: 'text', section: 'overview' },
  { apiName: 'AccountNumber', label: 'Account number', type: 'text', section: 'overview' },
  { apiName: 'Type', label: 'Type', type: 'picklist', section: 'overview' },
  { apiName: 'Status__c', label: 'Status', type: 'picklist', section: 'overview' },
  { apiName: 'Client_Segment__c', label: 'Client segment', type: 'picklist', section: 'overview' },
  { apiName: 'OwnerId', label: 'Financial advisor', type: 'lookup', section: 'overview' },
  { apiName: 'Industry', label: 'Industry', type: 'picklist', section: 'overview' },
  { apiName: 'Branch__c', label: 'Branch', type: 'text', section: 'overview' },
  { apiName: 'Rating', label: 'Rating', type: 'picklist', section: 'overview' },

  { apiName: 'Phone', label: 'Phone', type: 'phone', section: 'contact' },
  { apiName: 'Email__c', label: 'Email', type: 'email', section: 'contact' },
  { apiName: 'Website', label: 'Website', type: 'url', section: 'contact' },
  { apiName: 'Preferred_Contact__c', label: 'Preferred contact method', type: 'picklist', section: 'contact' },
  { apiName: 'BillingAddress', label: 'Mailing address', type: 'address', section: 'contact' },
  { apiName: 'ShippingAddress', label: 'Secondary address', type: 'address', section: 'contact' },

  { apiName: 'AUM__c', label: 'Assets under management', type: 'currency', section: 'financial' },
  { apiName: 'Net_Worth__c', label: 'Estimated net worth', type: 'currency', section: 'financial' },
  { apiName: 'AnnualRevenue', label: 'Annual income', type: 'currency', section: 'financial' },
  { apiName: 'YTD_Return__c', label: 'YTD return', type: 'percent', section: 'financial' },
  { apiName: 'Risk_Tolerance__c', label: 'Risk tolerance', type: 'picklist', section: 'financial' },
  { apiName: 'Investment_Objective__c', label: 'Investment objective', type: 'picklist', section: 'financial' },
  { apiName: 'Time_Horizon__c', label: 'Time horizon', type: 'picklist', section: 'financial' },
  { apiName: 'Liquidity_Needs__c', label: 'Liquidity needs', type: 'picklist', section: 'financial' },

  { apiName: 'Client_Since__c', label: 'Client since', type: 'date', section: 'relationship' },
  { apiName: 'Last_Review__c', label: 'Last review', type: 'date', section: 'relationship' },
  { apiName: 'Next_Review__c', label: 'Next review', type: 'date', section: 'relationship' },
  { apiName: 'Tier__c', label: 'Relationship tier', type: 'picklist', section: 'relationship' },
  { apiName: 'Primary_Contact__c', label: 'Primary contact', type: 'lookup', section: 'relationship' },
  { apiName: 'AccountSource', label: 'Referral source', type: 'picklist', section: 'relationship' },
  { apiName: 'ParentId', label: 'Household', type: 'lookup', section: 'relationship' },

  { apiName: 'KYC_Status__c', label: 'KYC status', type: 'picklist', section: 'compliance' },
  { apiName: 'KYC_Verified__c', label: 'KYC last verified', type: 'date', section: 'compliance' },
  { apiName: 'Accredited__c', label: 'Accredited investor', type: 'boolean', section: 'compliance' },
  { apiName: 'Tax_Id__c', label: 'Tax ID', type: 'masked', section: 'compliance' },
  { apiName: 'Trading_Restrictions__c', label: 'Trading restrictions', type: 'text', section: 'compliance' },

  { apiName: 'RecordType', label: 'Record type', type: 'text', section: 'system' },
  { apiName: 'CreatedBy', label: 'Created by', type: 'text', section: 'system' },
  { apiName: 'LastModifiedBy', label: 'Last modified by', type: 'text', section: 'system' },
  { apiName: 'Description', label: 'Description', type: 'text', section: 'system' },
]

export const mockAccount: AccountRecord = {
  id: '001DEMO000000001',
  values: {
    Name: 'Harper Family Trust',
    AccountNumber: 'HFT-20418',
    Type: 'Client – Trust',
    Status__c: 'Active',
    Client_Segment__c: 'High net worth',
    OwnerId: 'Dana Whitfield',
    Industry: 'Manufacturing',
    Branch__c: 'Center City',
    Rating: 'Hot',

    Phone: '(215) 555-0142',
    Email__c: 'office@harperfamily.example',
    Website: null,
    Preferred_Contact__c: 'Email',
    BillingAddress: '1800 Walnut St, Suite 400\nPhiladelphia, PA 19103',
    ShippingAddress: null,

    AUM__c: 4_850_000,
    Net_Worth__c: 9_200_000,
    AnnualRevenue: 640_000,
    YTD_Return__c: 6.8,
    Risk_Tolerance__c: 'Moderate',
    Investment_Objective__c: 'Growth & income',
    Time_Horizon__c: '10+ years',
    Liquidity_Needs__c: 'Low',

    Client_Since__c: '2014-03-11',
    Last_Review__c: '2026-07-22',
    Next_Review__c: '2026-11-05',
    Tier__c: 'Platinum',
    Primary_Contact__c: 'Eleanor Harper',
    AccountSource: 'Client referral',
    ParentId: null,

    KYC_Status__c: 'Verified',
    KYC_Verified__c: '2026-02-14',
    Accredited__c: true,
    Tax_Id__c: '••-•••4821',
    Trading_Restrictions__c: null,

    RecordType: 'Wealth Client',
    CreatedBy: 'System Integration',
    LastModifiedBy: 'Dana Whitfield',
    Description: null,
  },
  contacts: [
    { name: 'Eleanor Harper', title: 'Trustee', email: 'eleanor@harperfamily.example', primary: true },
    { name: 'Marcus Harper', title: 'Beneficiary', email: 'marcus@harperfamily.example' },
    { name: 'Priya Natarajan', title: 'CPA (external)', email: 'priya@ledgerworks.example' },
  ],
  opportunities: [
    { name: 'Municipal bond ladder', stage: 'Proposal', amount: 750_000, closeDate: '2026-11-20' },
    { name: '529 plan setup', stage: 'Qualification', amount: 120_000, closeDate: '2026-12-15' },
  ],
  cases: [{ number: '00041877', subject: 'Update beneficiary designation', status: 'In progress', priority: 'Medium' }],
  activities: [
    { kind: 'meeting', subject: 'Quarterly portfolio review', date: '2026-10-09', who: 'Dana Whitfield' },
    { kind: 'email', subject: 'Sent bond ladder proposal', date: '2026-10-02', who: 'Dana Whitfield' },
    { kind: 'call', subject: 'Discussed 529 options with Marcus', date: '2026-09-24', who: 'Dana Whitfield' },
    { kind: 'task', subject: 'Collect updated trust documents', date: '2026-09-15', who: 'Service team' },
  ],
  alerts: [{ severity: 'warning', message: 'Annual review due in 18 days — no meeting scheduled yet.' }],
  milestones: [
    { label: 'Became a client', date: '2014-03-11' },
    { label: 'Trust established', date: '2019-06-01' },
    { label: 'Upgraded to Platinum tier', date: '2023-01-15' },
    { label: 'Eleanor retires', date: '2027-05-01' },
  ],
  interestTags: ['Sailing', 'Philanthropy', 'ESG investing', 'Grandchildren education'],
  interactions: [],
}
