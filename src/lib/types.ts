export type GovernorateId =
  | 'raqqa'
  | 'aleppo'
  | 'damascus'
  | 'rural_damascus'
  | 'homs'
  | 'hama'
  | 'latakia'
  | 'tartus'
  | 'idlib'
  | 'deir_ez_zor'
  | 'hasakah'
  | 'daraa'
  | 'sweida'
  | 'quneitra';

export type ComplaintStatus =
  | 'received'       // تم الاستلام
  | 'under_review'   // قيد المراجعة
  | 'referred'       // تمت الإحالة
  | 'in_progress'    // قيد المعالجة
  | 'resolved'       // تم الحل
  | 'rejected';      // اعتذار/مرفوضة

export type ComplaintType = 'standard' | 'confidential' | 'suggestion';

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  isInternal?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'document';
  url?: string;
}

export interface Complaint {
  id: string; // e.g. RQ-2026-000132
  governorateId: GovernorateId;
  directorateId: string;
  category: string;
  type: ComplaintType;
  title: string;
  description: string;
  location: {
    governorate: string;
    city: string;
    district: string;
    street?: string;
    landmark?: string;
  };
  citizenInfo?: {
    name?: string;
    phone?: string;
    isAnonymous?: boolean;
  };
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
  attachments: Attachment[];
  publicResponse?: {
    text: string;
    date: string;
    officer: string;
  };
  internalNotes?: {
    id: string;
    author: string;
    text: string;
    date: string;
  }[];
  satisfactionRating?: number;
}

export interface Directorate {
  id: string;
  governorateId: GovernorateId;
  nameAr: string;
  serviceCategory: string;
  description: string;
  icon: string;
  phone: string;
  emergencyPhone?: string;
  address: string;
  workingHours: string;
  managerName: string;
  stats: {
    totalReceived: number;
    inProgress: number;
    resolved: number;
    avgResponseDays: number;
  };
  coverageAreas: string[];
}

export interface Governorate {
  id: GovernorateId;
  nameAr: string;
  nameEn: string;
  status: 'active' | 'configured' | 'pending';
  center: string;
  populationEstimate: string;
  activeDirectoratesCount: number;
  launchDate?: string;
}

export type UserRole =
  | 'citizen'
  | 'directorate_staff'
  | 'directorate_admin'
  | 'governorate_admin'
  | 'central_admin';

export interface AuthContext {
  role: UserRole;
  userName: string;
  governorateId: GovernorateId;
  directorateId?: string;
}
