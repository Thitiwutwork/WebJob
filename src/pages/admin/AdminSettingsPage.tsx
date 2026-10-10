import React, { useEffect, useState } from 'react';
import { Settings, Save, Globe, CreditCard, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { settingService } from '../../services/settingService';
import { SiteSettings } from '../../types/database';
import { Button } from '../../components/common/Button';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingService.getSettings();
        setSettings(data);
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccess(false);

    try {
      await settingService.updateSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-slate-500 font-mono">กำลังโหลดการตั้งค่า...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-black text-white">ตั้งค่าเว็บไซต์ (Site Settings)</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            จัดการข้อมูลผู้พัฒนา โดเมนหลัก (namenoname.store) และช่องทางรับชำระเงิน
          </p>
        </div>

        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>บันทึกการตั้งค่าเรียบร้อยแล้ว</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs font-mono">
          {/* General Branding */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              ข้อมูลสตูดิโอ & โดเมน
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">ชื่อเว็บไซต์ (Site Title)</label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">ชื่อผู้พัฒนา (Developer Name)</label>
                <input
                  type="text"
                  value={settings.developer_name}
                  onChange={(e) => setSettings({ ...settings, developer_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">โดเมนเนมหลัก (Primary Domain)</label>
              <input
                type="text"
                value={settings.domain}
                onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">อีเมลติดต่อ</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">LINE ID</label>
                <input
                  type="text"
                  value={settings.line_id}
                  onChange={(e) => setSettings({ ...settings, line_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              บัญชีธนาคารสำหรับรับโอนเงิน
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">ชื่อธนาคาร</label>
                <input
                  type="text"
                  value={settings.bank_name}
                  onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">เลขที่บัญชี</label>
                <input
                  type="text"
                  value={settings.bank_account_number}
                  onChange={(e) => setSettings({ ...settings, bank_account_number: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">ชื่อบัญชี</label>
                <input
                  type="text"
                  value={settings.bank_account_name}
                  onChange={(e) => setSettings({ ...settings, bank_account_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">PromptPay ID</label>
                <input
                  type="text"
                  value={settings.promptpay_number}
                  onChange={(e) => setSettings({ ...settings, promptpay_number: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="lg" type="submit" loading={saving} icon={<Save className="w-4 h-4" />}>
              บันทึกการตั้งค่าทั้งหมด
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
