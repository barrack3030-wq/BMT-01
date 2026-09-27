export type Page = 'home' | 'profile' | 'news' | 'location' | 'faq';

export interface MemberFormData {
  fullName: string;
  nik: string;
  phone: string;
  address: string;
  district: string;
  serviceType: 'simpanan' | 'pembiayaan' | 'qurban';
  estimatedAmount?: number;
  notes?: string;
  agreedToTerms: boolean;
}

export interface SimulationState {
  type: 'simpanan' | 'pembiayaan';
  amount: number;
  tenorMonths: number;
}
