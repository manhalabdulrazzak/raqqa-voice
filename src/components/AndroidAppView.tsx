import React, { useState } from 'react';
import { Complaint, Directorate } from '../lib/types';
import { DIRECTORATES_CATALOG } from '../lib/directorates';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';
import {
  Home,
  FilePlus2,
  Search,
  Bell,
  MoreHorizontal,
  Wifi,
  Battery,
  Signal,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Smartphone,
  X,
} from 'lucide-react';

interface AndroidAppViewProps {
  complaints: Complaint[];
  onExitAndroidMode: () => void;
  onTrackComplaintExternal: (id: string) => void;
}

export const AndroidAppView: React.FC<AndroidAppViewProps> = ({
  complaints,
  onExitAndroidMode,
  onTrackComplaintExternal,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'new' | 'track' | 'notifications' | 'more'>('home');
  const [trackQuery, setTrackQuery] = useState('RQ-2026-000128');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    complaints.find((c) => c.id === 'RQ-2026-000128') || complaints[0] || null
  );

  // New complaint mobile state
  const [newCategory, setNewCategory] = useState('المياه والصرف الصحي');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDistrict, setNewDistrict] = useState('حي المشلب');
  const [newSuccess, setNewSuccess] = useState<string | null>(null);

  const raqqaServices = DIRECTORATES_CATALOG.filter((d) => d.governorateId === 'raqqa');

  const notifications = [
    {
      id: 'n1',
      title: 'تم تحديث حالة الشكوى RQ-2026-000128',
      desc: 'باشرت ورشة الصيانة المركزية لمياه الرقة أعمال الحفر الميداني في حي الرميلة.',
      time: 'منذ 25 دقيقة',
      complaintId: 'RQ-2026-000128',
    },
    {
      id: 'n2',
      title: 'تم إغلاق الشكوى RQ-2026-000132',
      desc: 'تم الانتهاء من ترحيل النفايات بالكامل في حي المشلب.',
      time: 'أمس 14:30',
      complaintId: 'RQ-2026-000132',
    },
  ];

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;
    const randNum = Math.floor(100 + Math.random() * 899);
    const id = `RQ-2026-000${randNum}`;
    setNewSuccess(id);
  };

  return (
    <div className="py-6 px-4 flex flex-col items-center">
      {/* Top Banner explaining Android Simulator */}
      <div className="max-w-md w-full mb-4 flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-emerald-700" />
          <span className="font-bold">محاكاة تطبيق صوت الرقة للأندرويد (APK Preview)</span>
        </div>
        <button
          onClick={onExitAndroidMode}
          className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline"
        >
          العودة للمتصفح
        </button>
      </div>

      {/* Android Device Mockup Frame */}
      <div className="w-[380px] max-w-full bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden select-none">
        {/* Android Screen */}
        <div className="bg-[#F8F9FA] rounded-[36px] overflow-hidden flex flex-col h-[740px] text-slate-800 relative">
          {/* Android Status Bar */}
          <div className="h-7 bg-white px-5 flex items-center justify-between text-[11px] font-medium text-slate-700 border-b border-slate-100 z-10 shrink-0">
            <span>09:41</span>
            <div className="h-4 w-28 bg-slate-900 rounded-full mx-auto self-center"></div>
            <div className="flex items-center gap-1.5">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Android App Top Header */}
          <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                RQ
              </div>
              <div>
                <span className="font-heading font-bold text-sm text-slate-900 block leading-tight">
                  صوت الرقة
                </span>
                <span className="text-[10px] text-teal-700 font-medium">محافظة الرقة</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-semibold text-slate-500">متصل</span>
            </div>
          </div>

          {/* Screen Body Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB 1: HOME */}
            {activeTab === 'home' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Hero Greeting Card */}
                <div className="bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] bg-teal-700/60 text-teal-100 px-2 py-0.5 rounded-full font-medium">
                      محافظة الرقة الميدانية
                    </span>
                    <span className="text-[10px] text-teal-300 font-mono">2026</span>
                  </div>
                  <h2 className="font-heading font-extrabold text-lg text-white">
                    صوتك مسموع وموثّق
                  </h2>
                  <p className="text-[11px] text-teal-100 mt-1 leading-snug">
                    أبلغ عن أي عطل خدمي في حيك لتصل فرق الطوارئ فوراً
                  </p>
                  <button
                    onClick={() => setActiveTab('new')}
                    className="mt-3.5 w-full py-2 rounded-xl bg-white text-teal-900 font-bold text-xs shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <FilePlus2 className="h-3.5 w-3.5" />
                    <span>تسجيل شكوى جديدة</span>
                  </button>
                </div>

                {/* Quick Track Input in Android */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <Search className="h-3.5 w-3.5 text-teal-700" />
                    <span>متابعة شكوى سريعة</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      placeholder="رقم الشكوى..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono outline-none uppercase"
                    />
                    <button
                      onClick={() => {
                        const found = complaints.find((c) => c.id === trackQuery.trim());
                        if (found) setSelectedComplaint(found);
                        setActiveTab('track');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                    >
                      تتبع
                    </button>
                  </div>
                </div>

                {/* Service Shortcuts Grid */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2.5">
                    <span>الخدمات المتاحة بالرقة</span>
                    <span className="text-[10px] text-teal-700 font-normal">10 قطاعات</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {raqqaServices.slice(0, 6).map((service) => (
                      <div
                        key={service.id}
                        onClick={() => {
                          setNewCategory(service.serviceCategory);
                          setActiveTab('new');
                        }}
                        className="bg-white p-2.5 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center hover:border-teal-500 cursor-pointer shadow-2xs"
                      >
                        <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center mb-1.5">
                          <AnimatedServiceIcon category={service.icon} size={18} />
                        </div>
                        <span className="font-heading font-bold text-[10px] text-slate-800 line-clamp-1">
                          {service.serviceCategory}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Tracking Mini-Widget */}
                {selectedComplaint && (
                  <div
                    onClick={() => setActiveTab('track')}
                    className="p-3 bg-white rounded-2xl border border-emerald-200 cursor-pointer hover:border-emerald-400 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-bold text-slate-700">آخر شكوى تتابعها:</span>
                      <span className="font-mono text-teal-800 font-bold">{selectedComplaint.id}</span>
                    </div>
                    <div className="font-heading font-bold text-xs text-slate-900 line-clamp-1">
                      {selectedComplaint.title}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-700">
                        الحالة: {selectedComplaint.status === 'resolved' ? 'تم الحل' : 'قيد المعالجة'}
                      </span>
                      <span className="text-slate-400 flex items-center gap-0.5">
                        تفاصيل <ChevronRight className="h-3 w-3 rotate-180" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: NEW COMPLAINT */}
            {activeTab === 'new' && (
              <div className="space-y-3 animate-in fade-in duration-150 text-xs">
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  تسجيل شكوى جديدة في الرقة
                </h3>

                {newSuccess ? (
                  <div className="bg-white p-5 rounded-2xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                    <h4 className="font-heading font-bold text-base text-slate-900">
                      تم استلام الشكوى بنجاح!
                    </h4>
                    <div className="font-mono font-bold text-lg text-teal-900 bg-slate-50 p-2 rounded-xl border border-slate-200">
                      {newSuccess}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      تم توجيه الشكوى لورشة الرقة المختصة
                    </p>
                    <button
                      onClick={() => {
                        setNewSuccess(null);
                        setActiveTab('home');
                      }}
                      className="w-full py-2 rounded-xl bg-teal-700 text-white font-bold text-xs"
                    >
                      العودة للرئيسية
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMobileSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">الخدمة المعنية:</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                      >
                        {raqqaServices.map((s) => (
                          <option key={s.id} value={s.serviceCategory}>
                            {s.serviceCategory}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">الحي بالرقة:</label>
                      <select
                        value={newDistrict}
                        onChange={(e) => setNewDistrict(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                      >
                        <option value="حي المشلب">حي المشلب</option>
                        <option value="حي الرميلة">حي الرميلة</option>
                        <option value="حي الفردوس">حي الفردوس</option>
                        <option value="حي الدرعية">حي الدرعية</option>
                        <option value="حي الثكنة">حي الثكنة</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">عنوان المشكلة:</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="مثال: تسريب مياه أمام المنزل"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">الشرح:</label>
                      <textarea
                        rows={3}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="اشرح ما حدث..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs shadow-xs"
                    >
                      إرسال الشكوى فوراً
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: TRACK */}
            {activeTab === 'track' && selectedComplaint && (
              <div className="space-y-3 animate-in fade-in duration-150 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-teal-900 text-sm">
                      {selectedComplaint.id}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                      محافظة الرقة
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-xs">
                    {selectedComplaint.title}
                  </h3>

                  <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">الجهة:</span>
                      <span className="font-bold text-teal-800">{selectedComplaint.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">الحي:</span>
                      <span className="font-semibold text-slate-700">{selectedComplaint.location.district}</span>
                    </div>
                  </div>

                  {/* Native Timeline */}
                  <div>
                    <span className="font-bold text-slate-800 block mb-2">المسار الزمني:</span>
                    <div className="border-r-2 border-slate-200 mr-2 pr-3 space-y-3">
                      {selectedComplaint.timeline.map((event, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -right-[17px] top-1 h-2.5 w-2.5 rounded-full bg-teal-600"></div>
                          <div className="font-bold text-[11px] text-slate-800">{event.title}</div>
                          <div className="text-[10px] text-slate-400">{event.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="space-y-3 animate-in fade-in duration-150 text-xs">
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  إشعارات المتابعة الميدانية
                </h3>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      const c = complaints.find((x) => x.id === n.complaintId);
                      if (c) setSelectedComplaint(c);
                      setActiveTab('track');
                    }}
                    className="p-3 bg-white rounded-2xl border border-slate-200 cursor-pointer hover:border-teal-500 shadow-2xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-900 text-xs">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 5: MORE */}
            {activeTab === 'more' && (
              <div className="space-y-3 animate-in fade-in duration-150 text-xs">
                <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                  <div className="p-3">
                    <span className="font-bold text-slate-800 block">محافظة الرقة</span>
                    <span className="text-[10px] text-slate-400">الإطلاق التجريبي النشط 2026</span>
                  </div>
                  <div className="p-3">
                    <span className="font-bold text-slate-800 block">الخصوصية وحماية الهوية</span>
                    <span className="text-[10px] text-slate-400">بيانات المواطن مشفرة بالكامل</span>
                  </div>
                  <div className="p-3">
                    <span className="font-bold text-slate-800 block">دليل هواتف الطوارئ بالرقة</span>
                    <span className="text-[10px] text-slate-400">طوارئ المياه 124 / الكهرباء 118</span>
                  </div>
                  <div className="p-3">
                    <span className="font-bold text-slate-800 block">الوضع غير المتصل (Offline Ready)</span>
                    <span className="text-[10px] text-emerald-700">تخزين مؤقت متاح في حال ضعف الشبكة</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Android Native Bottom Navigation Bar */}
          <div className="bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around text-[10px] text-slate-500 shrink-0 z-10">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'home' ? 'text-teal-800 font-bold' : ''
              }`}
            >
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </button>

            <button
              onClick={() => setActiveTab('new')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'new' ? 'text-teal-800 font-bold' : ''
              }`}
            >
              <FilePlus2 className="h-4 w-4" />
              <span>شكوى جديدة</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'track' ? 'text-teal-800 font-bold' : ''
              }`}
            >
              <Search className="h-4 w-4" />
              <span>متابعة</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex flex-col items-center gap-0.5 relative ${
                activeTab === 'notifications' ? 'text-teal-800 font-bold' : ''
              }`}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              <span>الإشعارات</span>
            </button>

            <button
              onClick={() => setActiveTab('more')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'more' ? 'text-teal-800 font-bold' : ''
              }`}
            >
              <MoreHorizontal className="h-4 w-4" />
              <span>المزيد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
