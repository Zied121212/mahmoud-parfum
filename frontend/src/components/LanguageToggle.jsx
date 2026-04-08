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
      style={{
        background: 'transparent',
        border: '1px solid #d4af37',
        color: '#d4af37',
        padding: '0.3rem 0.6rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.9rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        fontWeight: 'bold'
      }}
      title="Changer de langue / تغيير اللغة"
    >
      {i18n.language === 'fr' ? 'AR' : 'FR'}
    </button>
  );
}

export default LanguageToggle;
