import React from 'react';
import { FilePlus2, Search, MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onStartComplaint: () => void;
  onTrackComplaint: () => void;
  quickTrackId: string;
  setQuickTrackId: (id: string) => void;
  onSubmitQuickTrack: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartComplaint,
  onTrackComplaint,
  quickTrackId,
  setQuickTrackId,
  onSubmitQuickTrack,
}) => {
  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      onSubmitQuickTrack(quickTrackId.trim());
    }
  };

  return (
    <section className="relative pt-6 pb-4">
      {/* Context Banner: Pilot Announcement */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200/80 px-3 py-1 text-xs text-teal-900">
        <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse"></span>
        <span className="font-semibold">محافظة الرقة</span>
        <span className="text-teal-400">·</span>
        <span className="text-teal-700">بوابة الإطلاق التجريبي للمحافظة ضمن المعمارية الوطنية الموحدة</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Subtitle, Quick Track Input */}
        <div className="lg:col-span-7 space-y-5">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[42px] leading-[1.25] text-slate-900 tracking-tight">
            صوتك مسموع… <br />
            <span className="text-teal-700">ومتابعة شكواك حقك</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
            المنصة الخدمية الموحدة في محافظة الرقة لربط المواطن مباشرة بفرق الصيانة والمكاتب التنفيذية.
            قدّم بلاغك في دقائق وتابع كل خطوة برقم شكوى رسمي وموثّق.
          </p>

          {/* Direct Tracking Quick Bar */}
          <form
            onSubmit={handleQuickTrackSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2 max-w-lg bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100 transition-all"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="h-4 w-4 text-slate-400 mr-3 pointer-events-none" />
              <input
                type="text"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                placeholder="أدخل رقم الشكوى للتتبع (مثال: RQ-2026-000132)"
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 py-2 pl-3 pr-2 outline-none font-sans"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors duration-150 shrink-0"
            >
              متابعة الشكوى
            </button>
          </form>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              حماية تامة لبيانات المواطن
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal-600" />
              متوسط معالجة 2 إلى 3 أيام
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
              إشعار رسمي بكل تحديث
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Live Status Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-slate-800">
                  لوحة التنسيق المباشر — الرقة
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {new Date().toISOString().substring(0, 10)}
              </span>
            </div>

            {/* Quick Live Snapshot Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-teal-50/60 rounded-xl p-3 border border-teal-100">
                <span className="text-[11px] font-medium text-teal-800 block">شكاوى عولجت</span>
                <span className="font-heading font-extrabold text-2xl text-teal-900 mt-0.5 block">
                  1,853
                </span>
                <span className="text-[10px] text-teal-600">من أصل 2,382 شكوى</span>
              </div>

              <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-100">
                <span className="text-[11px] font-medium text-amber-800 block">قيد التنفيذ اليوم</span>
                <span className="font-heading font-extrabold text-2xl text-amber-900 mt-0.5 block">
                  412
                </span>
                <span className="text-[10px] text-amber-600">بين ورشات المياه والكهرباء</span>
              </div>
            </div>

            {/* Recently received alert */}
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 text-xs">
              <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                <span className="font-bold text-slate-700">آخر تحرك ميداني:</span>
                <span className="text-[10px]">منذ 15 دقيقة</span>
              </div>
              <p className="text-slate-700 leading-snug">
                انتقال ورشة صيانة المياه لمعالجة كسر أنبوب في حي المشلب بالتنسيق مع مجلس المدينة.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onStartComplaint}
                className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm text-center shadow-xs transition-colors"
              >
                قدّم شكوى جديدة الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
