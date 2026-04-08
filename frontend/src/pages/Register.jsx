import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

function Register() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
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
            password: formData.password
        };

        fetch('http://localhost:5000/api/auth/register', {
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

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}><LanguageToggle /></div>
            <div style={{ background: '#151515', padding: '3rem', borderRadius: '8px', border: '1px solid #333', width: '100%', maxWidth: '400px' }}>
                <h2 className="serif" style={{ color: '#d4af37', textAlign: 'center', marginBottom: '2rem' }}>{t('Inscription')}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: '#aaa', display: 'block', marginBottom: '0.5rem' }}>{t('Prénom')}</label>
                            <input type="text" required className="admin-input" value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: '#aaa', display: 'block', marginBottom: '0.5rem' }}>{t('Nom')}</label>
                            <input type="text" required className="admin-input" value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label style={{ color: '#aaa', display: 'block', marginBottom: '0.5rem' }}>{t('Adresse Email')}</label>
                        <input type="email" required className="admin-input" value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ color: '#aaa', display: 'block', marginBottom: '0.5rem' }}>{t('Mot de Passe')}</label>
                        <input type="password" required className="admin-input" value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ color: '#aaa', display: 'block', marginBottom: '0.5rem' }}>{t('Confirmer le mot de passe')}</label>
                        <input type="password" required className="admin-input" value={formData.confirmPassword}
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
                    </div>
                    <button type="submit" className="btn-buy" style={{ width: '100%' }}>{t("S'inscrire")}</button>
                </form>
                <p style={{ color: '#666', marginTop: '1.5rem', textAlign: 'center' }}>
                    {t('Déjà client ?')} <Link to="/login" style={{ color: '#d4af37', textDecoration: 'none' }}>{t('Se connecter')}</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;