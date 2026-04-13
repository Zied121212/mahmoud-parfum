import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import { FaUserPlus, FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { API_BASE_URL } from '../apiConfig';

function Register() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert(t("Les mots de passe ne correspondent pas !"));
            return;
        }

        const payload = {
            fullName: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        };

        fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(async res => {
                const data = await res.json();
                if (res.ok) {
                    alert(t('Compte créé ! Vous pouvez maintenant vous connecter.'));
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            })
            .catch(() => alert(t('Erreur serveur.')));
    };

    const InputField = ({ label, name, type = "text", value, onChange, icon: Icon, required = true }) => (
      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-widest text-muted-text pl-1">{label}</label>
        <div className="relative">
          <input 
            type={type} 
            required={required} 
            className="w-full bg-black/40 border border-dark-border text-light-text p-3 rounded-lg focus:border-gold outline-none transition-all pl-10 text-sm" 
            value={value}
            onChange={onChange}
          />
          {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-text/60" size={14} />}
        </div>
      </div>
    );

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
            </div>

            <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
                <Link to="/" className="text-[10px] uppercase tracking-widest text-muted-text hover:text-gold transition-colors">{t('Accueil')}</Link>
                <LanguageToggle />
            </div>

            <div className="w-full max-w-lg bg-dark-card border border-dark-border p-8 md:p-12 rounded-2xl shadow-2xl relative z-10 animate-fade-up">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-4 border border-gold/20">
                        <FaUserPlus size={32} />
                    </div>
                    <h2 className="font-serif text-3xl text-gold uppercase tracking-tighter">{t('Inscription')}</h2>
                    <p className="text-[10px] text-muted-text uppercase tracking-widest mt-2">{t('Rejoignez le prestige Mahmoud Parfum')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField 
                          label={t('Prénom')} 
                          icon={FaUser}
                          value={formData.firstName}
                          onChange={e => setFormData({ ...formData, firstName: e.target.value })} 
                        />
                        <InputField 
                          label={t('Nom')} 
                          icon={FaUser}
                          value={formData.lastName}
                          onChange={e => setFormData({ ...formData, lastName: e.target.value })} 
                        />
                    </div>

                    <InputField 
                      label={t('Adresse Email')} 
                      type="email"
                      icon={FaEnvelope}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    />

                    <InputField 
                      label={t('Numéro de téléphone')} 
                      type="tel"
                      icon={FaPhone}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField 
                          label={t('Mot de Passe')} 
                          type="password"
                          icon={FaLock}
                          value={formData.password}
                          onChange={e => setFormData({ ...formData, password: e.target.value })} 
                        />
                        <InputField 
                          label={t('Confirmer')} 
                          type="password"
                          icon={FaLock}
                          value={formData.confirmPassword}
                          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                        />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-gold text-black py-4 rounded-lg font-bold uppercase tracking-[2px] transition-all hover:bg-[#b5952f] hover:translate-y-[-2px] active:translate-y-0 shadow-lg mt-4"
                    >
                      {t("S'inscrire")}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <p className="text-center text-[13px] text-muted-text">
                    {t('Déjà client ?')} <Link to="/login" className="text-gold font-bold hover:underline transition-all ml-1">{t('Se connecter')}</Link>
                  </p>
                  <div className="text-center">
                    <Link to="/" className="text-[10px] uppercase tracking-widest text-muted-text hover:text-gold transition-colors">{t("Retour à l'accueil")}</Link>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Register;