import React, { useState } from 'react';
import { Complaint } from '../lib/types';
import { CheckCircle2, MapPin, Calendar, ArrowLeft, X, ShieldCheck } from 'lucide-react';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';

interface ResolvedCasesFeedProps {
  complaints: Complaint[];
  onSelectComplaintForTracking?: (id: string) => void;
}

export const ResolvedCasesFeed: React.FC<ResolvedCasesFeedProps> = ({
  complaints,
  onSelectComplaintForTracking,
}) => {
  const [selectedCase, setSelectedCase] = useState<Complaint | null>(null);

  // Filter resolved complaints from Raqqa
  const resolvedList = complaints
    .filter((c) => c.status === 'resolved' && c.governorateId === 'raqqa')
    .slice(0, 5);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            آخر القضايا التي تم حلها في الرقة
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            نماذج حية وموثقة للإنجاز الميداني لفرق الصيانة في مختلف أحياء المدينة
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {resolvedList.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedCase(item)}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200/90 bg-white hover:border-emerald-300 hover:bg-emerald-50/20 cursor-pointer transition-all duration-150 group shadow-2xs"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-150">
                <AnimatedServiceIcon category={item.category} size={20} />
              </div>

              <div>
                <div className="font-heading font-bold text-sm text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {item.title}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                  <span className="font-mono font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {item.id}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    {item.location.district}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px]">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    تم الإغلاق: {item.updatedAt.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-auto w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                معالجة معتمدة
              </span>
              <span className="text-slate-400 group-hover:text-emerald-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightweight Public Preview Modal (Zero Citizen Personal Exposure) */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800">قضية خدمية مغلقة بالرقة</span>
                  <div className="font-mono text-xs text-slate-500 font-semibold">{selectedCase.id}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  {selectedCase.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedCase.description}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">المنطقة والحي:</span>
                  <span className="font-medium text-slate-800">{selectedCase.location.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الجهة المسؤولة:</span>
                  <span className="font-medium text-teal-800">{selectedCase.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">تاريخ المعالجة:</span>
                  <span className="font-medium text-slate-800">{selectedCase.updatedAt}</span>
                </div>
              </div>

              {selectedCase.publicResponse && (
                <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-xl">
                  <div className="text-xs font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                    بيان الإنجاز الميداني الرسمي:
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {selectedCase.publicResponse.text}
                  </p>
                  <div className="text-[11px] text-emerald-700 font-medium mt-2 text-left">
                    — {selectedCase.publicResponse.officer}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div className="text-[11px] text-slate-400">
                  البيانات الشخصية للمواطن محجوبة امتثالاً لسياسة الخصوصية
                </div>
                {onSelectComplaintForTracking && (
                  <button
                    onClick={() => {
                      onSelectComplaintForTracking(selectedCase.id);
                      setSelectedCase(null);
                    }}
                    className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                  >
                    <span>عرض السجل الزمني الكامل</span>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
