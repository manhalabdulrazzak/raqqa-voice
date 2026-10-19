import { Governorate, GovernorateId } from './types';

export const ALL_GOVERNORATES: Governorate[] = [
  {
    id: 'raqqa',
    nameAr: 'محافظة الرقة',
    nameEn: 'Raqqa',
    status: 'active',
    center: 'مدينة الرقة',
    populationEstimate: '950,000 نسمة',
    activeDirectoratesCount: 10,
    launchDate: '2026-01-01',
  },
  {
    id: 'aleppo',
    nameAr: 'محافظة حلب',
    nameEn: 'Aleppo',
    status: 'configured',
    center: 'مدينة حلب',
    populationEstimate: '3,800,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'damascus',
    nameAr: 'محافظة دمشق',
    nameEn: 'Damascus',
    status: 'configured',
    center: 'دمشق العاصمة',
    populationEstimate: '2,500,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'rural_damascus',
    nameAr: 'محافظة ريف دمشق',
    nameEn: 'Rural Damascus',
    status: 'pending',
    center: 'دوما',
    populationEstimate: '2,800,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'homs',
    nameAr: 'محافظة حمص',
    nameEn: 'Homs',
    status: 'configured',
    center: 'مدينة حمص',
    populationEstimate: '1,700,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'hama',
    nameAr: 'محافظة حماة',
    nameEn: 'Hama',
    status: 'pending',
    center: 'مدينة حماة',
    populationEstimate: '1,500,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'latakia',
    nameAr: 'محافظة اللاذقية',
    nameEn: 'Latakia',
    status: 'pending',
    center: 'مدينة اللاذقية',
    populationEstimate: '1,200,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'tartus',
    nameAr: 'محافظة طرطوس',
    nameEn: 'Tartus',
    status: 'pending',
    center: 'مدينة طرطوس',
    populationEstimate: '900,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'deir_ez_zor',
    nameAr: 'محافظة دير الزور',
    nameEn: 'Deir ez-Zor',
    status: 'pending',
    center: 'دير الزور',
    populationEstimate: '1,100,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'hasakah',
    nameAr: 'محافظة الحسكة',
    nameEn: 'Hasakah',
    status: 'pending',
    center: 'الحسكة',
    populationEstimate: '1,300,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'idlib',
    nameAr: 'محافظة إدلب',
    nameEn: 'Idlib',
    status: 'pending',
    center: 'مدينة إدلب',
    populationEstimate: '1,600,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'daraa',
    nameAr: 'محافظة درعا',
    nameEn: 'Daraa',
    status: 'pending',
    center: 'مدينة درعا',
    populationEstimate: '1,000,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'sweida',
    nameAr: 'محافظة السويداء',
    nameEn: 'Sweida',
    status: 'pending',
    center: 'السويداء',
    populationEstimate: '450,000 نسمة',
    activeDirectoratesCount: 0,
  },
  {
    id: 'quneitra',
    nameAr: 'محافظة القنيطرة',
    nameEn: 'Quneitra',
    status: 'pending',
    center: 'مدينة البعث',
    populationEstimate: '110,000 نسمة',
    activeDirectoratesCount: 0,
  },
];

export const ACTIVE_GOVERNORATE_ID: GovernorateId = 'raqqa';

export function getActiveGovernorate(): Governorate {
  return ALL_GOVERNORATES.find((g) => g.id === ACTIVE_GOVERNORATE_ID) || ALL_GOVERNORATES[0];
}

export function getGovernorateById(id: GovernorateId): Governorate | undefined {
  return ALL_GOVERNORATES.find((g) => g.id === id);
}
