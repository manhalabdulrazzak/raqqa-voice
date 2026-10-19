import React, { useState } from 'react';
import { Complaint, ComplaintStatus, Directorate } from '../lib/types';
import { getDirectoratesByGovernorate, getDirectorateById } from '../lib/directorates';
import { STATUS_STEPS, canUserAccessComplaint } from '../lib/complaintRules';
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  MapPin,
  Send,
  Lock,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';

interface DirectoratePortalProps {
  complaints: Complaint[];
  onUpdateComplaint: (
    id: string,
    updates: Partial<Complaint>,
    newEvent?: { status: ComplaintStatus; title: string; description: string; actor: string }
  ) => void;
}

export const DirectoratePortal: React.FC<DirectoratePortalProps> = ({
  complaints,
  onUpdateComplaint,
}) => {
  // Active directorate selection in Raqqa
  const [currentDirId, setCurrentDirId] = useState<string>('raqqa-water');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Form states for updates
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('in_progress');
  const [publicResponseText, setPublicResponseText] = useState<string>('');
  const [internalNoteText, setInternalNoteText] = useState<string>('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const activeDirectorate = getDirectorateById(currentDirId);
  const raqqaDirectorates = getDirectoratesByGovernorate('raqqa');

  // STRICT DATA VISIBILITY ENFORCEMENT:
  // Directorate staff ONLY sees complaints where gov == raqqa AND directorateId == currentDirId!
  const dirComplaints = complaints.filter((c) =>
    canUserAccessComplaint(
      {
        role: 'directorate_admin',
        userName: 'مدير المديرية',
        governorateId: 'raqqa',
        directorateId: currentDirId,
      },
      c
    )
  );

  const filteredComplaints = dirComplaints.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.location.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeComplaint = complaints.find((c) => c.id === selectedComplaintId);

  // Stats calculation
  const totalReceived = dirComplaints.length;
  const inProgressCount = dirComplaints.filter((c) => c.status === 'in_progress').length;
  const underReviewCount = dirComplaints.filter(
    (c) => c.status === 'under_review' || c.status === 'received'
  ).length;
  const resolvedCount = dirComplaints.filter((c) => c.status === 'resolved').length;

  const handleApplyStatusUpdate = () => {
    if (!activeComplaint) return;
    const actorName = `${activeDirectorate?.nameAr} — مكتب المتابعة`;

    onUpdateComplaint(
      activeComplaint.id,
      { status: newStatus },
      {
        status: newStatus,
        title: `تحديث الحالة إلى: ${
          STATUS_STEPS.find((s) => s.status === newStatus)?.labelAr || newStatus
        }`,
        description: `تم تحديث مسار الشكوى من قبل موظف المتابعة بالمديرية.`,
        actor: actorName,
      }
    );

    setActionSuccessMsg('تم تحديث حالة الشكوى بنجاح وإشعار المواطن');
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handleSendPublicResponse = () => {
    if (!activeComplaint || !publicResponseText.trim()) return;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    onUpdateComplaint(activeComplaint.id, {
      publicResponse: {
        text: publicResponseText.trim(),
        date: now,
        officer: `${activeDirectorate?.managerName || 'مسؤول المتابعة'} — ${activeDirectorate?.nameAr}`,
      },
    });

    setPublicResponseText('');
    setActionSuccessMsg('تم إرسال الرد الرسمي الموجه للمواطن');
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handleAddInternalNote = () => {
    if (!activeComplaint || !internalNoteText.trim()) return;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const existingNotes = activeComplaint.internalNotes || [];

    const newNote = {
      id: 'in-' + Date.now(),
      author: 'مشرف الصيانة الميدانية',
      text: internalNoteText.trim(),
      date: now,
    };

    onUpdateComplaint(activeComplaint.id, {
      internalNotes: [newNote, ...existingNotes],
    });

    setInternalNoteText('');
    setActionSuccessMsg('تم حفظ الملاحظة الداخلية السرية');
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Permanent Institutional Context Header (Section 32 of Brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">
                {activeDirectorate?.nameAr}
              </h1>
              <span className="font-bold text-xs bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-md border border-teal-200">
                محافظة الرقة
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              نظام إدارة الشكاوى والمتابعة الميدانية · صلاحية وصول محددة للقطاع فقط
            </p>
          </div>
        </div>

        {/* Directorate Switcher for prototype demo purposes */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-slate-500 hidden sm:inline">تبديل المديرية:</span>
          <select
            value={currentDirId}
            onChange={(e) => {
              setCurrentDirId(e.target.value);
              setSelectedComplaintId(null);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-600 focus:bg-white"
          >
            {raqqaDirectorates.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nameAr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Strict Scoping Banner */}
      <div className="rounded-xl bg-slate-100 border border-slate-200/80 px-4 py-2 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-teal-700" />
          <span>
            نطاق البيانات المقيد: <strong>محافظة الرقة</strong> /{' '}
            <strong>{activeDirectorate?.serviceCategory}</strong> (عزل بيانات صارم)
          </span>
        </div>
        <span className="text-[11px] text-slate-600 font-medium">
          شكاوى الجهة: <span className="font-mono font-bold text-slate-800">{dirComplaints.length}</span>
        </span>
      </div>

      {/* KPI Dashboard Cards (Section 33) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block">إجمالي الوارد</span>
          <span className="font-heading font-extrabold text-2xl text-slate-900 mt-1 block">
            {totalReceived}
          </span>
          <span className="text-[10px] text-slate-400">خاص بـ {activeDirectorate?.nameAr}</span>
        </div>

        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 shadow-2xs">
          <span className="text-xs font-medium text-amber-800 block">بانتظار الإجراء الفني</span>
          <span className="font-heading font-extrabold text-2xl text-amber-900 mt-1 block">
            {underReviewCount}
          </span>
          <span className="text-[10px] text-amber-700">واردة حديثاً أو قيد التدقيق</span>
        </div>

        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 shadow-2xs">
          <span className="text-xs font-medium text-blue-800 block">قيد المعالجة الميدانية</span>
          <span className="font-heading font-extrabold text-2xl text-blue-900 mt-1 block">
            {inProgressCount}
          </span>
          <span className="text-[10px] text-blue-700">ورشات العمل في الموقع</span>
        </div>

        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-2xs">
          <span className="text-xs font-medium text-emerald-800 block">تم حلها وإغلاقها</span>
          <span className="font-heading font-extrabold text-2xl text-emerald-900 mt-1 block">
            {resolvedCount}
          </span>
          <span className="text-[10px] text-emerald-700">محاضر معالجة معتمدة</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Complaint Data Table & Filters */}
        <div className={`${activeComplaint ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="ابحث برقم الشكوى، العنوان، أو الحي..."
                  className="w-full rounded-xl border border-slate-200 py-1.5 pr-9 pl-3 text-xs text-slate-800 placeholder-slate-400 focus:border-teal-600 outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  الكل ({dirComplaints.length})
                </button>
                <button
                  onClick={() => setStatusFilter('in_progress')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    statusFilter === 'in_progress'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  قيد المعالجة
                </button>
                <button
                  onClick={() => setStatusFilter('resolved')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    statusFilter === 'resolved'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  تم الحل
                </button>
              </div>
            </div>

            {/* Complaints Data Table (Section 34) */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold">
                    <th className="py-2.5 px-3">رقم الشكوى</th>
                    <th className="py-2.5 px-3">عنوان البلاغ</th>
                    <th className="py-2.5 px-3">الحي</th>
                    <th className="py-2.5 px-3">تاريخ الوصول</th>
                    <th className="py-2.5 px-3">الحالة</th>
                    <th className="py-2.5 px-3">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((c) => {
                      const isSelected = selectedComplaintId === c.id;

                      return (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedComplaintId(c.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-teal-50/80 font-semibold'
                              : 'hover:bg-slate-50/70 text-slate-700'
                          }`}
                        >
                          <td className="py-3 px-3 font-mono font-bold text-slate-900">
                            {c.id}
                          </td>
                          <td className="py-3 px-3 max-w-[200px] truncate font-medium">
                            {c.title}
                          </td>
                          <td className="py-3 px-3 text-slate-500">{c.location.district}</td>
                          <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                            {c.createdAt.split(' ')[0]}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                c.status === 'resolved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : c.status === 'in_progress'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {STATUS_STEPS.find((s) => s.status === c.status)?.labelAr || c.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedComplaintId(c.id);
                              }}
                              className="text-teal-700 hover:text-teal-900 font-bold underline"
                            >
                              فتح
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        لا توجد شكاوى مطابقة لمعايير البحث في {activeDirectorate?.nameAr}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: 2-Column Focused Workspace Detail Panel (Section 35) */}
        {activeComplaint && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5 animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-sm text-teal-900">
                    {activeComplaint.id}
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    محافظة الرقة
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-1">
                  {activeComplaint.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedComplaintId(null)}
                className="text-xs text-slate-400 hover:text-slate-700 p-1"
              >
                إغلاق
              </button>
            </div>

            {/* Success notification banner */}
            {actionSuccessMsg && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* Citizen Details & Description */}
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">الموقع في الرقة:</span>
                  <span className="font-semibold text-slate-800">
                    {activeComplaint.location.district}{' '}
                    {activeComplaint.location.street ? `· ${activeComplaint.location.street}` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">المواطن مقدم الشكوى:</span>
                  <span className="font-semibold text-slate-800">
                    {activeComplaint.citizenInfo?.isAnonymous
                      ? 'بلاغ سري محمي الهوية'
                      : `${activeComplaint.citizenInfo?.name || 'مواطن'} (${activeComplaint.citizenInfo?.phone || 'غير مسجل'})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الأولوية:</span>
                  <span
                    className={`font-bold ${
                      activeComplaint.priority === 'urgent'
                        ? 'text-red-600'
                        : activeComplaint.priority === 'high'
                        ? 'text-amber-700'
                        : 'text-slate-700'
                    }`}
                  >
                    {activeComplaint.priority === 'urgent'
                      ? 'طارئة جداً'
                      : activeComplaint.priority === 'high'
                      ? 'أولوية مرتفعة'
                      : 'عادية'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-1 font-bold">نص البلاغ:</span>
                <p className="text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-150">
                  {activeComplaint.description}
                </p>
              </div>

              {/* Attachments if any */}
              {activeComplaint.attachments && activeComplaint.attachments.length > 0 && (
                <div>
                  <span className="text-slate-500 block mb-1 font-bold">
                    المرفقات الميدانية ({activeComplaint.attachments.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeComplaint.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5 text-[11px]"
                      >
                        <FileText className="h-3.5 w-3.5 text-teal-700" />
                        <span className="font-medium text-slate-800">{att.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION 1: Update Status */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
              <span className="font-heading font-bold text-xs text-slate-900 block">
                تحديث مسار معالجة الشكوى:
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-800 outline-none"
                >
                  <option value="under_review">قيد المراجعة الفنية</option>
                  <option value="referred">تمت الإحالة للورشة الميدانية</option>
                  <option value="in_progress">قيد المعالجة الميدانية الآن</option>
                  <option value="resolved">تم الحل والإغلاق رسمياً</option>
                </select>
                <button
                  onClick={handleApplyStatusUpdate}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 transition-colors"
                >
                  تحديث
                </button>
              </div>
            </div>

            {/* ACTION 2: Public Response vs Internal Note (Section 35) */}
            <div className="space-y-4 pt-1">
              {/* Tab 1: الرد الرسمي للمواطن */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                  <Send className="h-3.5 w-3.5 text-emerald-700" />
                  <span>رد رسمي موجه للمواطن (يظهر في التتبع العام)</span>
                </div>
                <textarea
                  rows={2}
                  value={publicResponseText}
                  onChange={(e) => setPublicResponseText(e.target.value)}
                  placeholder="اكتب رسالة تطمين أو بيان إنجاز للمواطن..."
                  className="w-full rounded-xl border border-emerald-200 bg-white p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={handleSendPublicResponse}
                  disabled={!publicResponseText.trim()}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-xs transition-colors"
                >
                  نشر الرد للمواطن
                </button>
              </div>

              {/* Tab 2: ملاحظة داخلية سرية */}
              <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-100/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Lock className="h-3.5 w-3.5 text-slate-600" />
                  <span>ملاحظة داخلية سرية (لا يراها المواطن نهائياً)</span>
                </div>
                <textarea
                  rows={2}
                  value={internalNoteText}
                  onChange={(e) => setInternalNoteText(e.target.value)}
                  placeholder="ملاحظات فنية للورشة، أرقام المحولات، أو خطط التبديل..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <button
                  onClick={handleAddInternalNote}
                  disabled={!internalNoteText.trim()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-bold text-xs transition-colors"
                >
                  حفظ الملاحظة الداخلية
                </button>

                {/* List internal notes if any */}
                {activeComplaint.internalNotes && activeComplaint.internalNotes.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {activeComplaint.internalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-white p-2 rounded-lg border border-slate-200 text-[11px]"
                      >
                        <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                          <span>{note.author}</span>
                          <span>{note.date}</span>
                        </div>
                        <p className="text-slate-700">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
