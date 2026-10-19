import React, { useState } from 'react';
import { getDirectoratesByGovernorate } from '../lib/directorates';
import { Directorate } from '../lib/types';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';
import {
  Phone,
  Clock,
  MapPin,
  Building2,
  ArrowLeft,
  CheckCircle2,
  FilePlus2,
  X,
  Shield,
  Search,
} from 'lucide-react';

interface DirectoratesDirectoryProps {
  onDirectComplaintToService: (directorate: Directorate) => void;
}

export const DirectoratesDirectory: React.FC<DirectoratesDirectoryProps> = ({
  onDirectComplaintToService,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDirectorate, setSelectedDirectorate] = useState<Directorate | null>(null);

  const directorates = getDirectoratesByGovernorate('raqqa');

  const filtered = directorates.filter(
    (d) =>
      d.nameAr.includes(search) ||
      d.serviceCategory.includes(search) ||
      d.description.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-md mb-2">
            <span>دليل الجهات الرسمية — محافظة الرقة</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            المديريات والجهات الخدمية الشريكة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            تواصل مباشر مع مكاتب الشكاوى وورشات الطوارئ التابعة لكافة الدوائر الحكومية والخدمية في مدينة الرقة وريفها
          </p>
        </div>

        {/* Filter Search */}
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مديرية أو خدمة..."
            className="w-full rounded-xl border border-slate-200 py-2 pr-9 pl-3 text-xs text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
          />
        </div>
      </div>

      {/* Grid of Directorates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((dir) => (
          <div
            key={dir.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center shrink-0">
                  <AnimatedServiceIcon category={dir.icon} size={24} />
                </div>
                <span className="text-[11px] font-semibold text-teal-900 bg-teal-50/80 px-2.5 py-0.5 rounded-md border border-teal-100">
                  محافظة الرقة
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-slate-900">
                {dir.nameAr}
              </h3>
              <div className="text-xs font-medium text-teal-700 mt-0.5">
                قطاع: {dir.serviceCategory}
              </div>

              <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                {dir.description}
              </p>

              {/* Quick Info */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-[11px]">{dir.phone}</span>
                  {dir.emergencyPhone && (
                    <span className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.2 rounded font-bold">
                      طوارئ: {dir.emergencyPhone}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate text-[11px]">{dir.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedDirectorate(dir)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                تفاصيل المديرية
              </button>
              <button
                onClick={() => onDirectComplaintToService(dir)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
              >
                <FilePlus2 className="h-3.5 w-3.5" />
                <span>تقديم شكوى</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Directorate Full Profile Drawer/Modal */}
      {selectedDirectorate && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                  <AnimatedServiceIcon category={selectedDirectorate.icon} size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    {selectedDirectorate.nameAr}
                  </h3>
                  <div className="text-xs text-teal-800 font-medium">
                    محافظة الرقة · {selectedDirectorate.serviceCategory}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedDirectorate(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {selectedDirectorate.description}
              </p>

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">إجمالي الشكاوى:</span>
                  <span className="font-heading font-bold text-base text-slate-900">
                    {selectedDirectorate.stats.totalReceived}
                  </span>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-amber-700 block">قيد المعالجة:</span>
                  <span className="font-heading font-bold text-base text-amber-900">
                    {selectedDirectorate.stats.inProgress}
                  </span>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block">تم حلها:</span>
                  <span className="font-heading font-bold text-base text-emerald-900">
                    {selectedDirectorate.stats.resolved}
                  </span>
                </div>
              </div>

              {/* Office Details */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">العنوان الميداني:</span>
                  <span className="font-medium text-slate-800">{selectedDirectorate.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">المدير المسؤول:</span>
                  <span className="font-medium text-slate-800">{selectedDirectorate.managerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ساعات الدوام:</span>
                  <span className="font-medium text-slate-800">{selectedDirectorate.workingHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الهاتف:</span>
                  <span className="font-mono font-medium text-slate-800">{selectedDirectorate.phone}</span>
                </div>
              </div>

              {/* Coverage Areas */}
              <div>
                <span className="font-bold text-slate-800 block mb-1">نطاق التغطية والعمل:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDirectorate.coverageAreas.map((area, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedDirectorate(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                >
                  إغلاق
                </button>
                <button
                  onClick={() => {
                    onDirectComplaintToService(selectedDirectorate);
                    setSelectedDirectorate(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <FilePlus2 className="h-3.5 w-3.5" />
                  <span>تقديم شكوى لهذه الجهة</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
