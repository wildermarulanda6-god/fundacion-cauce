export type ProjectStatus = 'active' | 'paused' | 'completed';
export type StatusFilter = ProjectStatus | 'all';
export type DonorKind = 'person' | 'company';
export type AttentionState = 'enrolled' | 'in_progress' | 'graduated';

export interface Donor {
  id: string;
  name: string;
  kind: DonorKind;
  totalDonated: number;
  lastDonationAt: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  location: string;
  status: ProjectStatus;
  goalAmount: number;
  raisedAmount: number;
  imageUrl: string;
  donorIds: string[];
  beneficiaryIds: string[];
  reportIds: string[];
}

export interface Beneficiary {
  id: string;
  name: string;
  projectId: string;
  city: string;
  attention: AttentionState;
}

export interface Report {
  id: string;
  projectId: string;
  title: string;
  publishedAt: string;
}