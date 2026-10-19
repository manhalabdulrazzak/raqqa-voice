import React, { useState, useEffect } from 'react';
import {
  FilePlus2,
  Search,
  Building2,
  BarChart3,
  HelpCircle,
  Menu,
  X,
  Smartphone,
  Shield,
  Layers,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  activeRole: string;
  onRoleChange: (role: string) => void;
  isAndroidView: boolean;
  onToggleAndroidView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  activeRole,
  onRoleChange,
  isAndroidView,
  onToggleAndroidView,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', icon: null },
    { id: 'submit', label: 'تقديم شكوى', icon: FilePlus2, highlight: true },
    { id: 'track', label: 'متابعة شكوى', icon: Search },
    { id: 'directorates', label: 'المديريات الخدمية', icon: Building2 },
    { id: 'transparency', label: 'الشفافية والبيانات', icon: BarChart3 },
    { id: 'help', label: 'المساعدة', icon: HelpCircle },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-2.5'
          : 'bg-white border-b border-slate-150 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Civic Identity */}
          <div
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Civic Emblem */}
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-150 border border-teal-800">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-white stroke-[2.2]">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                <path d="M12 8v5" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  صوت الرقة
                </span>
                <span className="hidden sm:inline-flex items-center text-[11px] font-medium bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md border border-teal-200/80">
                  محافظة الرقة
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                صوتك مسموع… ومتابعة شكواك حقك
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              const Icon = link.icon;

              if (link.highlight) {
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 shadow-sm transition-all duration-150 hover:shadow"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{link.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'bg-teal-50 text-teal-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5 opacity-70" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2">
            {/* Android View Toggle */}
            <button
              onClick={onToggleAndroidView}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                isAndroidView
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="معاينة تطبيق أندرويد الميداني"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">تطبيق أندرويد</span>
            </button>

            {/* Design System & Motion Specs Link */}
            <button
              onClick={() => onNavigate('design-system')}
              className={`hidden sm:inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                currentRoute === 'design-system'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="دليل التصميم والحركة"
            >
              <Layers className="h-3.5 w-3.5 text-teal-600" />
              <span className="hidden xl:inline">نظام التصميم والحركة</span>
            </button>

            {/* Institutional Portal Switcher (دخول الجهات) */}
            <div className="relative">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors"
                aria-expanded={portalDropdownOpen}
              >
                <Shield className="h-3.5 w-3.5 text-teal-700" />
                <span>دخول الجهات</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {portalDropdownOpen && (
                <div
                  className="absolute left-0 sm:right-auto sm:left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 text-xs z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onClick={() => setPortalDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    بوابات العمل المؤسسي
                  </div>

                  <button
                    onClick={() => {
                      onRoleChange('directorate_admin');
                      onNavigate('directorate-portal');
                    }}
                    className={`w-full text-right px-3 py-2 rounded-lg flex flex-col gap-0.5 transition-colors ${
                      currentRoute === 'directorate-portal'
                        ? 'bg-teal-50 text-teal-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      <span>بوابة المديرية الخدمية</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        مياه / صحة
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      مديرية المياه — محافظة الرقة
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('governorate_admin');
                      onNavigate('governorate-admin');
                    }}
                    className={`w-full text-right px-3 py-2 rounded-lg flex flex-col gap-0.5 transition-colors ${
                      currentRoute === 'governorate-admin'
                        ? 'bg-teal-50 text-teal-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">
                      إدارة محافظة الرقة
                    </div>
                    <span className="text-[10px] text-slate-500">
                      إشراف عام وتقارير كافة مديريات الرقة
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('central_admin');
                      onNavigate('central-admin');
                    }}
                    className={`w-full text-right px-3 py-2 rounded-lg flex flex-col gap-0.5 transition-colors ${
                      currentRoute === 'central-admin'
                        ? 'bg-teal-50 text-teal-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      <span>الإدارة الوطنية المركزية</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                        سوريا
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      إدارة المحافظات وتفعيل التوسع
                    </span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        onRoleChange('citizen');
                        onNavigate('home');
                      }}
                      className="w-full text-right px-3 py-1.5 text-[11px] font-medium text-slate-500 hover:text-teal-700 rounded-lg hover:bg-slate-50"
                    >
                      العودة لواجهة المواطن
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-2 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-right flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4 opacity-70" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-150 flex flex-col gap-1.5">
              <button
                onClick={() => {
                  onToggleAndroidView();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <Smartphone className="h-4 w-4 text-emerald-600" />
                <span>تبديل لمعاينة تطبيق أندرويد الميداني</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('design-system');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <Layers className="h-4 w-4 text-teal-600" />
                <span>نظام التصميم والحركة (Design & Motion Specs)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
