import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import { FaUserLock, FaEnvelope, FaLock } from 'react-icons/fa';
import { API_BASE_URL } from '../apiConfig';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async res => {
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('user', JSON.stringify(data));
                    alert(t('Connexion réussie !'));
                    navigate('/');
                } else {
                    alert(data.message);
                }
            })
            .catch(() => alert(t('Erreur serveur.')));
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
            </div>

            <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
                <Link to="/" className="text-[10px] uppercase tracking-widest text-muted-text hover:text-gold transition-colors">{t('Accueil')}</Link>
                <LanguageToggle />
            </div>

            <div className="w-full max-w-md bg-dark-card border border-dark-border p-8 md:p-12 rounded-2xl shadow-2xl relative z-10 animate-fade-up">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-4 border border-gold/20">
                        <FaUserLock size={32} />
                    </div>
                    <h2 className="font-serif text-3xl text-gold uppercase tracking-tighter">{t('Connexion')}</h2>
                    <p className="text-xs text-muted-text uppercase tracking-widest mt-2">{t('Bienvenue dans l\'univers Mahmoud')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-text pl-1">{t('Adresse Email')}</label>
                        <div className="relative">
                            <input 
                              type="email" 
                              required 
                              className="w-full bg-black/40 border border-dark-border text-light-text p-4 rounded-lg focus:border-gold outline-none transition-all pl-12 text-sm" 
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })} 
                            />
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={16} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-text pl-1">{t('Mot de Passe')}</label>
                        <div className="relative">
                            <input 
                              type="password" 
                              required 
                              className="w-full bg-black/40 border border-dark-border text-light-text p-4 rounded-lg focus:border-gold outline-none transition-all pl-12 text-sm" 
                              value={formData.password}
                              onChange={e => setFormData({ ...formData, password: e.target.value })} 
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={16} />
                        </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-gold text-black py-4 rounded-lg font-bold uppercase tracking-[2px] transition-all hover:bg-[#b5952f] hover:translate-y-[-2px] active:translate-y-0 shadow-lg"
                    >
                      {t('Se connecter')}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <p className="text-center text-[13px] text-muted-text">
                    {t('Nouveau ici ?')} <Link to="/register" className="text-gold font-bold hover:underline transition-all ml-1">{t('Créer un compte')}</Link>
                  </p>
                  <div className="text-center">
                    <Link to="/" className="text-[10px] uppercase tracking-widest text-muted-text hover:text-gold transition-colors">{t("Retour à l'accueil")}</Link>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Login;