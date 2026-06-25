import React, { useState } from 'react';
import { Order, SellerAnalytics } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Package, Users, DollarSign, CheckCircle, Clock, Truck, RefreshCw } from 'lucide-react';

interface SellerDashboardProps {
  analytics: SellerAnalytics;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onClose: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  analytics,
  orders,
  onUpdateOrderStatus,
  onClose
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-in w-full max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-[32px] p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 font-bold text-[11px] rounded uppercase tracking-wider">
              Seller Central India
            </span>
            <span className="text-xs text-slate-400">• ShopEZ Merchant Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
            Store Performance Overview
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
            Track daily revenue in Indian Rupees (₹), fulfill pending student/office orders, and analyze top selling workspace gear.
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full transition-all cursor-pointer shrink-0 shadow-md"
        >
          ← Back to Catalog
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Gross Sales</span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
              ₹{analytics.totalRevenue.toLocaleString('en-IN')}
            </h3>
            <span className="text-[10px] text-green-600 font-bold">↑ +14.2% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Orders Fulfilled</span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
              {orders.length + 138} Orders
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Across all India cities</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Order Value</span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
              ₹{analytics.avgOrderValue.toLocaleString('en-IN')}
            </h3>
            <span className="text-[10px] text-indigo-600 font-semibold">Healthy cart size</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer Satisfaction</span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
              {analytics.customerSatisfaction}%
            </h3>
            <span className="text-[10px] text-green-600 font-bold">★ 4.8 Store Average</span>
          </div>
        </div>
      </div>

      {/* Middle Layout: Charts & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Revenue Recharts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-slate-800 text-base">Weekly Revenue Trends (INR)</h2>
              <p className="text-xs text-slate-400">Daily sales breakdown across the last 7 days</p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600">
              ₹ Net Sales
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.revenueHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                  {analytics.revenueHistory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#4f46e5' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-slate-800 text-base mb-1">Sales by Category</h2>
            <p className="text-xs text-slate-400 mb-6">Top performing product segments</p>

            <div className="space-y-4">
              {analytics.categorySales.map((cat, idx) => {
                const total = analytics.categorySales.reduce((a, b) => a + b.value, 0);
                const pct = Math.round((cat.value / total) * 100);
                const colors = ['bg-indigo-600', 'bg-amber-500', 'bg-emerald-500'];
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{cat.name}</span>
                      <span className="font-mono">₹{cat.value.toLocaleString('en-IN')} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[idx % colors.length]}`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900">💡 Seller Tip</h4>
            <p className="text-[11px] text-indigo-700 mt-0.5 leading-relaxed">
              Workspace & Ergonomics accounts for 50%+ of your sales. Restock silent mouse units before college exams next week!
            </p>
          </div>
        </div>
      </div>

      {/* Order Management Queue Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="font-bold text-slate-800 text-base">Order Fulfillment Queue</h2>
            <p className="text-xs text-slate-400">Manage customer dispatch and update delivery tracking status</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === st ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Order ID</th>
                <th className="pb-3">Customer & City</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Total (INR)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 italic">
                    No orders match the selected filter status.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const statusColors: Record<string, string> = {
                    'Pending': 'bg-rose-50 text-rose-600 border-rose-200',
                    'Processing': 'bg-amber-50 text-amber-600 border-amber-200',
                    'Shipped': 'bg-indigo-50 text-indigo-600 border-indigo-200',
                    'Delivered': 'bg-green-50 text-green-600 border-green-200'
                  };

                  return (
                    <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pl-2 font-mono font-bold text-slate-800">{ord.id}</td>
                      <td className="py-3.5">
                        <div className="font-bold text-slate-800 truncate max-w-[180px]">{ord.customerName}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{ord.shippingAddress}</div>
                      </td>
                      <td className="py-3.5 text-slate-600">{ord.paymentMethod}</td>
                      <td className="py-3.5 font-mono font-bold text-indigo-600">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border inline-flex items-center gap-1 ${statusColors[ord.status] || 'bg-slate-100 text-slate-600'}`}>
                          {ord.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {ord.status === 'Processing' && <RefreshCw className="w-3 h-3 animate-spin" />}
                          {ord.status === 'Shipped' && <Truck className="w-3 h-3" />}
                          {ord.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                          <span>{ord.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <div className="flex justify-end gap-1">
                          {ord.status === 'Pending' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'Processing')}
                              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] rounded-lg cursor-pointer transition-transform active:scale-95"
                            >
                              Start Processing
                            </button>
                          )}
                          {ord.status === 'Processing' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'Shipped')}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded-lg cursor-pointer transition-transform active:scale-95"
                            >
                              Mark Shipped
                            </button>
                          )}
                          {ord.status === 'Shipped' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'Delivered')}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] rounded-lg cursor-pointer transition-transform active:scale-95"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {ord.status === 'Delivered' && (
                            <span className="text-[11px] text-slate-400 font-medium">Completed ✓</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
