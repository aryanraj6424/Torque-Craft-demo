import { useState } from 'react';
import { LayoutDashboard, Package, QrCode, ShieldCheck, Truck, Users, Search, Plus, Download, ChevronRight, MoreVertical, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import products from '../data/products.json';
import warrantyData from '../data/warranty.json';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminUI = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAdmin, isBusiness, isAuthenticated } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isAuthenticated || (!isAdmin && !isBusiness)) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex flex-col items-center justify-center px-6">
        <div className="metallic-card p-12 text-center max-w-md border-glow-red">
          <ShieldCheck size={48} className="mx-auto text-brand-red mb-6" />
          <h2 className="text-2xl font-display font-black italic uppercase mb-4">Dealer Access Required</h2>
          <p className="text-white/50 mb-8">You must be logged in as an authorized dealer to access this portal.</p>
          <div className="flex flex-col gap-4">
            <Link to="/login" className="btn-primary flex items-center justify-center gap-2">
              <LogIn size={18} /> Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleGenerateQR = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Batch QR Codes generated and ready for download.');
    }, 2000);
  };

  const stats = [
    { label: 'Total Sales', value: '$142,800', icon: LayoutDashboard, color: 'text-brand-blue' },
    { label: 'Active Warranties', value: '842', icon: ShieldCheck, color: 'text-brand-red' },
    { label: 'Pending Orders', value: '12', icon: Truck, color: 'text-brand-blue' },
    { label: 'Dealer Requests', value: '5', icon: Users, color: 'text-brand-red' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Admin Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="metallic-card p-6 sticky top-32">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center font-bold">A</div>
                <div>
                  <p className="text-sm font-bold">Business Portal</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Partner Network</p>
                </div>
              </div>
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'products', label: 'Inventory', icon: Package },
                  { id: 'prices', label: 'Price List', icon: Download },
                  { id: 'warranty', label: 'Warranty Log', icon: ShieldCheck },
                  { id: 'orders', label: 'Orders', icon: Truck },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-brand-red text-white glow-red' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                  >
                    <item.icon size={18} /> {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Admin Content */}
          <div className="flex-grow">
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map(stat => (
                    <div key={stat.label} className="metallic-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <stat.icon className={stat.color} size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">MTD</span>
                      </div>
                      <p className="text-2xl font-display font-black italic">{stat.value}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="metallic-card p-8">
                    <h3 className="text-lg font-display font-bold italic uppercase mb-6">Recent Orders</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center"><Truck size={16} /></div>
                            <div>
                              <p className="text-sm font-bold">#TC-992{i}-X</p>
                              <p className="text-[10px] text-white/40">2 mins ago</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-brand-blue">$8,499.99</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="metallic-card p-8">
                    <h3 className="text-lg font-display font-bold italic uppercase mb-6">System Health</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                          <span>Database Load</span>
                          <span className="text-brand-blue">12%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-blue w-[12%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                          <span>API Latency</span>
                          <span className="text-brand-red">42ms</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-red w-[42%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Product Management</h2>
                  <button className="btn-primary py-2 px-6 text-xs flex items-center gap-2">
                    <Plus size={16} /> Add Product
                  </button>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">Product</th>
                        <th className="px-8 py-4">SKU</th>
                        <th className="px-8 py-4">Price</th>
                        <th className="px-8 py-4">Stock</th>
                        <th className="px-8 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 font-bold text-sm">{p.name}</td>
                          <td className="px-8 py-6 text-xs text-white/40 font-mono">{p.sku}</td>
                          <td className="px-8 py-6 text-sm font-bold text-brand-red">${p.price.toLocaleString()}</td>
                          <td className="px-8 py-6">
                            <span className="text-xs font-bold text-brand-blue">12 Units</span>
                          </td>
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

            {activeTab === 'prices' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Dealer Price List</h2>
                  <button className="btn-secondary py-2 px-6 text-xs flex items-center gap-2">
                    <Download size={16} /> Export CSV
                  </button>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">SKU</th>
                        <th className="px-8 py-4">Product Name</th>
                        <th className="px-8 py-4">MSRP</th>
                        <th className="px-8 py-4">MAP</th>
                        <th className="px-8 py-4 text-brand-blue">Dealer Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 text-xs font-mono text-white/40">{p.sku}</td>
                          <td className="px-8 py-6 font-bold text-sm">{p.name}</td>
                          <td className="px-8 py-6 text-sm text-white/60">${(p as any).msrp?.toLocaleString() || '—'}</td>
                          <td className="px-8 py-6 text-sm text-white/60">${(p as any).map?.toLocaleString() || '—'}</td>
                          <td className="px-8 py-6 text-sm font-bold text-brand-blue">${(p as any).dealerPrice?.toLocaleString() || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'qr' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
                <div className="metallic-card p-12 text-center">
                  <div className="w-24 h-24 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-brand-red/20">
                    <QrCode size={48} className="text-brand-red" />
                  </div>
                  <h2 className="text-2xl font-display font-black italic uppercase mb-4">Batch QR Generator</h2>
                  <p className="text-white/50 mb-10">Generate unique encrypted serial numbers and QR codes for new production batches.</p>
                  
                  <div className="space-y-6 text-left mb-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Select Product</label>
                      <select className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red">
                        {products.map(p => <option key={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Batch Size</label>
                      <input type="number" placeholder="100" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red" />
                    </div>
                  </div>

                  <button 
                    onClick={handleGenerateQR}
                    disabled={isGenerating}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'Generate & Download PDF'} <Download size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'warranty' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Warranty Activation Log</h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input type="text" placeholder="Search serials..." className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:border-brand-red outline-none" />
                  </div>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">Serial</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Product</th>
                        <th className="px-8 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {warrantyData.map(w => (
                        <tr key={w.serial} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 font-mono text-[10px] tracking-widest">{w.serial}</td>
                          <td className="px-8 py-6 text-sm">{w.customerName || '—'}</td>
                          <td className="px-8 py-6 text-xs text-white/60">{w.productName}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${w.activated ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30' : 'bg-white/5 text-white/30 border-white/10'}`}>
                              {w.activated ? 'Active' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black italic uppercase">Order Management</h2>
                  <div className="flex gap-4">
                    <select className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-red">
                      <option>All Orders</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="metallic-card overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <tr>
                        <th className="px-8 py-4">Order ID</th>
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Total</th>
                        <th className="px-8 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { id: 'TC-9921-X', date: 'Oct 24, 2023', customer: 'James Wilson', total: '$8,499.99', status: 'Shipped' },
                        { id: 'TC-9922-X', date: 'Oct 25, 2023', customer: 'Sarah Miller', total: '$1,250.00', status: 'Processing' },
                        { id: 'TC-9923-X', date: 'Oct 26, 2023', customer: 'Robert Chen', total: '$4,200.00', status: 'Delivered' },
                        { id: 'TC-9924-X', date: 'Oct 27, 2023', customer: 'Amanda Ross', total: '$950.00', status: 'Processing' },
                      ].map((order, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 font-bold text-sm">{order.id}</td>
                          <td className="px-8 py-6 text-xs text-white/40">{order.date}</td>
                          <td className="px-8 py-6 text-sm">{order.customer}</td>
                          <td className="px-8 py-6 text-sm font-bold text-brand-blue">{order.total}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                              order.status === 'Shipped' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30' :
                              order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                              'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUI;
