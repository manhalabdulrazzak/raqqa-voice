/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  getStoredComplaints,
  saveComplaint,
  updateComplaintStatusInStorage,
} from './lib/complaintsData';
import { Complaint, ComplaintStatus, ComplaintType, Directorate } from './lib/types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ActionHub } from './components/ActionHub';
import { ServiceSelector } from './components/ServiceSelector';
import { TransparencySummary } from './components/TransparencySummary';
import { ResolvedCasesFeed } from './components/ResolvedCasesFeed';
import { SyriaExpansionMap } from './components/SyriaExpansionMap';
import { ComplaintWizard } from './components/ComplaintWizard';
import { ComplaintTracker } from './components/ComplaintTracker';
import { DirectoratesDirectory } from './components/DirectoratesDirectory';
import { TransparencyDashboard } from './components/TransparencyDashboard';
import { HelpSection } from './components/HelpSection';
import { DirectoratePortal } from './components/DirectoratePortal';
import { GovernorateAdmin } from './components/GovernorateAdmin';
import { CentralAdmin } from './components/CentralAdmin';
import { AndroidAppView } from './components/AndroidAppView';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ShieldCheck, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [complaints, setComplaints] = useState<Complaint[]>(getStoredComplaints);
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeRole, setActiveRole] = useState<string>('citizen');
  const [isAndroidView, setIsAndroidView] = useState<boolean>(false);

  // Quick Tracking & Preconfiguration states
  const [quickTrackId, setQuickTrackId] = useState<string>('');
  const [activeTrackId, setActiveTrackId] = useState<string>('');
  const [complaintType, setComplaintType] = useState<ComplaintType>('standard');
  const [preselectedDirectorate, setPreselectedDirectorate] = useState<Directorate | null>(null);

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const trackParam = params.get('track');
      const portalParam = params.get('portal');
      const viewParam = params.get('view');

      if (trackParam) {
        setActiveTrackId(trackParam);
        setCurrentRoute('track');
      } else if (portalParam) {
        if (portalParam === 'directorate') {
          setActiveRole('directorate_admin');
          setCurrentRoute('directorate-portal');
        } else if (portalParam === 'governorate') {
          setActiveRole('governorate_admin');
          setCurrentRoute('governorate-admin');
        } else if (portalParam === 'central') {
          setActiveRole('central_admin');
          setCurrentRoute('central-admin');
        }
      } else if (viewParam === 'android') {
        setIsAndroidView(true);
      }
    }
  }, []);

  // Handlers
  const handleStartComplaint = (type: ComplaintType = 'standard', directorate: Directorate | null = null) => {
    setComplaintType(type);
    setPreselectedDirectorate(directorate);
    setCurrentRoute('submit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickTrackSubmit = (id: string) => {
    setActiveTrackId(id);
    setCurrentRoute('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplaintCreated = (newComplaint: Complaint) => {
    const updated = saveComplaint(newComplaint);
    setComplaints(updated);
  };

  const handleUpdateComplaint = (
    id: string,
    updates: Partial<Complaint>,
    newEvent?: { status: ComplaintStatus; title: string; description: string; actor: string }
  ) => {
    const updated = updateComplaintStatusInStorage(id, updates, newEvent);
    setComplaints(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B]">
      {/* Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={(route) => {
          setCurrentRoute(route);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        isAndroidView={isAndroidView}
        onToggleAndroidView={() => setIsAndroidView(!isAndroidView)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-6">
        {/* ANDROID SIMULATOR MODE */}
        {isAndroidView ? (
          <AndroidAppView
            complaints={complaints}
            onExitAndroidMode={() => setIsAndroidView(false)}
            onTrackComplaintExternal={(id) => {
              setActiveTrackId(id);
              setCurrentRoute('track');
              setIsAndroidView(false);
            }}
          />
        ) : (
          <>
            {/* ROUTE: HOME */}
            {currentRoute === 'home' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Hero Section */}
                <HeroSection
                  onStartComplaint={() => handleStartComplaint('standard')}
                  onTrackComplaint={() => {
                    setCurrentRoute('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  quickTrackId={quickTrackId}
                  setQuickTrackId={setQuickTrackId}
                  onSubmitQuickTrack={handleQuickTrackSubmit}
                />

                {/* Primary Action Hub */}
                <ActionHub
                  onStartComplaint={(type) => handleStartComplaint(type)}
                  onTrackComplaint={() => {
                    setCurrentRoute('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Interactive Service Selector */}
                <ServiceSelector
                  onSelectService={(dir) => handleStartComplaint('standard', dir)}
                />

                {/* Privacy & Citizen Protection Banner (Section 23 of Brief) */}
                <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center shrink-0">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-slate-900">
                        خصوصيتك أولويتنا وضمانتنا
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                        بياناتك الشخصية وأرقام هواتفك محمية بموجب معايير حوكمة البيانات المعتمدة في محافظة الرقة.
                        الإحصاءات العامة المنشورة مجهولة المصدر بالكامل ولا تكشف هوية أي مواطن، كما يمكنك استخدام مسار البلاغ السري بحرية تامة.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentRoute('help');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl border border-teal-200/80 transition-colors shrink-0 self-start md:self-auto"
                  >
                    ميثاق الخصوصية وحقوق المواطن
                  </button>
                </section>

                {/* Live Transparency Summary */}
                <TransparencySummary
                  onViewFullTransparency={() => {
                    setCurrentRoute('transparency');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Recently Resolved Cases Feed */}
                <ResolvedCasesFeed
                  complaints={complaints}
                  onSelectComplaintForTracking={(id) => {
                    setActiveTrackId(id);
                    setCurrentRoute('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Scalability Syria Map Section */}
                <SyriaExpansionMap />
              </div>
            )}

            {/* ROUTE: COMPLAINT SUBMISSION WIZARD */}
            {currentRoute === 'submit' && (
              <ComplaintWizard
                initialType={complaintType}
                preselectedDirectorate={preselectedDirectorate}
                onSuccess={handleComplaintCreated}
                onCancel={() => {
                  setCurrentRoute('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onTrackSubmittedComplaint={(id) => {
                  setActiveTrackId(id);
                  setCurrentRoute('track');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* ROUTE: COMPLAINT TRACKER */}
            {currentRoute === 'track' && (
              <ComplaintTracker
                complaints={complaints}
                initialSearchId={activeTrackId}
                onNavigateHome={() => {
                  setCurrentRoute('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onStartNewComplaint={() => handleStartComplaint('standard')}
              />
            )}

            {/* ROUTE: DIRECTORATES DIRECTORY */}
            {currentRoute === 'directorates' && (
              <DirectoratesDirectory
                onDirectComplaintToService={(dir) => handleStartComplaint('standard', dir)}
              />
            )}

            {/* ROUTE: FULL TRANSPARENCY DASHBOARD */}
            {currentRoute === 'transparency' && (
              <TransparencyDashboard complaints={complaints} />
            )}

            {/* ROUTE: HELP & FAQS */}
            {currentRoute === 'help' && <HelpSection />}

            {/* ROUTE: INSTITUTIONAL DIRECTORATE PORTAL */}
            {currentRoute === 'directorate-portal' && (
              <DirectoratePortal
                complaints={complaints}
                onUpdateComplaint={handleUpdateComplaint}
              />
            )}

            {/* ROUTE: GOVERNORATE ADMINISTRATION */}
            {currentRoute === 'governorate-admin' && (
              <GovernorateAdmin
                complaints={complaints}
                onOpenComplaintDetail={(id) => {
                  setActiveTrackId(id);
                  setCurrentRoute('track');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* ROUTE: CENTRAL PLATFORM ADMINISTRATION */}
            {currentRoute === 'central-admin' && <CentralAdmin />}

            {/* ROUTE: DESIGN SYSTEM & MOTION SPECS */}
            {currentRoute === 'design-system' && <DesignSystemShowcase />}
          </>
        )}
      </main>

      {/* Footer */}
      {!isAndroidView && (
        <Footer
          onNavigate={(route) => {
            setCurrentRoute(route);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPortal={(role) => {
            setActiveRole(role);
            if (role === 'directorate_admin') setCurrentRoute('directorate-portal');
            else if (role === 'governorate_admin') setCurrentRoute('governorate-admin');
            else if (role === 'central_admin') setCurrentRoute('central-admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Mobile Bottom Navigation (Visible on mobile screens) */}
      {!isAndroidView && (
        <MobileBottomNav
          currentRoute={currentRoute}
          onNavigate={(route) => {
            setCurrentRoute(route);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}
