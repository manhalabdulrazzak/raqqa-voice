import React from 'react';
import { Home, FilePlus2, Search, Building2, HelpCircle } from 'lucide-react';

interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentRoute, onNavigate }) => {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden shadow-lg select-none"
      aria-label="التنقل الرئيسي الميداني"
    >
      <ul className="grid grid-cols-5 items-center h-16">
        {/* الرئيسية */}
        <li>
          <button
            onClick={() => onNavigate('home')}
            className={`w-full flex flex-col items-center justify-center gap-1 py-1 transition-colors min-h-[44px] ${
              currentRoute === 'home' ? 'text-teal-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[10px]">الرئيسية</span>
          </button>
        </li>

        {/* متابعة */}
        <li>
          <button
            onClick={() => onNavigate('track')}
            className={`w-full flex flex-col items-center justify-center gap-1 py-1 transition-colors min-h-[44px] ${
              currentRoute === 'track' ? 'text-teal-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[10px]">متابعة</span>
          </button>
        </li>

        {/* شكوى جديدة - Prominent Center Button */}
        <li>
          <button
            onClick={() => onNavigate('submit')}
            className="w-full flex flex-col items-center justify-center -mt-4 min-h-[48px]"
          >
            <div className="h-12 w-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform border-2 border-white">
              <FilePlus2 className="h-6 w-6 stroke-[2.4]" />
            </div>
            <span className="text-[10px] font-bold text-teal-900 mt-0.5">شكوى جديدة</span>
          </button>
        </li>

        {/* المديريات */}
        <li>
          <button
            onClick={() => onNavigate('directorates')}
            className={`w-full flex flex-col items-center justify-center gap-1 py-1 transition-colors min-h-[44px] ${
              currentRoute === 'directorates' ? 'text-teal-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[10px]">المديريات</span>
          </button>
        </li>

        {/* المساعدة */}
        <li>
          <button
            onClick={() => onNavigate('help')}
            className={`w-full flex flex-col items-center justify-center gap-1 py-1 transition-colors min-h-[44px] ${
              currentRoute === 'help' ? 'text-teal-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[10px]">المساعدة</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
