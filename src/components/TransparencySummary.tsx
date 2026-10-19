import React from 'react';
import { BarChart3, ArrowLeft, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface TransparencySummaryProps {
  onViewFullTransparency: () => void;
}

export const TransparencySummary: React.FC<TransparencySummaryProps> = ({
  onViewFullTransparency,
}) => {
  const stats = [
    {
      label: 'إجمالي الشكاوى المسجلة',
      value: '2,382',
      subtext: 'منذ انطلاق المنصة بالرقة',
      color: 'border-slate-200 bg-white text-slate-900',
      icon: FileText,
      iconColor: 'text-slate-600 bg-slate-100',
    },
    {
      label: 'قيد المتابعة والمعالجة',
      value: '412',
      subtext: 'موزعة على الورش الميدانية',
      color: 'border-amber-200/90 bg-amber-50/40 text-amber-900',
      icon: AlertCircle,
      iconColor: 'text-amber-700 bg-amber-100',
    },
    {
      label: 'شكاوى تم حلها بنجاح',
      value: '1,853',
      subtext: 'نسبة إنجاز 77.8%',
      color: 'border-emerald-200/90 bg-emerald-50/40 text-emerald-900',
      icon: CheckCircle2,
      iconColor: 'text-emerald-700 bg-emerald-100',
    },
    {
      label: 'متوسط زمن الاستجابة',
      value: '3.9 يوم',
      subtext: 'من الاستلام وحتى الإغلاق',
      color: 'border-teal-200/90 bg-teal-50/40 text-teal-900',
      icon: Clock,
      iconColor: 'text-teal-700 bg-teal-100',
    },
  ];

  return (
    <section className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
            <BarChart3 className="h-4 w-4" />
            <span>بيانات مفتوحة وشفافة</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
            ملخص الشفافية والأداء الخدمي
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            مؤشرات دقيقة ومحدثة يومياً تعكس استجابة الدوائر الحكومية والخدمية في محافظة الرقة
          </p>
        </div>
        <button
          onClick={onViewFullTransparency}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100/80 px-3.5 py-2 rounded-lg border border-teal-200/80 transition-colors self-start sm:self-auto"
        >
          <span>لوحة الشفافية الكاملة</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-xl border shadow-xs transition-all duration-150 hover:-translate-y-0.5 ${s.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500 line-clamp-1">{s.label}</span>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${s.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
                {s.value}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5">{s.subtext}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
