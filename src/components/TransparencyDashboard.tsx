import React, { useState } from 'react';
import { Complaint } from '../lib/types';
import { DIRECTORATES_CATALOG } from '../lib/directorates';
import { SyriaExpansionMap } from './SyriaExpansionMap';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  Filter,
} from 'lucide-react';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';

interface TransparencyDashboardProps {
  complaints: Complaint[];
}

export const TransparencyDashboard: React.FC<TransparencyDashboardProps> = ({ complaints }) => {
  const [timeRange, setTimeRange] = useState('30days');

  // Filter Raqqa directorates
  const raqqaDirectorates = DIRECTORATES_CATALOG.filter((d) => d.governorateId === 'raqqa');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-md mb-2">
            <span>لوحة البيانات المفتوحة — محافظة الرقة</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            مؤشرات الشفافية والأداء الخدمي
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            بيانات مجمعة وإحصاءات دقيقة عن حركة الشكاوى ومعدلات استجابة الدوائر الحكومية والبلدية في محافظة الرقة
          </p>
        </div>

        {/* Time range filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              timeRange === '30days'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            آخر 30 يوماً
          </button>
          <button
            onClick={() => setTimeRange('90days')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              timeRange === '90days'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            آخر 3 أشهر
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              timeRange === 'year'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            عام 2026 بالكامل
          </button>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>إجمالي الشكاوى الواردة</span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-700">
              100%
            </span>
          </div>
          <div className="font-heading font-extrabold text-3xl text-slate-900">2,382</div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">↑ 12%</span>
            <span>مقارنة بالشهر السابق</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200/90 bg-amber-50/20 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-amber-800 mb-2">
            <span>قيد المعالجة الميدانية</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono font-bold">
              17.3%
            </span>
          </div>
          <div className="font-heading font-extrabold text-3xl text-amber-900">412</div>
          <div className="text-[11px] text-amber-700 mt-2">ضمن المهل المحددة للاستجابة</div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200/90 bg-emerald-50/20 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-emerald-800 mb-2">
            <span>تم حلها وإغلاقها</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
              77.8%
            </span>
          </div>
          <div className="font-heading font-extrabold text-3xl text-emerald-900">1,853</div>
          <div className="text-[11px] text-emerald-700 mt-2">مع محضر إنجاز رسمي موثق</div>
        </div>

        <div className="bg-white rounded-2xl border border-teal-200/90 bg-teal-50/20 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-teal-800 mb-2">
            <span>متوسط زمن الحل</span>
            <span className="text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-mono font-bold">
              مؤشر أداء
            </span>
          </div>
          <div className="font-heading font-extrabold text-3xl text-teal-900">3.9 يوم</div>
          <div className="text-[11px] text-teal-700 mt-2">انخفاض من 6.2 يوم في بداية العام</div>
        </div>
      </div>

      {/* Directorate Breakdown Table & Bar Comparisons */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              أداء المديريات الخدمية في محافظة الرقة
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              مقارنة حجم البلاغات ومعدلات الإنجاز ومتوسط زمن الاستجابة لكل قطاع
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="py-3 px-3">الجهة الخدمية</th>
                <th className="py-3 px-3">إجمالي الوارد</th>
                <th className="py-3 px-3">قيد المعالجة</th>
                <th className="py-3 px-3">تم حلها</th>
                <th className="py-3 px-3">نسبة الإنجاز</th>
                <th className="py-3 px-3">متوسط الاستجابة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {raqqaDirectorates.map((dir) => {
                const total = dir.stats.totalReceived || 1;
                const pct = Math.round((dir.stats.resolved / total) * 100);

                return (
                  <tr key={dir.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                        <AnimatedServiceIcon category={dir.icon} size={15} />
                      </div>
                      <div>
                        <div>{dir.nameAr}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{dir.serviceCategory}</div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {dir.stats.totalReceived}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-700 font-semibold">
                      {dir.stats.inProgress}
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-700 font-semibold">
                      {dir.stats.resolved}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[11px]">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {dir.stats.avgResponseDays} يوم
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Syria Expansion Map Section */}
      <SyriaExpansionMap />

      {/* Privacy and Anonymity Assurance Banner (Section 23 & 52) */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900">
              ضمانة الخصوصية التامة والحيادية
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed max-w-2xl">
              كافة البيانات المعروضة في لوحة الشفافية هي أرقام إحصائية مجمعة وخالية تماماً من أي معلومات شخصية،
              أرقام هواتف، أو أسماء مواطنين، امتثالاً لميثاق حماية البيانات وحق الشكوى الآمن.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
          معتمدة من لجنة حوكمة البيانات
        </span>
      </div>
    </div>
  );
};
