import { useTranslation } from 'react-i18next';

function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center min-w-[38px] px-2 py-1 bg-transparent border border-gold/40 text-gold text-[11px] font-bold rounded-sm tracking-widest hover:bg-gold hover:text-black transition-all active:scale-95 uppercase"
      title={i18n.language === 'fr' ? 'تغيير إلى العربية' : 'Passer au Français'}
    >
      {i18n.language === 'fr' ? 'AR' : 'FR'}
    </button>
  );
}

export default LanguageToggle;
