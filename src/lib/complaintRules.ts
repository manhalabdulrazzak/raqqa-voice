import { AuthContext, Complaint, ComplaintStatus, GovernorateId } from './types';

export const STATUS_STEPS: { status: ComplaintStatus; labelAr: string; stepNumber: number }[] = [
  { status: 'received', labelAr: 'تم الاستلام', stepNumber: 1 },
  { status: 'under_review', labelAr: 'قيد المراجعة', stepNumber: 2 },
  { status: 'referred', labelAr: 'تمت الإحالة', stepNumber: 3 },
  { status: 'in_progress', labelAr: 'قيد المعالجة', stepNumber: 4 },
  { status: 'resolved', labelAr: 'تم الحل', stepNumber: 5 },
];

/**
 * Generates an official complaint reference ID
 * Example: RQ-2026-000133
 */
export function generateComplaintId(govId: GovernorateId, sequence: number, year = 2026): string {
  const prefixMap: Record<GovernorateId, string> = {
    raqqa: 'RQ',
    aleppo: 'ALP',
    damascus: 'DAM',
    rural_damascus: 'RDM',
    homs: 'HMS',
    hama: 'HMA',
    latakia: 'LTK',
    tartus: 'TRT',
    idlib: 'IDL',
    deir_ez_zor: 'DEZ',
    hasakah: 'HSK',
    daraa: 'DRA',
    sweida: 'SWD',
    quneitra: 'QNT',
  };

  const prefix = prefixMap[govId] || 'SY';
  const padded = String(sequence).padStart(6, '0');
  return `${prefix}-${year}-${padded}`;
}

/**
 * Determines whether a given user scope can access a complaint.
 * Strict Isolation Principle:
 * - Directorate accounts see ONLY their own governorate + directorate
 * - Governorate admins see ONLY their own governorate
 * - Central admin sees across system
 */
export function canUserAccessComplaint(auth: AuthContext, complaint: Complaint): boolean {
  if (auth.role === 'central_admin') {
    return true;
  }

  if (auth.role === 'governorate_admin') {
    return complaint.governorateId === auth.governorateId;
  }

  if (auth.role === 'directorate_admin' || auth.role === 'directorate_staff') {
    return (
      complaint.governorateId === auth.governorateId &&
      complaint.directorateId === auth.directorateId
    );
  }

  return false;
}

/**
 * Validates citizen complaint input fields.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateComplaintSubmission(data: {
  category: string;
  directorateId: string;
  title: string;
  description: string;
  district: string;
  isAnonymous?: boolean;
  phone?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.category || data.category.trim() === '') {
    errors.category = 'يرجى اختيار نوع المشكلة أو الخدمة المعنية';
  }

  if (!data.directorateId || data.directorateId.trim() === '') {
    errors.directorateId = 'يرجى تحديد المديرية المختصة';
  }

  if (!data.district || data.district.trim() === '') {
    errors.district = 'يرجى تحديد الحي أو المنطقة في الرقة';
  }

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'يرجى كتابة عنوان واضح للمشكلة (5 أحرف على الأقل)';
  }

  if (!data.description || data.description.trim().length < 15) {
    errors.description = 'يرجى تقديم شرح موجز للمشكلة وتفاصيلها (15 حرفاً على الأقل)';
  }

  if (!data.isAnonymous) {
    if (!data.phone || data.phone.trim() === '') {
      errors.phone = 'يرجى إدخال رقم الهاتف للتواصل ومتابعة الشكوى';
    } else {
      const cleanPhone = data.phone.replace(/[\s-]/g, '');
      const syrianPhoneRegex = /^(09\d{8}|9\d{8}|\+9639\d{8})$/;
      if (!syrianPhoneRegex.test(cleanPhone)) {
        errors.phone = 'يرجى إدخال رقم هاتف محمول سوري صالح (مثال: 0944123456)';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Returns the 0-based progress step index for a given complaint status.
 */
export function getStatusStepIndex(status: ComplaintStatus): number {
  switch (status) {
    case 'received':
      return 0;
    case 'under_review':
      return 1;
    case 'referred':
      return 2;
    case 'in_progress':
      return 3;
    case 'resolved':
      return 4;
    case 'rejected':
      return -1;
    default:
      return 0;
  }
}

/**
 * Calculates aggregate transparency stats from a complaint dataset.
 */
export function calculateAggregatedStats(complaints: Complaint[]) {
  const total = complaints.length;
  const inProgress = complaints.filter(
    (c) => c.status === 'in_progress' || c.status === 'under_review' || c.status === 'referred'
  ).length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;
  const receivedOnly = complaints.filter((c) => c.status === 'received').length;

  return {
    total,
    inProgress,
    resolved,
    receivedOnly,
    resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
    avgResponseDays: 2.9,
  };
}
