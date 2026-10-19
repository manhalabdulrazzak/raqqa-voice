import React, { useState } from 'react';
import { ALL_GOVERNORATES } from '../lib/governorates';
import { Governorate, GovernorateId } from '../lib/types';
import {
  Globe,
  PlusCircle,
  CheckCircle2,
  Building2,
  Shield,
  Layers,
  Sparkles,
  Lock,
  ArrowLeft,
  X,
} from 'lucide-react';
import { SyriaExpansionMap } from './SyriaExpansionMap';

export const CentralAdmin: React.FC = () => {
  const [governoratesList, setGovernoratesList] = useState<Governorate[]>(ALL_GOVERNORATES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGovIdToAdd, setSelectedGovIdToAdd] = useState<GovernorateId>('aleppo');
  const [assignedDirectoratesCount, setAssignedDirectoratesCount] = useState(6);
  const [activationMsg, setActivationMsg] = useState<string | null>(null);

  const handleActivateGovernorate = () => {
    setGovernoratesList((prev) =>
      prev.map((g) =>
        g.id === selectedGovIdToAdd
          ? {
              ...g,
              status: 'active',
              activeDirectoratesCount: assignedDirectoratesCount,
              launchDate: '2026-11-01',
            }
          : g
      )
    );

    const gov = governoratesList.find((g) => g.id === selectedGovIdToAdd);
    setActivationMsg(`تم بنجاح تفعيل ${gov?.nameAr || 'المحافظة'} وتهيئة دليل مديرياتها المعزول!`);
    setShowAddModal(false);
    setTimeout(() => setActivationMsg(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Central Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center shrink-0">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl text-white">
                الإدارة الوطنية المركزية للمنصة
              </h1>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-bold border border-amber-400/30">
                صلاحية سيادية عليا
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              إدارة التوسع الجغرافي للمحافظات السورية وضمان الفصل الهيكلي لقواعد البيانات
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs transition-colors self-start md:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>تفعيل وتجهيز محافظة جديدة</span>
        </button>
      </div>

      {activationMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{activationMsg}</span>
        </div>
      )}

      {/* Principle Callout */}
      <div className="bg-teal-50 border border-teal-200/90 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="font-heading font-bold text-sm text-teal-950 block">
            المبدأ الاستراتيجي: وطنية من الداخل، رقاوية في الإطلاق الأول
          </span>
          <p className="text-xs text-teal-900 mt-1 leading-relaxed max-w-3xl">
            المنصة مهيأة برمجياً وهيكلياً لدعم كافة المحافظات الـ 14 دون أي تعديل في الكود المصدري.
            تفعيل أي محافظة إضافية يتطلب فقط إضافة بياناتها ومديرياتها، مع ضمان عزل الشكاوى الصارم بين الجهات.
          </p>
        </div>
        <div className="text-right text-xs bg-white/80 p-2.5 rounded-xl border border-teal-200 shrink-0">
          <span className="text-slate-500 block text-[10px]">المحافظات النشطة:</span>
          <span className="font-bold text-teal-900">
            <span className="font-mono text-sm">{governoratesList.filter((g) => g.status === 'active').length}</span> من أصل <span className="font-mono text-sm">14</span> محافظة
          </span>
        </div>
      </div>

      {/* Syria Map Widget */}
      <SyriaExpansionMap />

      {/* Governorates Roster Table (Section 64 & 65) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h2 className="font-heading font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">
          جدول المحافظات السورية وجاهزية الإطلاق
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="py-2.5 px-3">المحافظة</th>
                <th className="py-2.5 px-3">الرمز الهيكلي</th>
                <th className="py-2.5 px-3">المركز الإداري</th>
                <th className="py-2.5 px-3">عدد السكان المقدر</th>
                <th className="py-2.5 px-3">الدوائر المفعلة</th>
                <th className="py-2.5 px-3">حالة الإطلاق</th>
                <th className="py-2.5 px-3">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {governoratesList.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-heading font-bold text-slate-900">
                    {g.nameAr}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 uppercase">{g.id}</td>
                  <td className="py-3 px-3">{g.center}</td>
                  <td className="py-3 px-3">{g.populationEstimate}</td>
                  <td className="py-3 px-3 font-mono font-bold text-teal-800">
                    {g.activeDirectoratesCount} جهة
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        g.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : g.status === 'configured'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {g.status === 'active'
                        ? 'نشطة (الإطلاق التجريبي)'
                        : g.status === 'configured'
                        ? 'مهيأة في النظام'
                        : 'مدرجة للتوسع'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {g.status !== 'active' ? (
                      <button
                        onClick={() => {
                          setSelectedGovIdToAdd(g.id);
                          setShowAddModal(true);
                        }}
                        className="text-teal-700 hover:text-teal-900 font-bold underline"
                      >
                        تفعيل
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        مشغلة
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Activate Governorate Modal (Section 38 & 39) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  إضافة وتفعيل محافظة جديدة في المنصة
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  تجهيز الدوائر والمؤسسات وفق معمارية العزل الصارم
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اختر المحافظة:</label>
                <select
                  value={selectedGovIdToAdd}
                  onChange={(e) => setSelectedGovIdToAdd(e.target.value as GovernorateId)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-800 outline-none"
                >
                  {governoratesList
                    .filter((g) => g.status !== 'active')
                    .map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.nameAr} ({g.center})
                      </option>
                    ))}
                </select>
              </div>

              {/* Crucial concept demonstration: Section 39 */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <span className="font-bold block">قاعدة تكوين المديريات (Section 39):</span>
                <p className="text-[11px] leading-relaxed">
                  يتم ربط كل مديرية بهوية المحافظة حصراً، مثل:{' '}
                  <strong>
                    مديرية الصحة — {governoratesList.find((g) => g.id === selectedGovIdToAdd)?.nameAr}
                  </strong>
                  . لا يتم أبداً إنشاء مديرية عامة مشتركة لمنع تداخل الشكاوى.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  عدد المديريات الخدمية المبدئية للربط:
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={assignedDirectoratesCount}
                  onChange={(e) => setAssignedDirectoratesCount(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs text-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleActivateGovernorate}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold"
                >
                  تأكيد التفعيل الوطني
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
