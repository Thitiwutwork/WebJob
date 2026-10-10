import React, { useEffect, useState } from 'react';
import { Inbox, Eye, CheckCircle2, MessageSquare, Filter, X } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { inquiryService } from '../../services/inquiryService';
import { Inquiry, InquiryStatus } from '../../types/database';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [internalNotes, setInternalNotes] = useState('');

  const loadInquiries = async () => {
    try {
      const data = await inquiryService.getAllInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Error loading admin inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleOpenDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setInternalNotes(inq.internal_notes || '');
  };

  const handleUpdateStatus = async (newStatus: InquiryStatus) => {
    if (!selectedInquiry) return;
    await inquiryService.updateInquiryStatus(selectedInquiry.id, newStatus, internalNotes);
    setSelectedInquiry({ ...selectedInquiry, status: newStatus, internal_notes: internalNotes });
    loadInquiries();
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    await inquiryService.updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, internalNotes);
    loadInquiries();
    alert('บันทึกหมายเหตุเรียบร้อย');
  };

  const filteredInquiries = inquiries.filter((i) => {
    if (statusFilter === 'all') return true;
    return i.status === statusFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">จัดการคำขอบรีฟงาน (Inquiries)</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              ติดตามบรีฟงานจากลูกค้า ออกใบเสนอราคา และบันทึกประวัติการดำเนินงาน
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">สถานะ:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            >
              <option value="all">ทั้งหมด ({inquiries.length})</option>
              <option value="new">คำขอใหม่ (New)</option>
              <option value="reviewing">กำลังตรวจบรีฟ (Reviewing)</option>
              <option value="quoted">ส่งใบเสนอราคาแล้ว (Quoted)</option>
              <option value="accepted">ตกลงเริ่มงาน (Accepted)</option>
            </select>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-4">รหัส & ผู้ติดต่อ</th>
                  <th className="p-4">ช่องทางติดต่อ</th>
                  <th className="p-4">งบประมาณ</th>
                  <th className="p-4">สถานะ</th>
                  <th className="p-4">วันที่ส่ง</th>
                  <th className="p-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                      ไม่พบรายการคำขอบรีฟงาน
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-900/80 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-bold text-indigo-400 block">
                          {inq.inquiry_number}
                        </span>
                        <span className="text-white font-medium">{inq.customer_name}</span>
                      </td>
                      <td className="p-4 font-mono">
                        <span className="text-slate-300 block">{inq.email}</span>
                        {inq.phone && <span className="text-slate-500 block">{inq.phone}</span>}
                        {inq.contact_channel && (
                          <span className="text-indigo-400 block">{inq.contact_channel}</span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-white">{inq.budget}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            inq.status === 'new'
                              ? 'info'
                              : inq.status === 'accepted'
                              ? 'success'
                              : 'slate'
                          }
                          size="sm"
                        >
                          {inq.status}
                        </Badge>
                      </td>
                      <td className="p-4 font-mono text-slate-500">
                        {new Date(inq.created_at).toLocaleDateString('th-TH')}
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="secondary" size="sm" onClick={() => handleOpenDetail(inq)}>
                          ดูบรีฟงาน
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 block">
                  {selectedInquiry.inquiry_number}
                </span>
                <h3 className="text-lg font-bold text-white">
                  บรีฟงานจาก: {selectedInquiry.customer_name}
                </h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block">อีเมล:</span>
                  <span className="text-white">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">เบอร์โทร / LINE:</span>
                  <span className="text-white">
                    {selectedInquiry.phone || selectedInquiry.contact_channel || '-'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">งบประมาณ:</span>
                  <span className="text-white font-bold">{selectedInquiry.budget}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">กำหนดส่ง:</span>
                  <span className="text-white">{selectedInquiry.requested_deadline || '-'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-mono block mb-1">รายละเอียดโครงการ:</span>
                <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
                  {selectedInquiry.project_description}
                </p>
              </div>

              {selectedInquiry.required_features && (
                <div>
                  <span className="text-slate-400 font-mono block mb-1">ฟีเจอร์ที่ต้องการ:</span>
                  <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                    {selectedInquiry.required_features}
                  </p>
                </div>
              )}

              {/* Status Change Buttons */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono block">เปลี่ยนสถานะโครงการ:</span>
                <div className="flex flex-wrap gap-2">
                  {(['new', 'reviewing', 'quoted', 'negotiating', 'accepted', 'rejected'] as InquiryStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          selectedInquiry.status === st
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-slate-400 font-mono mb-1">
                  หมายเหตุภายใน / บันทึกข้อเสนอราคา
                </label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="เช่น ส่งใบเสนอราคา 25,000 บาท ทางอีเมลแล้ว นัดคุยสโคปเพิ่มวันจันทร์..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <Button variant="secondary" size="sm" onClick={handleSaveNotes}>
                  บันทึกหมายเหตุ
                </Button>
                <Button variant="primary" size="sm" onClick={() => setSelectedInquiry(null)}>
                  ปิดหน้าต่าง
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
