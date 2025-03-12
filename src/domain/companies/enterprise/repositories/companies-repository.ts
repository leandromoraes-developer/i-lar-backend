import { Company } from '../entities/company';

export abstract class ICompaniesRepository {
  abstract create(data: Company): Promise<void>;
  abstract findById(companyId: string): Promise<Company | null>;
  abstract findByName(companyName: string): Promise<Company | null>;
  abstract findByCNPJ(companyName: string): Promise<Company | null>;
}
