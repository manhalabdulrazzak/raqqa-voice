import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Clock,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const HelpSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيف أقدم شكوى وما هي الخطوات المطلوبة؟',
      a: 'يمكنك تقديم الشكوى بالنقر على زر "تقديم شكوى"، ثم تحديد نوع الخدمة والحي في الرقة وشرح المشكلة. يمكنك إرفاق صورة توثيقية واختيار ما إذا كنت ترغب في تسجيل اسمك ورقمك لتلقي الرسائل أو تقديم بلاغ سري محجوب الهوية.',
    },
    {
      q: 'ماذا يحدث بعد إرسال الشكوى؟',
      a: 'يتم فوراً إنشاء رقم مرجعي رسمي (مثال: RQ-2026-000132) وتصل الشكوى إلى مكتب المتابعة في المديرية المعنية بالرقة. يقوم الفنيون بمعاينة البلاغ وإحالته لورشة الطوارئ المختصة ثم تحديث حالته الميدانية مع كل خطوة.',
    },
    {
      q: 'هل بياناتي الشخصية محمية؟',
      a: 'نعم بشكل قطعي. لا يطلع على رقم هاتفك سوى منسق الشكاوى في المديرية للتواصل عند الحاجة لمعرفة العنوان بدقة. لا يتم نشر أي اسم أو رقم هاتف في لوحة الشفافية العامة أو القضايا المحلولة.',
    },
    {
      q: 'كم يستغرق الرد على الشكوى ومعالجتها؟',
      a: 'تتراوح المدة بحسب نوع العطل؛ أعطال المياه والكهرباء الطارئة تُعالج عادة خلال 24 إلى 48 ساعة، بينما تتطلب مشاريع الصيانة الإسفلتية أو شبكات الصرف الصحي الرئيسية من 3 إلى 5 أيام عمل.',
    },
    {
      q: 'ما هو البلاغ السري ومتى يُستخدم؟',
      a: 'البلاغ السري مخصص للإبلاغ عن مخالفات التموين والأسعار، التعدي على الأملاك العامة، أو قضايا الفساد الإداري. في هذا المسار، يتم تشفير البلاغ تماماً دون أي طلب لرقم هاتف أو اسم، وتتابع النتيجة برقم الشكوى فقط.',
    },
    {
      q: 'هل المنصة تغطي محافظات أخرى غير الرقة حالياً؟',
      a: 'الإطلاق التجريبي الحالي يركز حصرياً على محافظة الرقة ومديرياتها لضمان كفاءة ورشات الصيانة. المنصة مصممة بمعمارية وطنية شاملة تتيح تفعيل باقي المحافظات السورية تباعاً فور استكمال التجهيزات الميدانية.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>مركز الدعم وإرشادات المواطن</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          المساعدة والأسئلة الشائعة
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          دليلك الشامل لمعرفة حقوقك كمواطن وكيفية متابعة صوتك حتى إتمام المعالجة
        </p>
      </div>

      {/* Citizen Rights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-slate-900">حق الحصول على رقم مرجعي</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            لكل مواطن الحق في الحصول على رقم مرجعي رسمي فور إرسال أي بلاغ، يوثق تاريخ وساعة الاستلام.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-slate-900">حماية السرية والخصوصية</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            بياناتك لا تُشارك مع أي جهة غير مختصة بالحل، ومتاح لك التبليغ بهوية مجهولة في قضايا الرقابة.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-slate-900">الرد المبرر والتوضيح</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            في حال تعذر الحل الفوري، تلتزم المديرية بتقديم إيضاح رسمي موثق بسبب التأخير وموعد المعالجة المتوقع.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-4 pb-3 border-b border-slate-100">
          الأسئلة الأكثر تداولاً
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-right bg-slate-50/50 hover:bg-slate-50 font-heading font-bold text-xs sm:text-sm text-slate-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 text-xs text-slate-600 bg-white border-t border-slate-150 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Help Desk Desk */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-white">
            تحتاج لمساعدة مباشرة في تسجيل شكواك؟
          </h3>
          <p className="text-xs text-teal-100 mt-1">
            فريق الدعم الفني بمحافظة الرقة متواجد للإجابة على استفسارات المواطنين ومساعدتهم
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold border border-white/20">
            هاتف الاستعلامات: 022-220011
          </div>
        </div>
      </div>
    </div>
  );
};
