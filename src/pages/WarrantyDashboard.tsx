import { Shield, Package, Clock, ChevronRight, Download, Settings, History } from 'lucide-react';
import { motion } from 'framer-motion';
import warrantyData from '../data/warranty.json';

const WarrantyDashboard = () => {
  const activeWarranties = warrantyData.filter(w => w.activated);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-black italic uppercase mb-2">My Garage</h1>
            <p className="text-white/50">Manage your Torque Craft components and warranty status.</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-secondary py-2 text-xs flex items-center gap-2">
              <Settings size={14} /> Account Settings
            </button>
            <button className="btn-primary py-2 text-xs flex items-center gap-2">
              <History size={14} /> Order History
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="metallic-card p-8">
            <div className="flex items-center justify-between mb-4">
              <Shield className="text-brand-red" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Active Warranties</span>
            </div>
            <p className="text-4xl font-display font-black italic">{activeWarranties.length}</p>
          </div>
          <div className="metallic-card p-8">
            <div className="flex items-center justify-between mb-4">
              <Package className="text-brand-blue" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Components</span>
            </div>
            <p className="text-4xl font-display font-black italic">12</p>
          </div>
          <div className="metallic-card p-8">
            <div className="flex items-center justify-between mb-4">
              <Clock className="text-brand-red" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Days Since Last Build</span>
            </div>
            <p className="text-4xl font-display font-black italic">42</p>
          </div>
        </div>

        {/* Warranty List */}
        <div className="metallic-card overflow-hidden">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-display font-bold italic uppercase">Registered Components</h3>
            <button className="text-brand-blue text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              Register New <ChevronRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <th className="px-8 py-4">Component</th>
                  <th className="px-8 py-4">Serial Number</th>
                  <th className="px-8 py-4">Activation Date</th>
                  <th className="px-8 py-4">Expiry Date</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeWarranties.map((w) => (
                  <tr key={w.serial} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold">{w.productName}</p>
                    </td>
                    <td className="px-8 py-6">
                      <code className="text-[10px] font-mono bg-black/50 px-2 py-1 rounded border border-white/10">{w.serial}</code>
                    </td>
                    <td className="px-8 py-6 text-sm text-white/60">{w.activationDate}</td>
                    <td className="px-8 py-6 text-sm text-brand-red font-bold">{w.expiryDate}</td>
                    <td className="px-8 py-6">
                      <span className="bg-brand-blue/20 text-brand-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-brand-blue/30">
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-white/40 hover:text-white transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyDashboard;
