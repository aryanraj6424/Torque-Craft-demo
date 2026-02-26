import { useState } from 'react';
import { LayoutDashboard, Users, ShieldCheck, Activity, Settings, Search, MoreVertical, CheckCircle2, XCircle, AlertCircle, TrendingUp, Globe, Database, Download, Package, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import products from '../data/products.json';

const SuperAdminUI = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isSuperAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated || !isSuperAdmin) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex flex-col items-center justify-center px-6">
        <div className="metallic-card p-12 text-center max-w-md border-glow-red">
          <ShieldCheck size={48} className="mx-auto text-brand-red mb-6" />
          <h2 className="text-2xl font-display font-black italic uppercase mb-4">Super Admin Access Required</h2>
          <p className="text-white/50 mb-8">This area is restricted to Torque Craft corporate administrators only.</p>
          <Link to="/login" className="btn-primary inline-flex items-center gap-2">
            Corporate Login
          </Link>
        </div>
      </div>
    );
  }

  const dealers = [
    { id: 1, name: 'Midwest Diesel Performance', location: 'Chicago, IL', status: 'Active', sales: '$420,000', lastActive: '2 mins ago' },
    { id: 2, name: 'Lone Star Engines', location: 'Dallas, TX', status: 'Active', sales: '$285,000', lastActive: '1 hour ago' },
    { id: 3, name: 'Pacific Northwest Turbos', location: 'Seattle, WA', status: 'Pending', sales: '$0', lastActive: '1 day ago' },
    { id: 4, name: 'Sunshine State Customs', location: 'Miami, FL', status: 'Suspended', sales: '$120,000', lastActive: '5 days ago' },
  ];

  const activities = [
    { id: 1, dealer: 'Midwest Diesel', action: 'Generated 500 QR Codes', time: '10 mins ago', icon: Database, color: 'text-brand-blue' },
    { id: 2, dealer: 'Lone Star Engines', action: 'Activated 12 Warranties', time: '25 mins ago', icon: ShieldCheck, color: 'text-brand-red' },
    { id: 3, dealer: 'System', action: 'New Dealer Application: Rocky Mountain Parts', time: '1 hour ago', icon: Users, color: 'text-white' },
    { id: 4, dealer: 'Sunshine State', action: 'Payment Failed: Monthly Subscription', time: '3 hours ago', icon: AlertCircle, color: 'text-brand-red' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="metallic-card p-6 sticky top-32 border-brand-blue/20">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center font-bold text-navy-deep">HQ</div>
                <div>
                  <p className="text-sm font-bold">Super Admin</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Global Oversight</p>
                </div>
              </div>
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'catalog', label: 'Global Catalog', icon: Package },
                  { id: 'dealers', label: 'Dealer Network', icon: Users },
                  { id: 'activity', label: 'Global Activity', icon: Activity },
                  { id: 'security', label: 'Security Logs', icon: ShieldCheck },
                  { id: 'refunds', label: 'Refund Control', icon: AlertCircle },
                  { id: 'qr-gen', label: 'QR Generation', icon: Database },
                  { id: 'settings', label: 'HQ Settings', icon: Settings },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-brand-blue text-navy-deep glow-blue' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                  >
                    <item.icon size={18} /> {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="metallic-card p-8 border-glow-blue">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="text-brand-blue" size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Global Revenue</span>
                    </div>
                    <p className="text-4xl font-display font-black italic">$2,482,900</p>
                    <p className="text-xs text-brand-blue mt-2">+12.5% from last month</p>
                  </div>
                  <div className="metallic-card p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Globe className="text-brand-red" size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Active Dealers</span>
                    </div>
                    <p className="text-4xl font-display font-black italic">156</p>
                    <p className="text-xs text-white/40 mt-2">Across 42 States</p>
                  </div>
                  <div className="metallic-card p-8">
                    <div className="flex items-center justify-between mb-4">
                      <ShieldCheck className="text-brand-blue" size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Warranties Issued</span>
                    </div>
                    <p className="text-4xl font-display font-black italic">12,402</p>
                    <p className="text-xs text-white/40 mt-2">99.8% Authenticity Rate</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="metallic-card p-8">
                    <h3 className="text-lg font-display font-bold italic uppercase mb-6 flex items-center gap-2">
                      <Activity size={20} className="text-brand-blue" /> Live Activity Feed
                    </h3>
                    <div className="space-y-6">
                      {activities.map(act => (
                        <div key={act.id} className="flex gap-4 items-start">
                          <div className={`p-2 rounded-lg bg-white/5 ${act.color}`}>
                            <act.icon size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{act.dealer}</p>
                            <p className="text-xs text-white/50">{act.action}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{act.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="metallic-card p-8">
                    <h3 className="text-lg font-display font-bold italic uppercase mb-6 flex items-center gap-2">
                      <Users size={20} className="text-brand-red" /> Top Performing Dealers
                    </h3>
                    <div className="space-y-4">
                      {dealers.slice(0, 3).map(dealer => (
                        <div key={dealer.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                          <div>
                            <p className="text-sm font-bold">{dealer.name}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{dealer.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-display font-bold text-brand-blue">{dealer.sales}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest">MTD Sales</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'catalog' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Global Product Catalog</h2>
                  <div className="flex gap-4">
                    <button className="btn-secondary py-2 px-6 text-xs flex items-center gap-2">
                      <Download size={16} /> Export Master List
                    </button>
                    <button className="btn-primary py-2 px-6 text-xs flex items-center gap-2">
                      <Plus size={16} /> Add New SKU
                    </button>
                  </div>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">SKU</th>
                        <th className="px-8 py-4">Name</th>
                        <th className="px-8 py-4">MSRP</th>
                        <th className="px-8 py-4">MAP</th>
                        <th className="px-8 py-4">Dealer</th>
                        <th className="px-8 py-4 text-brand-blue">Distributor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 text-xs font-mono text-white/40">{p.sku}</td>
                          <td className="px-8 py-6 font-bold text-sm">{p.name}</td>
                          <td className="px-8 py-6 text-sm text-white/60">${(p as any).msrp?.toLocaleString() || '—'}</td>
                          <td className="px-8 py-6 text-sm text-white/60">${(p as any).map?.toLocaleString() || '—'}</td>
                          <td className="px-8 py-6 text-sm text-white/60">${(p as any).dealerPrice?.toLocaleString() || '—'}</td>
                          <td className="px-8 py-6 text-sm font-bold text-brand-blue">${(p as any).distributorPrice?.toLocaleString() || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'dealers' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Dealer Network Management</h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input type="text" placeholder="Search dealers..." className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:border-brand-blue outline-none" />
                  </div>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">Dealer Name</th>
                        <th className="px-8 py-4">Location</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Total Sales</th>
                        <th className="px-8 py-4">Last Active</th>
                        <th className="px-8 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {dealers.map(dealer => (
                        <tr key={dealer.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <p className="text-sm font-bold">{dealer.name}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest">ID: TC-DLR-00{dealer.id}</p>
                          </td>
                          <td className="px-8 py-6 text-xs text-white/60">{dealer.location}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-2 w-fit ${
                              dealer.status === 'Active' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30' : 
                              dealer.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' : 
                              'bg-brand-red/10 text-brand-red border-brand-red/30'
                            }`}>
                              {dealer.status === 'Active' ? <CheckCircle2 size={10} /> : dealer.status === 'Pending' ? <AlertCircle size={10} /> : <XCircle size={10} />}
                              {dealer.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-white">{dealer.sales}</td>
                          <td className="px-8 py-6 text-[10px] text-white/40 uppercase tracking-widest">{dealer.lastActive}</td>
                          <td className="px-8 py-6">
                            <button className="text-white/40 hover:text-white"><MoreVertical size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Global Activity Stream</h2>
                  <button className="text-xs font-bold uppercase tracking-widest text-brand-blue flex items-center gap-2">
                    <Download size={14} /> Export Logs
                  </button>
                </div>
                <div className="metallic-card p-8">
                  <div className="space-y-8">
                    {activities.map((act, idx) => (
                      <div key={act.id} className="flex gap-6 items-start relative">
                        {idx !== activities.length - 1 && (
                          <div className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-white/5" />
                        )}
                        <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${act.color} border border-white/10`}>
                          <act.icon size={18} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-bold">{act.dealer}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest">{act.time}</p>
                          </div>
                          <p className="text-sm text-white/60">{act.action}</p>
                          <div className="mt-3 flex gap-2">
                            <span className="text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">IP: 192.168.1.{act.id}</span>
                            <span className="text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">ID: #EVT-00{act.id}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Security & Audit Logs</h2>
                  <div className="flex gap-4">
                    <select className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-red">
                      <option>All Severities</option>
                      <option>Critical</option>
                      <option>Warning</option>
                    </select>
                  </div>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">Event</th>
                        <th className="px-8 py-4">Source</th>
                        <th className="px-8 py-4">Severity</th>
                        <th className="px-8 py-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { event: 'Unauthorized Login Attempt', source: 'IP: 45.12.88.2', severity: 'Critical', time: '12 mins ago' },
                        { event: 'API Key Rotated', source: 'Admin: Sarah K.', severity: 'Info', time: '1 hour ago' },
                        { event: 'Database Backup Completed', source: 'System', severity: 'Success', time: '3 hours ago' },
                        { event: 'New Admin Role Assigned', source: 'SuperAdmin', severity: 'Warning', time: '5 hours ago' },
                      ].map((log, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 text-sm font-bold">{log.event}</td>
                          <td className="px-8 py-6 text-xs text-white/50">{log.source}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                              log.severity === 'Critical' ? 'bg-brand-red/10 text-brand-red border-brand-red/30' :
                              log.severity === 'Warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                              'bg-brand-blue/10 text-brand-blue border-brand-blue/30'
                            }`}>
                              {log.severity}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-[10px] text-white/40 uppercase tracking-widest">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'refunds' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Refund Control Center</h2>
                  <div className="flex gap-4">
                    <button className="btn-secondary py-2 px-6 text-xs">View Pending</button>
                    <button className="btn-primary py-2 px-6 text-xs">Process Batch</button>
                  </div>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">Order ID</th>
                        <th className="px-8 py-4">Customer/Dealer</th>
                        <th className="px-8 py-4">Amount</th>
                        <th className="px-8 py-4">Reason</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { id: 'ORD-9921', name: 'Midwest Diesel', amount: '$12,400', reason: 'Bulk Return', status: 'Pending' },
                        { id: 'ORD-8812', name: 'John Doe', amount: '$299', reason: 'Fitment Issue', status: 'Approved' },
                      ].map((refund, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 text-xs font-mono text-white/40">{refund.id}</td>
                          <td className="px-8 py-6 font-bold text-sm">{refund.name}</td>
                          <td className="px-8 py-6 text-sm text-brand-red font-bold">{refund.amount}</td>
                          <td className="px-8 py-6 text-xs text-white/50">{refund.reason}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${refund.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' : 'bg-brand-blue/10 text-brand-blue border-brand-blue/30'}`}>
                              {refund.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <button className="text-brand-blue hover:underline text-[10px] font-bold uppercase tracking-widest">Review</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'qr-gen' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-display font-black italic uppercase">Secure QR Generation</h2>
                  <span className="px-4 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-[10px] font-bold text-brand-red uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12} /> High Security Module
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="metallic-card p-8 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-4">Generate Batch</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Product Category</label>
                        <select className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white outline-none focus:border-brand-red">
                          <option>Head Stud Kits</option>
                          <option>Main Stud Kits</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Batch Quantity</label>
                        <input type="number" placeholder="500" className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white outline-none focus:border-brand-red" />
                      </div>
                      <button className="btn-primary w-full py-4 flex items-center justify-center gap-3">
                        <Database size={20} /> Generate & Encrypt Batch
                      </button>
                    </div>
                  </div>
                  <div className="metallic-card p-8 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-4">Recent Batches</h3>
                    <div className="space-y-4">
                      {[
                        { id: 'BCH-001', qty: 500, date: '2 hours ago', status: 'Encrypted' },
                        { id: 'BCH-002', qty: 1200, date: '1 day ago', status: 'Printed' },
                      ].map(batch => (
                        <div key={batch.id} className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest">{batch.id}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{batch.qty} Codes • {batch.date}</p>
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-blue">{batch.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                <h2 className="text-2xl font-display font-black italic uppercase mb-8">Global HQ Settings</h2>
                <div className="space-y-6">
                  <div className="metallic-card p-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Platform Configuration</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">Dealer Registration</p>
                          <p className="text-xs text-white/40">Allow new dealers to apply via the public portal</p>
                        </div>
                        <div className="w-12 h-6 bg-brand-blue rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">Global Warranty Lock</p>
                          <p className="text-xs text-white/40">Temporarily disable all warranty activations</p>
                        </div>
                        <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="metallic-card p-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">API & Integrations</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-black/50 border border-white/10 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Database size={18} className="text-brand-blue" />
                          <span className="text-xs font-mono">TC_PROD_DB_V2</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">Connected</span>
                      </div>
                      <button className="btn-secondary w-full py-3 text-xs">Manage API Keys</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUI;
