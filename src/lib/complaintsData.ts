import { Complaint } from './types';

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'RQ-2026-000132',
    governorateId: 'raqqa',
    directorateId: 'raqqa-sanitation',
    category: 'النظافة وتدوير المخلفات',
    type: 'standard',
    title: 'تراكم مخلفات ونفايات صلبة قرب مدرسة المشلب الابتدائية',
    description: 'تجمعت كمية كبيرة من النفايات ومخلفات البناء قرب السور الغربي للمدرسة مما يعيق حركة الطلاب ويشكل مكرهة صحية.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'حي المشلب',
      street: 'شارع المدرسة القديمة',
      landmark: 'بجانب مدرسة المشلب للبنين',
    },
    citizenInfo: {
      name: 'عبد الله السالم',
      phone: '0944123890',
      isAnonymous: false,
    },
    status: 'resolved',
    priority: 'high',
    createdAt: '2026-06-10 09:15',
    updatedAt: '2026-06-12 14:30',
    timeline: [
      {
        id: 'tl-1',
        status: 'received',
        title: 'تم استلام الشكوى وتوليد الرقم المرجعي',
        description: 'تم تسجيل الشكوى آلياً وتصنيفها تحت قطاع النظافة العامة.',
        timestamp: '2026-06-10 09:15',
        actor: 'النظام الآلي لمنصة صوت الرقة',
      },
      {
        id: 'tl-2',
        status: 'under_review',
        title: 'التحقق والمطابقة الميدانية',
        description: 'قام مكتب الاستقبال في مديرية النظافة بمطابقة الموقع وتحديد القطاع المسؤول.',
        timestamp: '2026-06-10 11:20',
        actor: 'مكتب الشكاوى — مديرية النظافة العامة',
      },
      {
        id: 'tl-3',
        status: 'referred',
        title: 'إحالة إلى ورشة الطوارئ الشرقية',
        description: 'تم توجيه أمر مهمة لفريق الترحيل الميكانيكي مع جرافة وسيارة قلاب.',
        timestamp: '2026-06-11 08:30',
        actor: 'رئيس قسم العمليات الميدانية',
      },
      {
        id: 'tl-4',
        status: 'in_progress',
        title: 'بدء عمليات الترحيل والتنظيف',
        description: 'باشرت الورشة أعمال كنس وترحيل الأنقاض ورش مادة الكلس المعقمة.',
        timestamp: '2026-06-11 10:45',
        actor: 'مسؤول الورشة الميدانية — قطاع المشلب',
      },
      {
        id: 'tl-5',
        status: 'resolved',
        title: 'اكتمال العمل والتأكد من المعالجة',
        description: 'تم ترحيل كامل المخلفات (حمولة قلابين) وتنظيف الساحة بالكامل وتأمين مدخل المدرسة.',
        timestamp: '2026-06-12 14:30',
        actor: 'مديرية النظافة والبيئة — الرقة',
      },
    ],
    attachments: [
      {
        id: 'att-1',
        name: 'موقع_النفايات_المشلب.jpg',
        size: '1.4 MB',
        type: 'image',
      },
      {
        id: 'att-2',
        name: 'محضر_الإنجاز_الميداني.pdf',
        size: '420 KB',
        type: 'document',
      },
    ],
    publicResponse: {
      text: 'أخي المواطن الكريم: نبلغكم بانتهاء أعمال ترحيل النفايات بالكامل بالتعاون مع ورشة النظافة بالقطاع الشرقي، وتم تخصيص حاوية معدنية جديدة في الموقع لمنع تكرار التراكم. نشكر حرصكم وتعاونكم.',
      date: '2026-06-12 15:00',
      officer: 'م. فراس العبد الله — مدير النظافة العامة بالرقة',
    },
    internalNotes: [
      {
        id: 'in-1',
        author: 'المراقب الميداني يوسف',
        text: 'تم التنسيق مع إدارة المدرسة لتنبيه الأهالي بعدم رمي مخلفات الترميم في هذا الشارع.',
        date: '2026-06-11 12:00',
      },
    ],
  },
  {
    id: 'RQ-2026-000128',
    governorateId: 'raqqa',
    directorateId: 'raqqa-water',
    category: 'المياه والصرف الصحي',
    type: 'standard',
    title: 'انكسار خط إمداد مياه شرب في حي الرميلة',
    description: 'يوجد انكسار في أنبوب مياه فرعي قطر 4 إنش يؤدي لهدر كميات كبيرة وضعف وصول المياه إلى الأبنية المجاورة.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'حي الرميلة',
      street: 'شارع الساقية القديم',
      landmark: 'خلف خزان الرميلة العالي',
    },
    citizenInfo: {
      name: 'محمد نور الدين',
      phone: '0955678123',
      isAnonymous: false,
    },
    status: 'in_progress',
    priority: 'urgent',
    createdAt: '2026-06-11 16:20',
    updatedAt: '2026-06-12 10:15',
    timeline: [
      {
        id: 'tl-11',
        status: 'received',
        title: 'استلام البلاغ العاجل',
        description: 'تسجيل بلاغ تسريب مياه مصنف كأولوية عاجلة.',
        timestamp: '2026-06-11 16:20',
        actor: 'منصة صوت الرقة',
      },
      {
        id: 'tl-12',
        status: 'under_review',
        title: 'كشف فني أولي وتحديد مسار الخط',
        description: 'توجهت دورية طوارئ لمعاينة الكسر وإغلاق المحبس المغذي للشارع مؤقتاً.',
        timestamp: '2026-06-11 17:40',
        actor: 'طوارئ مؤسسة المياه بالرقة',
      },
      {
        id: 'tl-13',
        status: 'in_progress',
        title: 'أعمال الحفر واستبدال الوصلة المتضررة',
        description: 'الورشة باشرت أعمال الحفر اليدوي والميكانيكي لتجهيز ماسورة بولي إيثيلين بديلة.',
        timestamp: '2026-06-12 09:30',
        actor: 'فريق الصيانة المركزية لمياه الرقة',
      },
    ],
    attachments: [
      {
        id: 'att-3',
        name: 'تسريب_مياه_الرميلة.jpg',
        size: '2.1 MB',
        type: 'image',
      },
    ],
    publicResponse: {
      text: 'تم عزل الخط المتضرر لمنع الهدر، وورشة الصيانة متواجدة حالياً في الموقع لاستبدال القسطل التالف. سيتم إعادة ضخ المياه فور انتهاء أعمال اللحام والاختبار الهيدروليكي قبل ظهر اليوم.',
      date: '2026-06-12 10:00',
      officer: 'مكتب الإعلام المائي — مياه الرقة',
    },
    internalNotes: [
      {
        id: 'in-2',
        author: 'رئيس قسم الشبكات',
        text: 'الخط قديم من الإسمنت ويحتاج إدراجه ضمن خطة الاستبدال للربع القادم.',
        date: '2026-06-11 18:00',
      },
    ],
  },
  {
    id: 'RQ-2026-000119',
    governorateId: 'raqqa',
    directorateId: 'raqqa-health',
    category: 'الصحة والخدمات الطبية',
    type: 'standard',
    title: 'طلب توفير أدوية الأمراض المزمنة في مركز الفردوس الصحي',
    description: 'الأدوية الخافضة للضغط والسكري غير متوفرة منذ بداية الشهر في صيدلية المركز الصحي بالحي.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'حي الفردوس',
      street: 'شارع المركز الصحي',
    },
    citizenInfo: {
      name: 'فاطمة المحمود',
      phone: '0933456789',
      isAnonymous: false,
    },
    status: 'resolved',
    priority: 'high',
    createdAt: '2026-06-08 10:00',
    updatedAt: '2026-06-10 16:45',
    timeline: [
      {
        id: 'tl-21',
        status: 'received',
        title: 'استلام الشكوى الصحية',
        description: 'تسجيل الشكوى وإحالتها لدائرة الرعاية الأولية.',
        timestamp: '2026-06-08 10:00',
        actor: 'منصة صوت الرقة',
      },
      {
        id: 'tl-22',
        status: 'in_progress',
        title: 'صرف حصة دوائية إضافية من المستودع المركزي',
        description: 'تم تدقيق جداول المستفيدين وتجهيز شحنة الأدوية المطلوبة.',
        timestamp: '2026-06-09 11:30',
        actor: 'مديرية صحة الرقة — دائرة الصيدلة',
      },
      {
        id: 'tl-23',
        status: 'resolved',
        title: 'استلام الأدوية وبدء التوزيع',
        description: 'وصلت شحنة الأدوية المزمنة للمركز وبدأ تسليمها للمراجعين والمسجلين.',
        timestamp: '2026-06-10 16:45',
        actor: 'إدارة مركز الفردوس الصحي',
      },
    ],
    attachments: [],
    publicResponse: {
      text: 'تمت تغذية صيدلية مركز الفردوس الصحي بجميع أدوية السكري والضغط وجلسات الإنسولين، ويمكن للمواطنين الكرام مراجعة المركز خلال أوقات الدوام الرسمي لاستلام مخصصاتهم الشهرية.',
      date: '2026-06-10 17:00',
      officer: 'د. وسيم الحامد — مدير صحة الرقة',
    },
  },
  {
    id: 'RQ-2026-000111',
    governorateId: 'raqqa',
    directorateId: 'raqqa-electricity',
    category: 'الكهرباء والإنارة',
    type: 'standard',
    title: 'احتراق قاطع المحولة الكهربائية في حي الدرعية',
    description: 'انقطاع التيار عن أكثر من 60 منزلاً بسبب ماس كهربائي في لوحة التوزيع الهوائية إثر حمولة زائدة.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'حي الدرعية',
      street: 'شارع النور',
      landmark: 'قرب جامع الإيمان',
    },
    citizenInfo: {
      name: 'محمود العلي',
      phone: '0999123456',
      isAnonymous: false,
    },
    status: 'resolved',
    priority: 'urgent',
    createdAt: '2026-06-09 13:10',
    updatedAt: '2026-06-09 19:30',
    timeline: [
      {
        id: 'tl-31',
        status: 'received',
        title: 'استلام بلاغ طوارئ كهرباء',
        description: 'تم تسجيل العطل وإرسال إشعار فوري لوردية الطوارئ الغربية.',
        timestamp: '2026-06-09 13:10',
        actor: 'منصة صوت الرقة',
      },
      {
        id: 'tl-32',
        status: 'in_progress',
        title: 'تركيب قاطع آلي جديد وإصلاح الكابلات المحترقة',
        description: 'تم استبدال القاطع سعة 400 أمبير وإعادة موازنة الأحمال على الفازات الثلاثة.',
        timestamp: '2026-06-09 16:00',
        actor: 'ورشة طوارئ كهرباء الرقة',
      },
      {
        id: 'tl-33',
        status: 'resolved',
        title: 'إعادة التيار والتأكد من استقرار الجهد',
        description: 'تم إطلاق التيار بنجاح وقياس الفولتية عند المشتركين وكانت ضمن الحدود النظامية.',
        timestamp: '2026-06-09 19:30',
        actor: 'مديرية الكهرباء والطاقة بالرقة',
      },
    ],
    attachments: [],
    publicResponse: {
      text: 'تم استبدال القاطع المحترق وتأهيل التوصيلات وتغذية الحي بالكهرباء بصورة طبيعية، مع توجيه المواطنين لترشيد الاستهلاك لتفادي فصل الحمايات مجدداً.',
      date: '2026-06-09 20:00',
      officer: 'م. كمال المصطفى — مدير كهرباء الرقة',
    },
  },
  {
    id: 'RQ-2026-000104',
    governorateId: 'raqqa',
    directorateId: 'raqqa-municipality',
    category: 'البلدية والطرق والأشغال',
    type: 'standard',
    title: 'وجود حفرة عميقة وهبوط إسفلتي في طريق المعمل',
    description: 'هبوط خطير في منتصف الطريق تسبب في أضرار لعدة سيارات ويعيق حركة المرور والشاحنات.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'منطقة المعمل',
      street: 'طريق المعمل الرئيسي',
      landmark: 'أمام مدخل معمل الغزل سابقاً',
    },
    citizenInfo: {
      name: 'ياسين الجاسم',
      phone: '0988765432',
      isAnonymous: false,
    },
    status: 'resolved',
    priority: 'medium',
    createdAt: '2026-06-06 14:00',
    updatedAt: '2026-06-08 17:15',
    timeline: [
      {
        id: 'tl-41',
        status: 'received',
        title: 'استلام شكوى الطرق',
        description: 'تسجيل الشكوى وإحالتها للدائرة الفنية ومكتب الأشغال في بلدية الرقة.',
        timestamp: '2026-06-06 14:00',
        actor: 'منصة صوت الرقة',
      },
      {
        id: 'tl-42',
        status: 'in_progress',
        title: 'أعمال الدك والردم والفرش الحصوي',
        description: 'تم دك طبقات التأسيس وصب مادة البقايا تمهيداً لمد القميص الإسفلتي الساخن.',
        timestamp: '2026-06-07 10:00',
        actor: 'دائرة الطرق — بلدية الرقة',
      },
      {
        id: 'tl-43',
        status: 'resolved',
        title: 'تعبيد الهبوط وإعادة فتح الطريق',
        description: 'تم مد خلطة إسفلتية ساخنة ودحلها وتسوية منسوب الشارع بالكامل.',
        timestamp: '2026-06-08 17:15',
        actor: 'مجلس مدينة الرقة',
      },
    ],
    attachments: [],
    publicResponse: {
      text: 'تمت معالجة الهبوط الإسفلتي ورصف الحفرة بموجب خطة صيانة وتزفيت الشوارع الحيوية بالمدينة.',
      date: '2026-06-08 18:00',
      officer: 'أ. عبد السلام العلي — رئيس مجلس مدينة الرقة',
    },
  },
  {
    id: 'RQ-2026-000140',
    governorateId: 'raqqa',
    directorateId: 'raqqa-water',
    category: 'المياه والصرف الصحي',
    type: 'standard',
    title: 'انسداد مجرى صرف صحي وفيضان مياه قرب جامع الشراكة',
    description: 'انسداد في ريكار الصرف الصحي الرئيسي في الزقاق الخلفي مما أدى لفيضان المياه وتجمع روائح كريهة.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'حي الثكنة',
      street: 'شارع الشراكة',
      landmark: 'قرب جامع الشراكة',
    },
    citizenInfo: {
      name: 'حسان الطه',
      phone: '0944888222',
      isAnonymous: false,
    },
    status: 'under_review',
    priority: 'high',
    createdAt: '2026-06-12 11:00',
    updatedAt: '2026-06-12 12:45',
    timeline: [
      {
        id: 'tl-51',
        status: 'received',
        title: 'تم تسجيل الشكوى',
        description: 'الشكوى بانتظار جدولة سيارة التسليك الفاكيوم.',
        timestamp: '2026-06-12 11:00',
        actor: 'منصة صوت الرقة',
      },
      {
        id: 'tl-52',
        status: 'under_review',
        title: 'مراجعة البلاغ وتحديد خط السير',
        description: 'تم إدراج الموقع ضمن خط سير الصهريج النافث رقم 3 للمساء.',
        timestamp: '2026-06-12 12:45',
        actor: 'مكتب طوارئ الصرف الصحي',
      },
    ],
    attachments: [],
  },
  {
    id: 'RQ-2026-000141',
    governorateId: 'raqqa',
    directorateId: 'raqqa-supply',
    category: 'التموين وحماية المستهلك',
    type: 'confidential',
    title: 'بلاغ سري: بيع دقيق تمويني مدعوم في السوق السوداء',
    description: 'معلومات تفيد بقيام أحد المخابز الخاصة بتهريب أكياس الدقيق المدعوم ليلاً لبيعها لأفران المعجنات غير المرخصة.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'شارع تل أبيض',
      landmark: 'السوق المركزي',
    },
    citizenInfo: {
      isAnonymous: true,
    },
    status: 'received',
    priority: 'urgent',
    createdAt: '2026-06-12 13:00',
    updatedAt: '2026-06-12 13:00',
    timeline: [
      {
        id: 'tl-61',
        status: 'received',
        title: 'استلام البلاغ السري وتشفير البيانات',
        description: 'تم تسجيل البلاغ السري وتوجيهه مباشرة لمدير التموين دون أي بيانات شخصية.',
        timestamp: '2026-06-12 13:00',
        actor: 'بوابة البلاغات السرية — صوت الرقة',
      },
    ],
    attachments: [],
  },
  {
    id: 'RQ-2026-000142',
    governorateId: 'raqqa',
    directorateId: 'raqqa-transport',
    category: 'النقل والخطوط والمواصلات',
    type: 'suggestion',
    title: 'اقتراح خدمة: تمديد خط سرافيس الجزرة ليصل إلى مشفى الأطفال',
    description: 'نقترح تعديل مسار خط سير سرافيس الجزرة ليشمل المرور بشارع المشفى الجديد نظراً لمعاناة الأمهات وكبار السن.',
    location: {
      governorate: 'محافظة الرقة',
      city: 'الرقة',
      district: 'طريق الجزرة',
      landmark: 'مشفى الأطفال الجديد',
    },
    citizenInfo: {
      name: 'هيثم القاسم',
      phone: '0933777111',
      isAnonymous: false,
    },
    status: 'under_review',
    priority: 'medium',
    createdAt: '2026-06-11 18:00',
    updatedAt: '2026-06-12 09:00',
    timeline: [
      {
        id: 'tl-71',
        status: 'received',
        title: 'استلام المقترح الخدمي',
        description: 'تم تسجيل المقترح ضمن مبادرات تطوير النقل العام.',
        timestamp: '2026-06-11 18:00',
        actor: 'منصة صوت الرقة',
      },
      {
        id: 'tl-72',
        status: 'under_review',
        title: 'دراسة المقترح مع لجنة نقل الركاب المشتركة',
        description: 'المقترح قيد التدقيق المروري لمعرفة الجدوى والمسافات الإضافية.',
        timestamp: '2026-06-12 09:00',
        actor: 'مديرية النقل بالرقة',
      },
    ],
    attachments: [],
  },
  // Sample Aleppo complaint: MUST NOT BE VISIBLE to Raqqa directorate users!
  {
    id: 'ALP-2026-000001',
    governorateId: 'aleppo',
    directorateId: 'aleppo-health',
    category: 'الصحة والخدمات الطبية',
    type: 'standard',
    title: 'شكوى صحة في حلب — نموذج عزل البيانات الوطني',
    description: 'شكوى خاصة بمحافظة حلب لا تظهر إطلاقاً لموظفي صحة الرقة بموجب معمارية عزل البيانات.',
    location: {
      governorate: 'محافظة حلب',
      city: 'حلب',
      district: 'حي السليمانية',
    },
    status: 'received',
    priority: 'low',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-01',
    timeline: [],
    attachments: [],
  },
];

