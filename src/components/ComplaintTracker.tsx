import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus } from '../lib/types';
import { STATUS_STEPS, getStatusStepIndex } from '../lib/complaintRules';
import { getDirectorateById } from '../lib/directorates';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Building2,
  FileText,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';

interface ComplaintTrackerProps {
  complaints: Complaint[];
  initialSearchId?: string;
  onNavigateHome?: () => void;
  onStartNewComplaint?: () => void;
}

export const ComplaintTracker: React.FC<ComplaintTrackerProps> = ({
  complaints,
  initialSearchId = '',
  onNavigateHome,
  onStartNewComplaint,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchId);
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialSearchId) {
      setSearchQuery(initialSearchId);
      performLookup(initialSearchId);
    } else {
      // Default to sample complaint if empty
      const sample = complaints.find((c) => c.id === 'RQ-2026-000128') || complaints[0];
      if (sample) {
        setActiveComplaint(sample);
        setSearchQuery(sample.id);
      }
    }
  }, [initialSearchId, complaints]);

  const performLookup = (idToFind: string) => {
    const trimmed = idToFind.trim().toUpperCase();
    setHasSearched(true);
    const found = complaints.find((c) => c.id.toUpperCase() === trimmed);
    setActiveComplaint(found || null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performLookup(searchQuery);
    }
  };

  const sampleIds = ['RQ-2026-000128', 'RQ-2026-000132', 'RQ-2026-000119', 'RQ-2026-000140'];

  const directorate = activeComplaint
    ? getDirectorateById(activeComplaint.directorateId)
    : undefined;

  const currentStepIndex = activeComplaint
    ? getStatusStepIndex(activeComplaint.status)
    : -1;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Search Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
          <span>تتبع الشكاوى في محافظة الرقة</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          أين وصلت شكواي؟
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          أدخل رقم الشكوى المرجعي لمعرفة جهة المعالجة والمرحلة الميدانية الحالية بدقة
        </p>

        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="mt-5 flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="مثال: RQ-2026-000132"
              className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none uppercase font-mono shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
          >
            تتبع الشكوى
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
          <span className="text-[11px] text-slate-400">أرقام تجريبية سريعة:</span>
          {sampleIds.map((sId) => (
            <button
              key={sId}
              type="button"
              onClick={() => {
                setSearchQuery(sId);
                performLookup(sId);
              }}
              className="font-mono text-[11px] text-teal-800 bg-slate-100 hover:bg-teal-50 px-2 py-0.5 rounded border border-slate-200 transition-colors"
            >
              {sId}
            </button>
          ))}
        </div>
      </div>

      {/* Result Container */}
      {activeComplaint ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Main Complaint Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center shrink-0">
                  <AnimatedServiceIcon category={activeComplaint.category} size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-base sm:text-lg text-slate-900">
                      {activeComplaint.id}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                      محافظة الرقة
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-sm sm:text-base text-slate-800 mt-0.5">
                    {activeComplaint.title}
                  </h2>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                    activeComplaint.status === 'resolved'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : activeComplaint.status === 'in_progress'
                      ? 'bg-amber-50 text-amber-800 border-amber-300 animate-subtle-pulse'
                      : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      activeComplaint.status === 'resolved'
                        ? 'bg-emerald-600'
                        : activeComplaint.status === 'in_progress'
                        ? 'bg-amber-600'
                        : 'bg-blue-600'
                    }`}
                  ></span>
                  <span>
                    {activeComplaint.status === 'resolved'
                      ? 'تم الحل والمعالجة الميدانية'
                      : activeComplaint.status === 'in_progress'
                      ? 'قيد المعالجة الميدانية'
                      : activeComplaint.status === 'referred'
                      ? 'تمت الإحالة للورشة'
                      : activeComplaint.status === 'under_review'
                      ? 'قيد المراجعة الفنية'
                      : 'تم الاستلام والتسجيل'}
                  </span>
                </span>
              </div>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 mb-5">
              <div>
                <span className="text-slate-400 block text-[11px]">الجهة المسؤولة:</span>
                <span className="font-bold text-teal-800">
                  {directorate ? directorate.nameAr : activeComplaint.category}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">الحي / المنطقة:</span>
                <span className="font-semibold text-slate-800">{activeComplaint.location.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">تاريخ التسجيل:</span>
                <span className="font-semibold text-slate-800">{activeComplaint.createdAt}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">آخر تحديث:</span>
                <span className="font-semibold text-slate-800">{activeComplaint.updatedAt}</span>
              </div>
            </div>

            {/* Complaint Description */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-slate-700 mb-1">وصف المشكلة:</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-150">
                {activeComplaint.description}
              </p>
            </div>

            {/* VERTICAL RTL INTERACTIVE TIMELINE (Section 22 of Brief) */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-700" />
                  <span>المسار الزمني لمعالجة الشكوى (Timeline)</span>
                </h3>
                <span className="text-[11px] text-slate-400">تحديث آلي فوري</span>
              </div>

              {/* Progress Steps Header Pills */}
              <div className="grid grid-cols-5 gap-1.5 mb-6 text-center text-[10px] sm:text-xs">
                {STATUS_STEPS.map((s, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={s.status}
                      className={`py-2 px-1 rounded-lg border transition-all ${
                        isCurrent
                          ? 'bg-teal-700 text-white font-bold border-teal-800 shadow-2xs'
                          : isDone
                          ? 'bg-teal-50 text-teal-900 font-semibold border-teal-200'
                          : 'bg-slate-50 text-slate-400 border-slate-200/80'
                      }`}
                    >
                      <div className="text-[9px] opacity-75">{s.stepNumber}</div>
                      <div className="truncate">{s.labelAr}</div>
                    </div>
                  );
                })}
              </div>

              {/* Detailed Vertical Event Log */}
              <div className="relative border-r-2 border-slate-200 mr-3 pr-5 space-y-6">
                {activeComplaint.timeline.map((event, idx) => {
                  const isLatest = idx === activeComplaint.timeline.length - 1;

                  return (
                    <div key={event.id} className="relative group">
                      {/* Timeline Node Dot */}
                      <div
                        className={`absolute -right-[27px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white transition-transform ${
                          isLatest
                            ? 'border-teal-600 ring-4 ring-teal-100 scale-110'
                            : 'border-slate-400'
                        }`}
                      />

                      <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/90 hover:border-slate-300 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                            {event.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {event.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                        <div className="mt-2 pt-2 border-t border-slate-150/70 text-[11px] text-teal-800 font-medium">
                          الجهة المحدثة: {event.actor}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Official Public Response if available */}
            {activeComplaint.publicResponse && (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 mb-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span>الرد الرسمي الموجه للمواطن</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  {activeComplaint.publicResponse.text}
                </p>
                <div className="flex items-center justify-between text-[11px] text-emerald-700 font-medium mt-3 pt-2 border-t border-emerald-200/60">
                  <span>المسؤول: {activeComplaint.publicResponse.officer}</span>
                  <span>التاريخ: {activeComplaint.publicResponse.date}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : hasSearched ? (
        /* Empty / Not Found State (Section 50 of Brief) */
        <div className="text-center py-12 px-4 rounded-2xl border border-slate-200 bg-white">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900">
            تعذر العثور على شكوى بهذا الرقم
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            تحقق من صحة الرقم المرجعي (مثال: RQ-2026-000132) وحاول مرة أخرى، أو ابدأ بتقديم شكوى جديدة.
          </p>
          <div className="flex justify-center gap-3 mt-5">
            {onStartNewComplaint && (
              <button
                onClick={onStartNewComplaint}
                className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs"
              >
                تقديم شكوى جديدة
              </button>
            )}
            <button
              onClick={() => {
                setSearchQuery('RQ-2026-000132');
                performLookup('RQ-2026-000132');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
            >
              تجربة رقم صالح
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
