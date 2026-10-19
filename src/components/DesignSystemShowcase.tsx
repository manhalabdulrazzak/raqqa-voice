import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Check,
  AlertTriangle,
  Info,
  Shield,
  Smartphone,
} from 'lucide-react';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';

export const DesignSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foundations' | 'components' | 'motion'>('motion');
  const [motionTrigger, setMotionTrigger] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>نظام التصميم والحركة المعتمد (Design & Motion Constitution)</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            المعايير البصرية والحركية لمنصة صوت الرقة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            توثيق تفصيلي للألوان والخطوط والمكونات ومستويات الحركة الثلاثة المعتمدة هندسياً وفق البنود 55 و56
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('motion')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'motion'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            مستويات الحركة (Motion System)
          </button>
          <button
            onClick={() => setActiveTab('foundations')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'foundations'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الأسس البصرية (Foundations)
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'components'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المكونات التفاعلية (Components)
          </button>
        </div>
      </div>

      {/* MOTION SYSTEM TAB (Section 56 & 8) */}
      {activeTab === 'motion' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-slate-900">
              المستويات الثلاثة لنظام الحركة (Motion Levels)
            </h2>
            <button
              onClick={() => setMotionTrigger((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة تشغيل نماذج الحركة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: Micro-interactions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-bold">
                  Level 1 · 80ms - 180ms
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-1.5">
                  التفاعلات الدقيقة (Micro-interactions)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  تستخدم للأزرار، الحقول، البطاقات، وتغيرات الحالة السريعة لمنح شعور فوري بالاستجابة
                </p>
              </div>

              {/* Interactive Demo Cards */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">تفاعل بطاقة الخدمة عند التحويم:</span>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-teal-600 hover:-translate-y-1 hover:shadow-sm cursor-pointer transition-all duration-150 flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                        <AnimatedServiceIcon category="water" size={16} />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-teal-900">
                        مديرية المياه — الرقة
                      </span>
                    </div>
                    <span className="text-slate-400 group-hover:text-teal-700 transition-transform group-hover:-translate-x-1">
                      ←
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">أزرار تفاعلية سريعة:</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold transition-all duration-150 shadow-2xs">
                      تأكيد سريع
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 active:scale-95 text-slate-700 font-semibold transition-all duration-150">
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2: Interface Transitions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-bold">
                  Level 2 · 180ms - 350ms
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-1.5">
                  انتقالات الواجهة (Interface Transitions)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  تستخدم لخطوات النماذج المتسلسلة، القوائم الجانبية، الفلاتر، ونوافذ المعاينة
                </p>
              </div>

              {/* Demo */}
              <div className="space-y-3 text-xs">
                <span className="text-slate-400 block mb-1">انتقال سلس بين خطوات النموذج:</span>
                <div
                  key={`step-${motionTrigger}`}
                  className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 animate-in fade-in slide-in-from-right-4 duration-300"
                >
                  <div className="flex items-center justify-between text-blue-900 font-bold mb-1">
                    <span>الخطوة 2: تحديد الحي</span>
                    <span className="font-mono text-[10px]">250ms</span>
                  </div>
                  <p className="text-blue-800 text-[11px]">
                    انتقال أفقي سلس في اتجاه اليمين لليسار (RTL Native)
                  </p>
                </div>
              </div>
            </div>

            {/* Level 3: Meaningful Motion */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  Level 3 · 350ms - 700ms
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-1.5">
                  الحركة ذات المعنى (Meaningful Motion)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  لحظات النجاح البصري، إتمام الشكوى، اكتمال المسار الزمني، ومؤشرات الشفافية
                </p>
              </div>

              {/* Demo */}
              <div className="space-y-3 text-xs">
                <span className="text-slate-400 block mb-1">لحظة اعتماد الشكوى بنجاح:</span>
                <div
                  key={`success-${motionTrigger}`}
                  className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center animate-in zoom-in-95 fade-in duration-500"
                >
                  <div className="h-10 w-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 animate-in zoom-in duration-300">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="font-heading font-bold text-emerald-950">
                    تم استلام الشكوى رسمياً
                  </div>
                  <span className="font-mono text-emerald-800 text-[11px] font-bold">
                    RQ-2026-000133
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance & Accessibility Rules */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 space-y-2">
            <h4 className="font-heading font-bold text-sm text-slate-900">
              قواعد الأداء وإمكانية الوصول (Performance & Reduced Motion)
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-500 leading-relaxed">
              <li>
                <strong>خفة الوزن للأجهزة الاقتصادية:</strong> الحركة تعتمد حصرياً على{' '}
                <code className="text-teal-800 font-mono">transform</code> و{' '}
                <code className="text-teal-800 font-mono">opacity</code> لتفادي أي إعادة رسم (Repaint) ثقيلة على الهواتف القديمة.
              </li>
              <li>
                <strong>احترام تفضيل تقليل الحركة:</strong> تدعم المنصة كود{' '}
                <code className="text-teal-800 font-mono">@media (prefers-reduced-motion: reduce)</code> بحيث تلغى كافة الحركات التزيينية عند تفعيل هذا الخيار في نظام تشغيل المواطن.
              </li>
              <li>
                <strong>صفحة هادئة في وضع السكون:</strong> لا توجد أي عناصر تتحرك باستمرار دون توقف (No infinite loops) لضمان وقار الواجهة الخدمية الحكومية.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* FOUNDATIONS TAB */}
      {activeTab === 'foundations' && (
        <div className="space-y-6">
          <h2 className="font-heading font-bold text-lg text-slate-900">
            الأسس والرموز البصرية (Design Foundations)
          </h2>

          {/* Colors Palette (Section 42) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900">
              لوحة الألوان الرسمية المعتمدة
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0D6257] text-white space-y-1 shadow-2xs">
                <span className="font-bold block">Primary Deep Teal</span>
                <span className="font-mono text-[10px] opacity-80">#0D6257</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0F172A] text-white space-y-1 shadow-2xs">
                <span className="font-bold block">Dark Navy</span>
                <span className="font-mono text-[10px] opacity-80">#0F172A</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] text-slate-800 border border-slate-200 space-y-1">
                <span className="font-bold block">Warm Off-White</span>
                <span className="font-mono text-[10px] text-slate-500">#FAF8F5</span>
              </div>
              <div className="p-3 rounded-xl bg-[#ECE6DC] text-slate-800 space-y-1">
                <span className="font-bold block">Soft Sand</span>
                <span className="font-mono text-[10px] text-slate-500">#ECE6DC</span>
              </div>
              <div className="p-3 rounded-xl bg-[#E2E8F0] text-slate-800 space-y-1">
                <span className="font-bold block">Neutral Border</span>
                <span className="font-mono text-[10px] text-slate-500">#E2E8F0</span>
              </div>
            </div>
          </div>

          {/* Typography (Section 45) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900">
              الهرمية الطباعية العربية (Typography Scale)
            </h3>
            <div className="space-y-3 text-xs border-t border-slate-100 pt-3">
              <div>
                <span className="text-slate-400 font-mono text-[10px]">H1 Display · Alexandria 36px</span>
                <div className="font-heading font-extrabold text-2xl text-slate-900">
                  صوتك مسموع… ومتابعة شكواك حقك
                </div>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px]">H2 Section · Alexandria 20px</span>
                <div className="font-heading font-bold text-lg text-slate-900">
                  المديريات والجهات الخدمية الشريكة في محافظة الرقة
                </div>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px]">Body Regular · IBM Plex Sans Arabic 14px</span>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                  المنصة الموحدة للشكاوى والمقترحات الخدمية، مبنية على معمارية عزل صارمة تمكن كل قطاع من معالجة بلاغات حيه باحترافية وسرعة.
                </p>
              </div>
            </div>
          </div>

          {/* Radii & Elevation (Section 43 & 44) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900">
              الاستدارة والظلال (Zero-AI-Slop Discipline)
            </h3>
            <p className="text-xs text-slate-500">
              الابتعاد التام عن الزوايا المبالغة (24-32px) واستخدام استدارة متزنة (8px إلى 14px) مع حدود 1px واضحة وظلال خفيفة ذات دلالة وظيفية.
            </p>
          </div>
        </div>
      )}

      {/* COMPONENTS TAB */}
      {activeTab === 'components' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h2 className="font-heading font-bold text-lg text-slate-900">
            مكتبة المكونات المعتمدة (Component Library)
          </h2>

          <div className="space-y-5 text-xs">
            {/* Status Badges */}
            <div>
              <span className="font-bold text-slate-700 block mb-2">شارات الحالة (Status Badges):</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  تم الاستلام
                </span>
                <span className="px-3 py-1 rounded-full font-bold bg-purple-50 text-purple-800 border border-purple-200">
                  قيد المراجعة الفنية
                </span>
                <span className="px-3 py-1 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200 animate-subtle-pulse">
                  قيد المعالجة الميدانية
                </span>
                <span className="px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  تم الحل بنجاح
                </span>
                <span className="px-3 py-1 rounded-full font-bold bg-red-50 text-red-800 border border-red-200">
                  طارئة عاجلة
                </span>
              </div>
            </div>

            {/* Inputs & Fields */}
            <div>
              <span className="font-bold text-slate-700 block mb-2">حقول الإدخال والاختيار:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                <input
                  type="text"
                  placeholder="حقل نصي قياسي..."
                  className="rounded-xl border border-slate-200 p-2 text-xs focus:border-teal-600 outline-none"
                />
                <select className="rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700">
                  <option>محافظة الرقة (نشطة)</option>
                  <option>محافظة حلب (مهيأة)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
