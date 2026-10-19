import React, { useState } from 'react';
import {
  DIRECTORATES_CATALOG,
  RAQQA_NEIGHBORHOODS,
  getDirectoratesByGovernorate,
} from '../lib/directorates';
import {
  validateComplaintSubmission,
  generateComplaintId,
} from '../lib/complaintRules';
import { Complaint, ComplaintType, Directorate } from '../lib/types';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  X,
  FileText,
  AlertCircle,
  ShieldCheck,
  MapPin,
  Lock,
} from 'lucide-react';

interface ComplaintWizardProps {
  initialType?: ComplaintType;
  preselectedDirectorate?: Directorate | null;
  onSuccess: (complaint: Complaint) => void;
  onCancel: () => void;
  onTrackSubmittedComplaint: (id: string) => void;
}

export const ComplaintWizard: React.FC<ComplaintWizardProps> = ({
  initialType = 'standard',
  preselectedDirectorate = null,
  onSuccess,
  onCancel,
  onTrackSubmittedComplaint,
}) => {
  const [step, setStep] = useState<number>(1);
  const [complaintType, setComplaintType] = useState<ComplaintType>(initialType);

  // Form states
  const [selectedDirectorateId, setSelectedDirectorateId] = useState<string>(
    preselectedDirectorate ? preselectedDirectorate.id : 'raqqa-water'
  );
  const [district, setDistrict] = useState<string>('حي المشلب');
  const [street, setStreet] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Attachments
  const [files, setFiles] = useState<{ id: string; name: string; size: string; progress: number }[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Citizen info
  const [isAnonymous, setIsAnonymous] = useState<boolean>(initialType === 'confidential');
  const [citizenName, setCitizenName] = useState<string>('');
  const [phone, setPhone] = useState<string>('0944123456');

  // Submission result & state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const raqqaDirectorates = getDirectoratesByGovernorate('raqqa');
  const activeDirectorate = raqqaDirectorates.find((d) => d.id === selectedDirectorateId);

  const stepsList = [
    { number: 1, title: 'نوع المشكلة والجهة' },
    { number: 2, title: 'الموقع في الرقة' },
    { number: 3, title: 'تفاصيل البلاغ' },
    { number: 4, title: 'الصور والمرفقات' },
    { number: 5, title: 'بيانات التواصل' },
    { number: 6, title: 'المراجعة والإرسال' },
  ];

  const handleNext = () => {
    // Validate current step
    if (step === 1 && !selectedDirectorateId) {
      setErrors({ selectedDirectorateId: 'يرجى اختيار الجهة الخدمية المختصة' });
      return;
    }
    if (step === 2 && !district) {
      setErrors({ district: 'يرجى اختيار الحي أو المنطقة' });
      return;
    }
    if (step === 3) {
      const errs: Record<string, string> = {};
      if (!title || title.trim().length < 5) {
        errs.title = 'يرجى كتابة عنوان واضح للمشكلة (5 أحرف على الأقل)';
      }
      if (!description || description.trim().length < 15) {
        errs.description = 'يرجى كتابة شرح كافٍ للمشكلة (15 حرفاً على الأقل)';
      }
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }
    if (step === 5 && !isAnonymous) {
      const cleanPhone = phone.replace(/[\s-]/g, '');
      const syrianPhoneRegex = /^(09\d{8}|9\d{8}|\+9639\d{8})$/;
      if (!cleanPhone || !syrianPhoneRegex.test(cleanPhone)) {
        setErrors({ phone: 'يرجى إدخال رقم هاتف محمول سوري صالح (مثال: 0944123456)' });
        return;
      }
    }

    setErrors({});
    if (step < 6) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Mock file upload with progress
  const handleAddSampleFile = () => {
    setIsUploading(true);
    const newId = 'file-' + Date.now();
    const newFile = {
      id: newId,
      name: `توثيق_ميداني_رقم_${files.length + 1}.jpg`,
      size: '1.8 MB',
      progress: 30,
    };
    setFiles((prev) => [...prev, newFile]);

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.id === newId ? { ...f, progress: 100 } : f))
      );
      setIsUploading(false);
    }, 450);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = () => {
    const category = activeDirectorate ? activeDirectorate.serviceCategory : 'خدمات عامة';
    const validation = validateComplaintSubmission({
      category,
      directorateId: selectedDirectorateId,
      title,
      description,
      district,
      isAnonymous,
      phone,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSequence = Math.floor(100 + Math.random() * 899);
      const generatedId = generateComplaintId('raqqa', newSequence, 2026);
      const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

      const newComplaint: Complaint = {
        id: generatedId,
        governorateId: 'raqqa',
        directorateId: selectedDirectorateId,
        category,
        type: complaintType,
        title,
        description,
        location: {
          governorate: 'محافظة الرقة',
          city: 'الرقة',
          district,
          street: street || undefined,
          landmark: landmark || undefined,
        },
        citizenInfo: {
          name: isAnonymous ? undefined : citizenName || 'مواطن من الرقة',
          phone: isAnonymous ? undefined : phone,
          isAnonymous,
        },
        status: 'received',
        priority: 'medium',
        createdAt: now,
        updatedAt: now,
        timeline: [
          {
            id: 'tl-' + Date.now(),
            status: 'received',
            title: 'تم استلام الشكوى وتوليد الرقم المرجعي',
            description: `تم إيداع الشكوى في نظام الرقة وتحويلها لـ ${activeDirectorate?.nameAr || 'المديرية المختصة'}.`,
            timestamp: now,
            actor: 'منصة صوت الرقة',
          },
        ],
        attachments: files.map((f) => ({
          id: f.id,
          name: f.name,
          size: f.size,
          type: 'image',
        })),
      };

      setSubmittedComplaint(newComplaint);
      onSuccess(newComplaint);
      setIsSubmitting(false);
    }, 500);
  };

  const handleCopyId = () => {
    if (!submittedComplaint) return;
    navigator.clipboard.writeText(submittedComplaint.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SUCCESS SCREEN (Section 20 of Brief)
  if (submittedComplaint) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8 text-center shadow-md animate-in fade-in zoom-in-95 duration-200">
          {/* Animated check icon */}
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 animate-in zoom-in duration-300" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <span>تم استلام الشكوى بنجاح</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            صوتك وصل إلى الجهة المعنية
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
            تم تسجيل بلاغك رسمياً وإحالته إلى {activeDirectorate?.nameAr} في محافظة الرقة.
            احتفظ برقم الشكوى لمتابعة خطوات المعالجة.
          </p>

          {/* Prominent Complaint Reference Number */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border-2 border-dashed border-teal-600/40 max-w-sm mx-auto">
            <span className="text-xs text-slate-500 font-medium block">الرقم المرجعي الرسمي للشكوى:</span>
            <div className="flex items-center justify-center gap-3 mt-1.5">
              <span className="font-mono font-extrabold text-2xl sm:text-3xl text-teal-900 tracking-wider">
                {submittedComplaint.id}
              </span>
              <button
                onClick={handleCopyId}
                className="p-2 rounded-lg bg-white border border-slate-200 hover:border-teal-600 text-slate-700 hover:text-teal-700 transition-colors shadow-2xs"
                title="نسخ رقم الشكوى"
                aria-label="نسخ رقم الشكوى"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            {copied && <span className="text-[11px] text-emerald-600 font-bold block mt-1">تم النسخ إلى الحافظة!</span>}
          </div>

          {/* Summary info */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-6 max-w-sm mx-auto text-right bg-slate-50/60 p-3 rounded-lg border border-slate-200/60">
            <div>
              <span className="text-slate-400 block text-[11px]">المحافظة:</span>
              <span className="font-semibold text-slate-800">محافظة الرقة</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">الحي:</span>
              <span className="font-semibold text-slate-800">{submittedComplaint.location.district}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">الجهة المختصة:</span>
              <span className="font-semibold text-slate-800 line-clamp-1">{submittedComplaint.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">الحالة الحالية:</span>
              <span className="font-bold text-amber-700">قيد المراجعة الأولية</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button
              onClick={() => onTrackSubmittedComplaint(submittedComplaint.id)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>متابعة الشكوى والمسار الزمني</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Top Banner & Title */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-md">
              محافظة الرقة
            </span>
            <span className="text-xs text-slate-500">
              {complaintType === 'confidential'
                ? 'مسار البلاغ السري المحمي'
                : complaintType === 'suggestion'
                ? 'مسار المقترح التطويري'
                : 'تسجيل شكوى خدمية'}
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mt-1">
            {complaintType === 'confidential'
              ? 'تقديم بلاغ سري محمي الهوية'
              : complaintType === 'suggestion'
              ? 'تقديم مقترح لتطوير الخدمات بالرقة'
              : 'تقديم شكوى خدمية جديدة'}
          </h1>
        </div>
        <button
          onClick={onCancel}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
        >
          إلغاء
        </button>
      </div>

      {/* Step Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>
            الخطوة {step} من {stepsList.length}:{' '}
            <strong className="text-slate-900 font-heading">{stepsList[step - 1].title}</strong>
          </span>
          <span>{Math.round((step / stepsList.length) * 100)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step / stepsList.length) * 100}%` }}
          ></div>
        </div>
        {/* Steps Bubbles */}
        <div className="hidden sm:flex justify-between mt-3 text-[11px] text-slate-400">
          {stepsList.map((s) => (
            <span
              key={s.number}
              className={`cursor-pointer transition-colors ${
                s.number === step
                  ? 'text-teal-800 font-bold'
                  : s.number < step
                  ? 'text-slate-700 font-medium'
                  : 'text-slate-400'
              }`}
              onClick={() => s.number < step && setStep(s.number)}
            >
              {s.number}. {s.title}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
        {/* STEP 1: نوع المشكلة والجهة */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-heading font-bold text-sm text-slate-900 mb-1">
                ما نوع المشكلة أو الخدمة المعنية؟
              </label>
              <p className="text-xs text-slate-500 mb-3">
                اختر المديرية المختصة في محافظة الرقة ليتم توجيه شكواك لفريق الصيانة المباشر
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {raqqaDirectorates.map((dir) => {
                const isSelected = selectedDirectorateId === dir.id;
                return (
                  <div
                    key={dir.id}
                    onClick={() => {
                      setSelectedDirectorateId(dir.id);
                      setErrors({});
                    }}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <AnimatedServiceIcon
                        category={dir.icon}
                        size={18}
                        color={isSelected ? '#FFFFFF' : '#0E6258'}
                      />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                        {dir.serviceCategory}
                      </div>
                      <div className="text-[11px] text-teal-800 font-medium">{dir.nameAr}</div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        {dir.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.selectedDirectorateId && (
              <p className="text-xs text-red-600 font-medium">{errors.selectedDirectorateId}</p>
            )}
          </div>
        )}

        {/* STEP 2: الموقع في الرقة */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-heading font-bold text-sm text-slate-900 mb-1">
                أين حدثت المشكلة في محافظة الرقة؟
              </label>
              <p className="text-xs text-slate-500 mb-3">
                المحافظة محددة مسبقاً (الرقة)، يرجى تحديد الحي أو الشارع لتصل الورشة بدقة
              </p>
            </div>

            {/* Contextual Lock for Governorate */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-700" />
                <span className="font-bold text-slate-800">المحافظة:</span>
                <span className="text-slate-700 font-semibold">محافظة الرقة</span>
              </div>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                منطقة الإطلاق التجريبي الحالية
              </span>
            </div>

            {/* District / Neighborhood selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                الحي أو المنطقة <span className="text-red-500">*</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm text-slate-800 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
              >
                {RAQQA_NEIGHBORHOODS.map((nh) => (
                  <option key={nh} value={nh}>
                    {nh}
                  </option>
                ))}
              </select>
            </div>

            {/* Street */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                اسم الشارع أو الزقاق (اختياري)
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="مثال: شارع الوادي، جانب مدرسة المشلب"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                نقطة علامة مميزة (مسجد، مدرسة، ساحة)
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="مثال: خلف خزان المياه العالي"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 3: اشرح لنا ما حدث */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-heading font-bold text-sm text-slate-900 mb-1">
                اشرح لنا ما حدث
              </label>
              <p className="text-xs text-slate-500 mb-3">
                قدم وصفاً واضحاً وموجزاً ليتمكن الفنيون من تقدير الأدوات المطلوبة قبل الانطلاق
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                عنوان مختصر للشكوى <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: انكسار أنبوب مياه شرب وهدر في الشارع الرئيسي"
                className={`w-full rounded-xl border p-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 ${
                  errors.title
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-600'
                }`}
              />
              {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تفاصيل الشكوى <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب متى بدأت المشكلة، حجم الضرر، وتأثيرها على المنازل المجاورة..."
                className={`w-full rounded-xl border p-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 ${
                  errors.description
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-600'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: المرفقات والصور */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-heading font-bold text-sm text-slate-900 mb-1">
                أضف صوراً أو مستندات توضيحية (اختياري)
              </label>
              <p className="text-xs text-slate-500 mb-3">
                الصور تسرع معالجة الشكوى بنسبة 40% وتساعد الورشة على جلب المعدات المناسبة
              </p>
            </div>

            {/* Upload Zone */}
            <div
              onClick={handleAddSampleFile}
              className="border-2 border-dashed border-slate-300 hover:border-teal-600 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-teal-50/30"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-teal-700 mb-2 shadow-2xs">
                <Upload className="h-6 w-6" />
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm text-slate-800 block">
                انقر هنا لإرفاق صورة أو مستند
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">
                صيغ JPG, PNG, PDF حتى 10 ميغابايت
              </span>
            </div>

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-700">الملفات المرفقة ({files.length}):</div>
                {files.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-teal-700" />
                      <div>
                        <span className="font-semibold text-slate-800 block">{f.name}</span>
                        <span className="text-[10px] text-slate-400">{f.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {f.progress < 100 ? (
                        <span className="text-[11px] text-teal-700 font-bold">جاري الرفع...</span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          جاهز
                        </span>
                      )}
                      <button
                        onClick={() => handleRemoveFile(f.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded"
                        title="حذف الملف"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 5: بيانات التواصل */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-heading font-bold text-sm text-slate-900 mb-1">
                بيانات التواصل والمتابعة
              </label>
              <p className="text-xs text-slate-500 mb-3">
                تستخدم فقط لإبلاغك بنتيجة المعالجة ولن تظهر في أي إحصاءات عامة
              </p>
            </div>

            {/* Confidential / Anonymous Toggle */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 text-teal-700" />
                <div>
                  <span className="font-bold text-xs text-slate-800 block">
                    تقديم الشكوى بهوية مجهولة / بلاغ سري
                  </span>
                  <span className="text-[11px] text-slate-500">
                    لن يتم تسجيل اسمك أو رقم هاتفك (تتبع الشكوى برقم البلاغ فقط)
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => {
                  setIsAnonymous(e.target.checked);
                  setErrors({});
                }}
                className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600 border-slate-300"
              />
            </div>

            {!isAnonymous && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الاسم الكامل (اختياري)
                  </label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="مثال: أحمد العلي"
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهاتف المحمول السوري <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09XXXXXXXX"
                    className={`w-full rounded-xl border p-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 text-left ${
                      errors.phone
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-teal-600 focus:ring-teal-600'
                    }`}
                  />
                  {errors.phone ? (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  ) : (
                    <p className="text-[11px] text-slate-400 mt-1">
                      ستصلك رسالة نصية قصيرة SMS عند كل تحديث لحالة الشكوى
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 6: المراجعة والإرسال */}
        {step === 6 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-heading font-bold text-sm text-slate-900 mb-1">
                مراجعة تفاصيل الشكوى قبل الإرسال
              </label>
              <p className="text-xs text-slate-500 mb-3">
                تأكد من دقة المعلومات المدخلة ليتم تحويلها لورشة الصيانة في الرقة دون تأخير
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">المحافظة:</span>
                <span className="font-bold text-slate-900">محافظة الرقة</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">الجهة المسؤولة:</span>
                <span className="font-bold text-teal-800">{activeDirectorate?.nameAr}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">الموقع:</span>
                <span className="font-bold text-slate-800">
                  {district} {street ? `· ${street}` : ''} {landmark ? `(${landmark})` : ''}
                </span>
              </div>
              <div className="border-b border-slate-200/70 pb-2">
                <span className="text-slate-500 block mb-0.5">عنوان الشكوى:</span>
                <span className="font-bold text-slate-900">{title}</span>
              </div>
              <div className="border-b border-slate-200/70 pb-2">
                <span className="text-slate-500 block mb-0.5">التفاصيل:</span>
                <p className="text-slate-700 leading-relaxed">{description}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">نوع البلاغ:</span>
                <span className="font-semibold text-slate-800">
                  {isAnonymous ? 'بلاغ سري محمي الهوية' : `مقدم باسم: ${citizenName || 'مواطن'} (${phone})`}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-teal-50 border border-teal-200/70 p-3 text-xs text-teal-900 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
              <span>
                بالنقر على إرسال، يتم إنشاء قيد رسمي للشكوى وإرسال إشعار فوري لمديرية {activeDirectorate?.serviceCategory} بالرقة.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              <span>السابق</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <span>المتابعة</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              {isSubmitting ? (
                <span>جاري تسجيل الشكوى...</span>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>تأكيد وإرسال الشكوى</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
