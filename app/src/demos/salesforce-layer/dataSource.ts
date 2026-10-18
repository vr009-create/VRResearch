import { fields, mockAccount, sections } from './mockAccount'
import type { AccountRecord, FieldDef, SectionDef } from './schema'

// The page reads everything through this interface. Showcase mode uses the mock source;
// live mode will call the app's server, which proxies the Salesforce UI API:
//   object info  -> GET /services/data/vXX.X/ui-api/object-info/Account  (all fields, labels, types)
//   record       -> GET /services/data/vXX.X/ui-api/records/{id}?fields=...
//   related      -> GET /services/data/vXX.X/ui-api/related-list-records/{id}/{relatedList}
export interface AccountDataSource {
  getObjectInfo(): Promise<{ sections: SectionDef[]; fields: FieldDef[] }>
  getAccount(id: string): Promise<AccountRecord>
}

export const mockDataSource: AccountDataSource = {
  getObjectInfo: async () => ({ sections, fields }),
  getAccount: async () => mockAccount,
}
