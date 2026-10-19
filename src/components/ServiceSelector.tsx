import React, { useState } from 'react';
import { AnimatedServiceIcon } from './AnimatedServiceIcon';
import { DIRECTORATES_CATALOG } from '../lib/directorates';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Directorate } from '../lib/types';

interface ServiceSelectorProps {
  onSelectService: (directorate: Directorate) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ onSelectService }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Active Raqqa directorates
  const raqqaServices = DIRECTORATES_CATALOG.filter((d) => d.governorateId === 'raqqa');

  return (
    <section className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
            <span className="h-2 w-2 rounded-full bg-teal-600"></span>
            <span>القطاعات الخدمية الميدانية في محافظة الرقة</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
            ما المشكلة التي تريد إيصالها؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            اختر القطاع المعني لفتح نموذج الشكوى مباشرة وتوجيه بلاغك للجهة المسؤولة دون تعقيد إداري
          </p>
        </div>
        <div className="text-xs text-slate-400 hidden sm:block">
          10 مديريات خدمية نشطة
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {raqqaServices.map((service) => {
          const isHovered = hoveredId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative flex flex-col justify-between p-4 rounded-xl border bg-white cursor-pointer select-none transition-all duration-200 ${
                isHovered
                  ? 'border-teal-600/70 shadow-md -translate-y-1 bg-gradient-to-b from-white to-teal-50/20'
                  : 'border-slate-200/90 shadow-xs hover:border-slate-300'
              }`}
            >
              <div>
                {/* Icon wrapper */}
                <div
                  className={`h-11 w-11 rounded-xl flex items-center justify-center transition-colors duration-200 mb-3 ${
                    isHovered
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'bg-teal-50 text-teal-800 border border-teal-100'
                  }`}
                >
                  <AnimatedServiceIcon
                    category={service.icon}
                    size={24}
                    isHovered={isHovered}
                    color={isHovered ? '#FFFFFF' : '#0E6258'}
                  />
                </div>

                {/* Service Name */}
                <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-teal-900 transition-colors line-clamp-1">
                  {service.serviceCategory}
                </h3>

                {/* Short Authority Name */}
                <div className="text-[11px] text-teal-700/90 font-medium mt-0.5 line-clamp-1">
                  {service.nameAr}
                </div>

                {/* Short description */}
                <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Action trigger & response time hint */}
              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">
                  الاستجابة: ~{service.stats.avgResponseDays} يوم
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-bold transition-all duration-200 ${
                    isHovered
                      ? 'text-teal-700 translate-x-[-3px]'
                      : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  <span>تقديم</span>
                  <ArrowLeft className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