const LOCAL_STORAGE_KEY = 'raqqa_voice_complaints_v1';

export function getStoredComplaints(): Complaint[] {
  if (typeof window === 'undefined') return INITIAL_COMPLAINTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
      return INITIAL_COMPLAINTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading complaints from localStorage', err);
    return INITIAL_COMPLAINTS;
  }
}

export function saveComplaint(newComplaint: Complaint): Complaint[] {
  const current = getStoredComplaints();
  const updated = [newComplaint, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving complaint to localStorage', err);
    }
  }
  return updated;
}

export function updateComplaintStatusInStorage(
  id: string,
  updates: Partial<Complaint>,
  newEvent?: { status: Complaint['status']; title: string; description: string; actor: string }
): Complaint[] {
  const current = getStoredComplaints();
  const updated = current.map((c) => {
    if (c.id !== id) return c;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updatedTimeline = newEvent
      ? [
          ...c.timeline,
          {
            id: 'tl-' + Date.now(),
            status: newEvent.status,
            title: newEvent.title,
            description: newEvent.description,
            timestamp: now,
            actor: newEvent.actor,
          },
        ]
      : c.timeline;

    return {
      ...c,
      ...updates,
      updatedAt: now,
      timeline: updatedTimeline,
    };
  });

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error updating complaint in localStorage', err);
    }
  }
  return updated;
}
