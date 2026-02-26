import { motion } from 'framer-motion';
import { useState } from 'react';
import { FileText, Send, CheckCircle2 } from 'lucide-react';

const DealerApplication = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="metallic-card p-12 max-w-md border-glow-blue">
          <CheckCircle2 size={64} className="mx-auto text-brand-blue mb-8" />
          <h2 className="text-3xl font-display font-black italic uppercase mb-4">Application Received</h2>
          <p className="text-white/60 mb-8">Thank you for your interest in the Torque Craft Dealer Program. Our team will review your application and contact you within 2-3 business days.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-navy-deep">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-black italic uppercase mb-4">Dealer <span className="text-brand-red">Application</span></h1>
          <p className="text-white/50 uppercase tracking-widest text-xs font-bold">Join the Torque Craft Network</p>
        </div>

        <div className="metallic-card p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Business Name</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Tax ID / EIN</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Contact Name</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Address</label>
                <input required type="email" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Phone Number</label>
                <input required type="tel" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Website</label>
                <input type="url" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Business Address</label>
              <textarea required className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Business Description</label>
              <textarea required placeholder="Tell us about your shop and typical projects..." className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-red min-h-[120px]" />
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-brand-red" size={20} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Program Requirements</h3>
              </div>
              <ul className="space-y-2 text-xs text-white/40">
                <li>• Must have a physical retail location or professional shop.</li>
                <li>• Minimum initial order of $2,500 required.</li>
                <li>• Must adhere to MAP (Minimum Advertised Price) policies.</li>
              </ul>
            </div>

            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-3">
              Submit Application <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DealerApplication;
