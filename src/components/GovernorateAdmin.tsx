import React, { useState } from 'react';
import { Complaint } from '../lib/types';
import { DIRECTORATES_CATALOG } from '../lib/directorates';
import {
  ShieldCheck,
  Building2,
  Users,
  BarChart3,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  ExternalLink,
  Download,
} from 'lucide-react';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';

interface GovernorateAdminProps {
  complaints: Complaint[];
  onOpenComplaintDetail: (id: string) => void;
}

export const GovernorateAdmin: React.FC<GovernorateAdminProps> = ({
  complaints,
  onOpenComplaintDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'directorates' | 'complaints' | 'reports'>('overview');
  const [filterDirectorate, setFilterDirectorate] = useState<string>('all');

  // Strictly Raqqa complaints
  const raqqaComplaints = complaints.filter((c) => c.governorateId === 'raqqa');
  const raqqaDirectorates = DIRECTORATES_CATALOG.filter((d) => d.governorateId === 'raqqa');

  const urgentComplaints = raqqaComplaints.filter(
    (c) => c.priority === 'urgent' && c.status !== 'resolved'
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Permanent Governorate Admin Header (Section 36 & 63) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 border border-teal-500/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl text-white">
                إدارة منصة الشكاوى — محافظة الرقة
              </h1>
              <span className="text-xs bg-teal-800 text-teal-200 px-2 py-0.5 rounded font-bold">
                المشرف العام للمحافظة
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              متابعة ورقابة مركزية لكافة المديريات الخدمية والمجالس البلدية في محافظة الرقة
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl text-xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'overview' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('directorates')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'directorates' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            مديريات الرقة (10)
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'complaints' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            سجل الشكاوى
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs text-slate-500 block">إجمالي شكاوى المحافظة</span>
              <span className="font-heading font-extrabold text-2xl text-slate-900 mt-1 block">
                {raqqaComplaints.length}
              </span>
              <span className="text-[11px] text-teal-700 font-semibold">10 قطاعات مفعلة بالرقة</span>
            </div>

            <div className="p-4 rounded-xl border border-red-200 bg-red-50/30">
              <div className="flex items-center justify-between text-xs text-red-800">
                <span>بلاغات طارئة تحتاج تدخلاً</span>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-red-900 mt-1 block">
                {urgentComplaints.length}
              </span>
              <span className="text-[11px] text-red-700">تجاوزت مهلة الاستجابة المعتادة</span>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
              <span className="text-xs text-emerald-800 block">نسبة الإنجاز العامة بالرقة</span>
              <span className="font-heading font-extrabold text-2xl text-emerald-900 mt-1 block">
                78.4%
              </span>
              <span className="text-[11px] text-emerald-700">معدل مرتفع مقارنة بالمستهدف</span>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30">
              <span className="text-xs text-blue-800 block">متوسط زمن الإغلاق بالرقة</span>
              <span className="font-heading font-extrabold text-2xl text-blue-900 mt-1 block">
                2.9 يوم
              </span>
              <span className="text-[11px] text-blue-700">من التسجيل حتى المعالجة</span>
            </div>
          </div>

          {/* Urgent Complaints Escalation Queue */}
          {urgentComplaints.length > 0 && (
            <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-red-100 pb-3 mb-3">
                <div className="flex items-center gap-2 text-red-800 font-heading font-bold text-sm">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>طابور المتابعة العاجلة لغرفة عمليات محافظة الرقة</span>
                </div>
                <span className="text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded font-bold">
                  {urgentComplaints.length} بلاغات ذات أولوية
                </span>
              </div>

              <div className="space-y-2">
                {urgentComplaints.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onOpenComplaintDetail(c.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-red-100 bg-red-50/40 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-red-900">{c.id}</span>
                        <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                          {c.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        الجهة: <strong className="text-teal-800">{c.category}</strong> · الحي:{' '}
                        {c.location.district}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-700 bg-white px-2.5 py-1 rounded-lg border border-red-200 shrink-0 self-end sm:self-auto">
                      متابعة الإجراء
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Directorates Performance Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-3">
              جاهزية ونشاط دوائر محافظة الرقة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {raqqaDirectorates.map((dir) => (
                <div
                  key={dir.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                      <AnimatedServiceIcon category={dir.icon} size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-slate-900 line-clamp-1">
                        {dir.nameAr}
                      </h4>
                      <span className="text-[10px] text-slate-500">{dir.serviceCategory}</span>
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-xs font-bold text-emerald-700 block">
                      {dir.stats.resolved} تم حلها
                    </span>
                    <span className="text-[10px] text-slate-400">من {dir.stats.totalReceived}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'directorates' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h2 className="font-heading font-bold text-base text-slate-900">
            سجل المؤسسات والمديريات المفعلة — محافظة الرقة
          </h2>
          <div className="space-y-3">
            {raqqaDirectorates.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm text-slate-900">{d.nameAr}</h3>
                    <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-semibold">
                      محافظة الرقة
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    المدير: {d.managerName} · هاتف: {d.phone} · العنوان: {d.address}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 font-mono">
                    {d.stats.inProgress} قيد التنفيذ
                  </span>
                  <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {d.stats.resolved} تم الحل
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-heading font-bold text-base text-slate-900">
              سجل كافة شكاوى محافظة الرقة
            </h2>
            <span className="text-xs text-slate-500 font-mono font-bold">
              {raqqaComplaints.length} قيد
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="py-2.5 px-3">الرقم المرجعي</th>
                  <th className="py-2.5 px-3">العنوان</th>
                  <th className="py-2.5 px-3">الجهة</th>
                  <th className="py-2.5 px-3">الحي</th>
                  <th className="py-2.5 px-3">الحالة</th>
                  <th className="py-2.5 px-3">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {raqqaComplaints.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onOpenComplaintDetail(c.id)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{c.id}</td>
                    <td className="py-3 px-3 max-w-[220px] truncate">{c.title}</td>
                    <td className="py-3 px-3 text-teal-800 font-medium">{c.category}</td>
                    <td className="py-3 px-3">{c.location.district}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                      {c.createdAt.split(' ')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
