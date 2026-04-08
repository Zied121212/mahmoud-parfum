import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/auth/login', {
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
        <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}><LanguageToggle /></div>
            <div style={{ background: '#151515', padding: '3rem', borderRadius: '8px', border: '1px solid #333', width: '100%', maxWidth: '400px' }}>
                <h2 className="serif" style={{ color: '#d4af37', textAlign: 'center', marginBottom: '2rem' }}>{t('Connexion')}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                    <button type="submit" className="btn-buy" style={{ width: '100%' }}>{t('Se connecter')}</button>
                </form>
                <p style={{ color: '#666', marginTop: '1.5rem', textAlign: 'center' }}>
                    {t('Nouveau ici ?')} <Link to="/register" style={{ color: '#d4af37', textDecoration: 'none' }}>{t('Créer un compte')}</Link>
                </p>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/" style={{ color: '#666', fontSize: '0.9rem' }}>{t("Retour à l'accueil")}</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;