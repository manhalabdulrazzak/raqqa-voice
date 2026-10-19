import React from 'react';
import { ShieldCheck, Phone, MapPin, Building2, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenPortal: (role: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPortal }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-700">
      {/* Top Footer Strip: Emergency Hotlines in Raqqa */}
      <div className="border-b border-slate-100 bg-slate-50/70 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Phone className="h-3.5 w-3.5 text-teal-700" />
            <span>أرقام الطوارئ المباشرة في محافظة الرقة:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
              طوارئ المياه: <strong className="text-teal-800 font-mono font-bold">124</strong>
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
              طوارئ الكهرباء: <strong className="text-teal-800 font-mono font-bold">118</strong>
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
              طوارئ الإسعاف والصحة: <strong className="text-teal-800 font-mono font-bold">113</strong>
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
              طوارئ الإطفاء والبلدية: <strong className="text-teal-800 font-mono font-bold">115</strong>
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
              الرقابة التموينية: <strong className="text-teal-800 font-mono font-bold">119</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity & Motto */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold">
                RQ
              </div>
              <div>
                <span className="font-heading font-extrabold text-base text-slate-900 block leading-tight">
                  منصة صوت الرقة
                </span>
                <span className="text-[11px] text-teal-800 font-medium">محافظة الرقة</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              صوتك مسموع… ومتابعة شكواك حقك.
              المنصة الموحدة للشكاوى والمقترحات الخدمية لأهالي محافظة الرقة.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
              <span>معمارية وطنية قابلة للتوسع لكافة المحافظات</span>
            </div>
          </div>

          {/* Col 2: Citizen Services */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
              خدمات المواطنين
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('submit')}
                  className="hover:text-teal-800 transition-colors"
                >
                  تقديم شكوى خدمية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-teal-800 transition-colors"
                >
                  متابعة حالة شكوى برقم التتبع
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('submit')}
                  className="hover:text-teal-800 transition-colors"
                >
                  تقديم بلاغ سري محمي
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('directorates')}
                  className="hover:text-teal-800 transition-colors"
                >
                  دليل المديريات ومكاتب الشكاوى
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('transparency')}
                  className="hover:text-teal-800 transition-colors"
                >
                  لوحة الشفافية والبيانات المفتوحة
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Information */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
              المساعدة والسياسات
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('help')}
                  className="hover:text-teal-800 transition-colors"
                >
                  الأسئلة الشائعة وإرشادات المواطن
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('help')}
                  className="hover:text-teal-800 transition-colors"
                >
                  ميثاق حماية البيانات وسرية الهوية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('design-system')}
                  className="hover:text-teal-800 transition-colors"
                >
                  دليل نظام التصميم والحركة (Design Specs)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals for Authorities (دخول الجهات) */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
              بوابات العمل المؤسسي
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onOpenPortal('directorate_admin')}
                  className="hover:text-teal-800 transition-colors text-right block"
                >
                  بوابة المديرية الخدمية (صحة / مياه / كهرباء)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('governorate_admin')}
                  className="hover:text-teal-800 transition-colors text-right block"
                >
                  بوابة إدارة محافظة الرقة (إشراف عام)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('central_admin')}
                  className="hover:text-teal-800 transition-colors text-right block"
                >
                  الإدارة الوطنية المركزية (تفعيل المحافظات)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 محافظة الرقة — المنصة الموحدة للشكاوى والمقترحات الخدمية.</p>
          <p className="text-[11px] font-medium text-slate-500">
            وطنية من الداخل، رقاوية في الإطلاق الأول · سوريا
          </p>
        </div>
      </div>
    </footer>
  );
};
