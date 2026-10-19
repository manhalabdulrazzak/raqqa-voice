import React, { useState } from 'react';
import { ALL_GOVERNORATES, getActiveGovernorate } from '../lib/governorates';
import { GovernorateId } from '../lib/types';
import { CheckCircle2, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface SyriaExpansionMapProps {
  interactive?: boolean;
  onSelectGovernorate?: (id: GovernorateId) => void;
  selectedGovId?: GovernorateId;
  showAdminBadge?: boolean;
}

export const SyriaExpansionMap: React.FC<SyriaExpansionMapProps> = ({
  interactive = true,
  onSelectGovernorate,
  selectedGovId = 'raqqa',
  showAdminBadge = false,
}) => {
  const [hoveredGov, setHoveredGov] = useState<GovernorateId | null>(null);

  // Simplified schematic layout of Syrian governorates for reliable rendering across all screens
  const governoratePins: {
    id: GovernorateId;
    name: string;
    x: number;
    y: number;
    isActive: boolean;
    isConfigured: boolean;
  }[] = [
    { id: 'raqqa', name: 'الرقة', x: 58, y: 34, isActive: true, isConfigured: true },
    { id: 'aleppo', name: 'حلب', x: 42, y: 22, isActive: false, isConfigured: true },
    { id: 'idlib', name: 'إدلب', x: 30, y: 28, isActive: false, isConfigured: false },
    { id: 'latakia', name: 'اللاذقية', x: 20, y: 35, isActive: false, isConfigured: false },
    { id: 'tartus', name: 'طرطوس', x: 22, y: 48, isActive: false, isConfigured: false },
    { id: 'hama', name: 'حماة', x: 34, y: 42, isActive: false, isConfigured: false },
    { id: 'homs', name: 'حمص', x: 44, y: 55, isActive: false, isConfigured: true },
    { id: 'damascus', name: 'دمشق', x: 30, y: 72, isActive: false, isConfigured: true },
    { id: 'rural_damascus', name: 'ريف دمشق', x: 38, y: 68, isActive: false, isConfigured: false },
    { id: 'daraa', name: 'درعا', x: 28, y: 86, isActive: false, isConfigured: false },
    { id: 'sweida', name: 'السويداء', x: 38, y: 88, isActive: false, isConfigured: false },
    { id: 'quneitra', name: 'القنيطرة', x: 22, y: 80, isActive: false, isConfigured: false },
    { id: 'deir_ez_zor', name: 'دير الزور', x: 74, y: 52, isActive: false, isConfigured: false },
    { id: 'hasakah', name: 'الحسكة', x: 80, y: 20, isActive: false, isConfigured: false },
  ];

  const currentHovered = hoveredGov
    ? ALL_GOVERNORATES.find((g) => g.id === hoveredGov)
    : ALL_GOVERNORATES.find((g) => g.id === selectedGovId);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-600 animate-pulse"></span>
            <h3 className="font-heading font-bold text-base text-slate-800">
              خارطة التوسع والجاهزية الوطنية
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            وطنية من الداخل، رقاوية في الإطلاق الأول — معمارية موحدة جاهزة لكافة المحافظات
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 font-medium text-teal-800 border border-teal-200">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600"></span>
            محافظة الرقة (نشطة - الإطلاق الأول)
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600 border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            محافظات مهيأة للتوسع
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Syria Map Container */}
        <div className="lg:col-span-7 relative bg-slate-50/70 rounded-xl p-4 border border-slate-100 flex items-center justify-center min-h-[300px]">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-auto max-h-[340px] drop-shadow-sm select-none"
          >
            {/* Outline of Syrian Border (Stylized Geographic Silhouette) */}
            <path
              d="M 18,34 Q 22,25 35,20 L 45,18 Q 60,18 78,14 L 88,18 Q 92,26 84,36 L 78,48 Q 72,62 58,68 L 46,74 Q 38,88 28,92 L 20,84 Q 18,68 22,50 Z"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Euphrates River flowing through Raqqa & Deir ez-Zor */}
            <path
              d="M 44,18 Q 54,28 62,38 T 80,62"
              fill="none"
              stroke="#93C5FD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 1"
              opacity="0.8"
            />

            {/* Raqqa Highlighted Active Zone */}
            <circle
              cx="58"
              cy="34"
              r="9"
              fill="#0E6258"
              fillOpacity="0.12"
              stroke="#0E6258"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              className="animate-spin"
              style={{ animationDuration: '24s' }}
            />

            {/* Governorate Pins */}
            {governoratePins.map((pin) => {
              const isSelected = selectedGovId === pin.id;
              const isHover = hoveredGov === pin.id;

              return (
                <g
                  key={pin.id}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => interactive && onSelectGovernorate && onSelectGovernorate(pin.id)}
                  onMouseEnter={() => setHoveredGov(pin.id)}
                  onMouseLeave={() => setHoveredGov(null)}
                >
                  {/* Pin Base */}
                  {pin.isActive ? (
                    <>
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r="4"
                        fill="#0E6258"
                        className="animate-ping opacity-30"
                      />
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r="3.2"
                        fill="#0E6258"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    </>
                  ) : (
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isSelected ? '2.8' : '2'}
                      fill={pin.isConfigured ? '#64748B' : '#94A3B8'}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                      opacity={isHover ? 1 : 0.75}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={pin.x}
                    y={pin.y - 4}
                    textAnchor="middle"
                    fontSize={pin.isActive ? '3.8' : '3'}
                    fontWeight={pin.isActive ? 'bold' : 'normal'}
                    fill={pin.isActive ? '#0E6258' : isHover ? '#0F172A' : '#64748B'}
                    className="font-heading pointer-events-none transition-colors"
                  >
                    {pin.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-200/70">
            نهر الفرات يمر عبر الرقة · محاكاة جغرافية
          </div>
        </div>

        {/* Selected or Hovered Governorate Details Card */}
        <div className="lg:col-span-5 bg-slate-50/60 rounded-xl p-4 border border-slate-200">
          {currentHovered ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500">تفاصيل المحافظة</div>
                  <h4 className="font-heading font-bold text-lg text-slate-900 mt-0.5">
                    {currentHovered.nameAr}
                  </h4>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    currentHovered.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : currentHovered.status === 'configured'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {currentHovered.status === 'active'
                    ? 'نشطة — الإطلاق التجريبي'
                    : currentHovered.status === 'configured'
                    ? 'مهيأة في قاعدة البيانات'
                    : 'ضمن خطة التوسع'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block">المركز الإداري:</span>
                  <span className="font-medium text-slate-800">{currentHovered.center}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block">المديريات المفعلة:</span>
                  <span className="font-bold text-teal-700">
                    {currentHovered.activeDirectoratesCount} جهات خدمية
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block">تقدير السكان:</span>
                  <span className="font-medium text-slate-800">
                    {currentHovered.populationEstimate}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block">تاريخ الإطلاق:</span>
                  <span className="font-medium text-slate-800">
                    {currentHovered.launchDate || 'يحدد لاحقاً'}
                  </span>
                </div>
              </div>

              {currentHovered.id === 'raqqa' ? (
                <div className="rounded-lg bg-teal-50 border border-teal-200 p-3 text-xs text-teal-900 leading-relaxed">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-teal-950">
                    <CheckCircle2 className="h-4 w-4 text-teal-700 shrink-0" />
                    المحافظة المستهدفة في الإطلاق الأول
                  </div>
                  كافة الخدمات البلدية والمياه والكهرباء والصحة والنظافة والتموين تعمل بكامل طاقتها
                  لاستقبال ومتابعة شكاوى أهالي الرقة.
                </div>
              ) : (
                <div className="rounded-lg bg-slate-100 border border-slate-200 p-3 text-xs text-slate-600 leading-relaxed">
                  <div className="font-semibold text-slate-800 mb-0.5">
                    الاستعداد للتوسع السلس
                  </div>
                  تمت هندسة الهياكل وقواعد البيانات لعزل البيانات ودعم هذه المحافظة فور صدور قرار
                  التشغيل دون أي إعادة برمجة للواجهات.
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              مرر المؤشر فوق أي محافظة على الخريطة لعرض تفاصيل التوسع
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
