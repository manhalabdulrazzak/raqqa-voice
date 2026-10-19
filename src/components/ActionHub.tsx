import React from 'react';
import {
  FilePlus2,
  Search,
  ShieldAlert,
  Lightbulb,
  ArrowLeft,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface ActionHubProps {
  onStartComplaint: (type: 'standard' | 'confidential' | 'suggestion') => void;
  onTrackComplaint: () => void;
}

export const ActionHub: React.FC<ActionHubProps> = ({
  onStartComplaint,
  onTrackComplaint,
}) => {
  return (
    <section className="py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Dominant Primary Citizen Action: تقديم شكوى */}
        <div
          onClick={() => onStartComplaint('standard')}
          className="lg:col-span-6 bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 border border-teal-700/80 group flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle background graphic pattern */}
          <div className="absolute -bottom-6 -left-6 w-44 h-44 rounded-full bg-teal-600/10 pointer-events-none blur-xl"></div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-700/60 text-teal-100 border border-teal-500/30 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-teal-300" />
              <span>المسار الرئيسي للمواطن</span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              قدّم شكوى خدمية
            </h3>

            <p className="text-teal-100/90 text-sm sm:text-base mt-2.5 leading-relaxed max-w-lg">
              هل تواجه عطلاً أو مشكلة في المياه، الكهرباء، النظافة، أو خدمات مجلس المدينة بالرقة؟
              أبلغنا بها بخطوات بسيطة وستصل الشكوى مباشرة لورشة الصيانة المختصة.
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-teal-200/90 mt-4">
              <span className="flex items-center gap-1 bg-teal-900/50 px-2.5 py-1 rounded-md border border-teal-700/40">
                <CheckCircle className="h-3 w-3 text-teal-300" />
                رقم تتبع فوري
              </span>
              <span className="flex items-center gap-1 bg-teal-900/50 px-2.5 py-1 rounded-md border border-teal-700/40">
                <CheckCircle className="h-3 w-3 text-teal-300" />
                إرفاق صور موثقة
              </span>
              <span className="flex items-center gap-1 bg-teal-900/50 px-2.5 py-1 rounded-md border border-teal-700/40">
                <CheckCircle className="h-3 w-3 text-teal-300" />
                إشعار بكل مرحلة
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-teal-700/50 flex items-center justify-between">
            <span className="font-heading font-bold text-sm sm:text-base text-white group-hover:underline">
              ابدأ تسجيل الشكوى الآن
            </span>
            <div className="h-10 w-10 rounded-xl bg-white text-teal-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
              <ArrowLeft className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Right side: 3 Distinct Secondary Actions */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 flex flex-col justify-between">
          {/* Action 2: متابعة شكوى */}
          <div
            onClick={onTrackComplaint}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm cursor-pointer transition-all duration-200 group flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                  تابع حالة شكواك
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  أدخل رقم الشكوى المرجعي لمعرفة جهة المعالجة والخطوة الميدانية الحالية
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-700 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
          </div>

          {/* Action 3: بلاغ سري */}
          <div
            onClick={() => onStartComplaint('confidential')}
            className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-300 hover:shadow-sm cursor-pointer transition-all duration-200 group flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0 group-hover:bg-amber-700 group-hover:text-white transition-colors duration-200">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors">
                    بلاغ سري محمي
                  </h4>
                  <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    هوية محجوبة
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  للإبلاغ عن مخالفات التموين، التعديات الجسيمة، أو حالات الرشوة مع كتمان تام للبيانات
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-400 group-hover:text-amber-800 group-hover:bg-amber-50 flex items-center justify-center shrink-0 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
          </div>

          {/* Action 4: اقتراح خدمة */}
          <div
            onClick={() => onStartComplaint('suggestion')}
            className="p-5 rounded-2xl bg-white border border-purple-200/70 shadow-xs hover:border-purple-300 hover:shadow-sm cursor-pointer transition-all duration-200 group flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center shrink-0 group-hover:bg-purple-700 group-hover:text-white transition-colors duration-200">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                    اقتراح لتطوير الخدمات
                  </h4>
                  <span className="text-[10px] font-semibold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    مبادرات أهالي الرقة
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  شارك فكرة أو مبادرة لتحسين خط سير نقل، إنارة ساحة، أو تفعيل مركز خدمي بالحي
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-400 group-hover:text-purple-700 group-hover:bg-purple-50 flex items-center justify-center shrink-0 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
