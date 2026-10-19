import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateComplaintId,
  canUserAccessComplaint,
  validateComplaintSubmission,
  getStatusStepIndex,
  calculateAggregatedStats,
} from './complaintRules.ts';
import { AuthContext, Complaint } from './types.ts';

test('generateComplaintId generates formatted reference IDs with correct governorate prefixes', () => {
  const raqqaId = generateComplaintId('raqqa', 133, 2026);
  assert.equal(raqqaId, 'RQ-2026-000133');

  const aleppoId = generateComplaintId('aleppo', 45, 2026);
  assert.equal(aleppoId, 'ALP-2026-000045');

  const homsId = generateComplaintId('homs', 1, 2026);
  assert.equal(homsId, 'HMS-2026-000001');
});

test('Strict Data Visibility: Directorate account can only view complaints for its own governorate and directorate', () => {
  const raqqaHealthStaff: AuthContext = {
    role: 'directorate_staff',
    userName: 'خالد — موظف صحة الرقة',
    governorateId: 'raqqa',
    directorateId: 'raqqa-health',
  };

  const raqqaHealthComplaint: Complaint = {
    id: 'RQ-2026-000100',
    governorateId: 'raqqa',
    directorateId: 'raqqa-health',
    category: 'الصحة',
    type: 'standard',
    title: 'نقص أدوية في مركز الفردوس',
    description: 'يوجد نقص في لقاحات الأطفال بالمركز الصحي منذ أسبوعين.',
    location: { governorate: 'الرقة', city: 'الرقة', district: 'حي الفردوس' },
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-02',
    timeline: [],
    attachments: [],
  };

  const aleppoHealthComplaint: Complaint = {
    ...raqqaHealthComplaint,
    id: 'ALP-2026-000005',
    governorateId: 'aleppo',
    directorateId: 'aleppo-health',
  };

  const raqqaWaterComplaint: Complaint = {
    ...raqqaHealthComplaint,
    id: 'RQ-2026-000101',
    governorateId: 'raqqa',
    directorateId: 'raqqa-water',
  };

  // Raqqa Health staff MUST see Raqqa Health complaint
  assert.equal(canUserAccessComplaint(raqqaHealthStaff, raqqaHealthComplaint), true);

  // Raqqa Health staff MUST NEVER see Aleppo Health complaint (even though both are Health!)
  assert.equal(canUserAccessComplaint(raqqaHealthStaff, aleppoHealthComplaint), false);

  // Raqqa Health staff MUST NEVER see Raqqa Water complaint
  assert.equal(canUserAccessComplaint(raqqaHealthStaff, raqqaWaterComplaint), false);
});

test('Governorate Admin scope: can access all directorates in own governorate, but not others', () => {
  const raqqaGovAdmin: AuthContext = {
    role: 'governorate_admin',
    userName: 'محافظة الرقة — المشرف العام',
    governorateId: 'raqqa',
  };

  const raqqaWaterComplaint: Complaint = {
    id: 'RQ-2026-000101',
    governorateId: 'raqqa',
    directorateId: 'raqqa-water',
    category: 'المياه',
    type: 'standard',
    title: 'عطل في خط المياه الرئيسي',
    description: 'تسريب مياه كبير في خط التغذية الرئيسي قرب حي المشلب.',
    location: { governorate: 'الرقة', city: 'الرقة', district: 'حي المشلب' },
    status: 'received',
    priority: 'medium',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-01',
    timeline: [],
    attachments: [],
  };

  const aleppoComplaint: Complaint = {
    ...raqqaWaterComplaint,
    id: 'ALP-2026-000001',
    governorateId: 'aleppo',
    directorateId: 'aleppo-health',
  };

  assert.equal(canUserAccessComplaint(raqqaGovAdmin, raqqaWaterComplaint), true);
  assert.equal(canUserAccessComplaint(raqqaGovAdmin, aleppoComplaint), false);
});

test('validateComplaintSubmission validates minimum fields and telephone numbers', () => {
  // Empty data should fail
  const emptyRes = validateComplaintSubmission({
    category: '',
    directorateId: '',
    title: '',
    description: '',
    district: '',
  });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.category);
  assert.ok(emptyRes.errors.directorateId);
  assert.ok(emptyRes.errors.district);
  assert.ok(emptyRes.errors.title);
  assert.ok(emptyRes.errors.description);

  // Valid standard submission with valid Syrian phone
  const validRes = validateComplaintSubmission({
    category: 'المياه والصرف الصحي',
    directorateId: 'raqqa-water',
    title: 'انقطاع المياه عن شارع الوادي',
    description: 'انقطعت المياه بشكل كامل منذ صباح يوم أمس دون إشعار مسبق.',
    district: 'حي الرميلة',
    phone: '0944123456',
    isAnonymous: false,
  });
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);

  // Anonymous report doesn't require phone
  const anonRes = validateComplaintSubmission({
    category: 'التموين',
    directorateId: 'raqqa-supply',
    title: 'بيع خبز بسعر غير رسمي',
    description: 'مخبز في الحي يبيع الربطة بسعر مضاعف خلافاً للتسعيرة الرسمية.',
    district: 'حي الدرعية',
    isAnonymous: true,
  });
  assert.equal(anonRes.isValid, true);
});

test('getStatusStepIndex maps statuses to correct step sequence', () => {
  assert.equal(getStatusStepIndex('received'), 0);
  assert.equal(getStatusStepIndex('under_review'), 1);
  assert.equal(getStatusStepIndex('referred'), 2);
  assert.equal(getStatusStepIndex('in_progress'), 3);
  assert.equal(getStatusStepIndex('resolved'), 4);
});

test('calculateAggregatedStats computes accurate transparency figures', () => {
  const dummyComplaints: Complaint[] = [
    {
      id: 'RQ-1',
      governorateId: 'raqqa',
      directorateId: 'raqqa-water',
      category: 'المياه',
      type: 'standard',
      title: 'T1',
      description: 'D1',
      location: { governorate: 'الرقة', city: 'الرقة', district: 'حي المشلب' },
      status: 'resolved',
      priority: 'low',
      createdAt: '',
      updatedAt: '',
      timeline: [],
      attachments: [],
    },
    {
      id: 'RQ-2',
      governorateId: 'raqqa',
      directorateId: 'raqqa-water',
      category: 'المياه',
      type: 'standard',
      title: 'T2',
      description: 'D2',
      location: { governorate: 'الرقة', city: 'الرقة', district: 'حي المشلب' },
      status: 'in_progress',
      priority: 'high',
      createdAt: '',
      updatedAt: '',
      timeline: [],
      attachments: [],
    },
    {
      id: 'RQ-3',
      governorateId: 'raqqa',
      directorateId: 'raqqa-health',
      category: 'الصحة',
      type: 'standard',
      title: 'T3',
      description: 'D3',
      location: { governorate: 'الرقة', city: 'الرقة', district: 'حي الفردوس' },
      status: 'received',
      priority: 'medium',
      createdAt: '',
      updatedAt: '',
      timeline: [],
      attachments: [],
    },
  ];

  const stats = calculateAggregatedStats(dummyComplaints);
  assert.equal(stats.total, 3);
  assert.equal(stats.resolved, 1);
  assert.equal(stats.inProgress, 1);
  assert.equal(stats.receivedOnly, 1);
  assert.equal(stats.resolutionRate, 33);
});
