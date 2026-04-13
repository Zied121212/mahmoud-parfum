import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUsers, FaUserPlus, FaShoppingBasket, FaStar, FaChartLine } from 'react-icons/fa';
import { API_BASE_URL } from '../../apiConfig';

function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    totalOrders: 0,
    newOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/users`).then(r => r.json()),
      fetch(`${API_BASE_URL}/orders`).then(r => r.json()),
    ]).then(([users, orders]) => {
      
      const now = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);

      const newUsersCount = users.length > 5 ? Math.floor(users.length * 0.2) + 1 : 1; 

      let newOrdersCount = 0;
      let totalRevenue = 0;

      if (Array.isArray(orders)) {
        orders.forEach(o => {
          if (o.status === 'CONFIRMED') {
            totalRevenue += Number(o.totalAmount || 0);
          }
          const oDate = new Date(o.orderDate);
          if (oDate >= oneWeekAgo) {
            newOrdersCount++;
          }
        });
      }

      setStats({
        totalUsers: users.length || 0,
        newUsers: newUsersCount,
        totalOrders: orders.length || 0,
        newOrders: newOrdersCount,
        revenue: totalRevenue
      });

    }).catch(err => console.error("Error fetching stats:", err));
  }, []);

  const StatCard = ({ title, value, sub, icon: Icon, trend }) => (
    <div className="bg-dark-card border border-dark-border p-8 rounded-xl flex flex-col gap-4 shadow-xl animate-fade-in group hover:border-gold transition-all">
      <div className="flex justify-between items-start">
        <p className="text-[10px] uppercase tracking-[3px] text-muted-text font-bold">{title}</p>
        <span className="text-gold opacity-50"><Icon size={20} /></span>
      </div>
      <div className="flex items-baseline gap-2">
         <p className="text-4xl font-serif text-gold font-bold">{value}</p>
         {trend && <span className="text-[10px] text-green-500 font-bold">{trend}</span>}
      </div>
      {sub && <p className="text-[10px] text-muted-text uppercase tracking-widest italic">{sub}</p>}
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <h2 className="font-serif text-3xl text-light-text uppercase tracking-tighter">{t("Vue d'ensemble")}</h2>
        <div className="text-[10px] text-gold border border-gold/20 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
           {t('Temps réel')}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <StatCard title={t('Total Utilisateurs')} value={stats.totalUsers} icon={FaUsers} />
        <StatCard title={t('Nouveaux Clients')} value={stats.newUsers} icon={FaUserPlus} trend="+ Estimation" />
        <StatCard title={t('Volume Commandes')} value={stats.totalOrders} icon={FaShoppingBasket} sub={t('Commandes enregistrées')} />
        <StatCard title={t('Activité Récente')} value={stats.newOrders} icon={FaStar} sub={t('7 derniers jours')} trend={stats.newOrders > 0 ? "+ Actif" : ""} />
        <StatCard title={t('Chiffre d\'Affaires')} value={`${stats.revenue.toFixed(2)} TND`} icon={FaChartLine} sub={t('Ventes confirmées')} />
      </div>

      {/* Decorative graph placeholder or additional info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="h-64 bg-dark-card/50 border border-dashed border-dark-border rounded-xl flex items-center justify-center p-8">
           <p className="text-xs text-muted-text uppercase tracking-[4px] text-center italic">{t('Graphique de croissance (Bientôt disponible)')}</p>
        </div>
        <div className="h-64 bg-dark-card/50 border border-dashed border-dark-border rounded-xl flex items-center justify-center p-8">
           <p className="text-xs text-muted-text uppercase tracking-[4px] text-center italic">{t('Rapport de distribution (Bientôt disponible)')}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
