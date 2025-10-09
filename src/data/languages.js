export const supportedLanguages = [
  { code: 'english', name: 'English', nativeName: 'English' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी' }
];

export const getLanguageByCode = (code) => {
  return supportedLanguages.find(lang => lang.code === code) || supportedLanguages[0];
};