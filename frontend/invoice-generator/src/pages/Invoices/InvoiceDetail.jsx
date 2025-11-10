import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { Loader2, Edit, Printer, AlertCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateInvoice from './CreateInvoice';
import Button from '../../components/ui/Button';
import ReminderModal from '../../components/invoices/ReminderModal';

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const invoiceRef = useRef();

  useEffect(()=>
  {
    const fetchInvoice=async () =>{
      try{
        const response= await axiosInstance.get (API_PATHS.INVOICE.GET_INVOICE_BY_ID(id));
        setInvoice(response.data);
      }
      catch(err)
      {
        toast.error('Failed to fetch invoice.');
        console.error(err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchInvoice();
  },[id]);

  const handleUpdate = async (formData)=>{
    try {
      const response = await axiosInstance.put(
        API_PATHS.INVOICE.UPDATE_INVOICE(id),
        formData
      );
      setInvoice(response.data);
      setIsEditing(false);
      toast.success('Invoice updated successfully!');
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast.error('Failed to update invoice');
    }
  };
  
  const handlePrint = () =>
  {
    window.print();
  };
  if(loading)
  {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-red-800"/>
      </div>
    )
  }
  if (!invoice) {
    return (
      <div className="flex flex-col justify-center items-center py-12 text-center bg-slate-50 rounded-lg h-96">
        <div className="flex justify-center items-center mb-4 w-16 h-16 bg-red-100 rounded-full">
          <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-red-900 mb-2">Invoice not found</h3>
          <Button 
            onClick={() => navigate('/invoices')} 
            variant="secondary"
          >
            Back to Invoices
          </Button>
        
      </div>
    );
  }
  if (isEditing) {
    return (
      <CreateInvoice 
        existingInvoice={invoice} 
        onSave={handleUpdate}
      />
    );
  }


  return (
    <>
      <ReminderModal 
        isOpen={isReminderModalOpen} 
        onClose={() => setIsReminderModalOpen(false)} 
        invoiceId={id}
      />
      
      <div className="space-y-6" ref={invoiceRef}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-red-900">
              Invoice <span className="text-slate-500">#{invoice.invoiceNumber}</span>
            </h1>
            <p className="text-sm text-red-700 mt-1">
              Created on {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {invoice.status !== 'Paid' && (
              <Button
                variant="secondary"
                onClick={() => setIsReminderModalOpen(true)}
                icon={Mail}
              >
                Send Reminder
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
              icon={Edit}
            >
              Edit
            </Button>
            <Button
              onClick={handlePrint}
              icon={Printer}
            >
              Print
            </Button>
          </div>
        </div>
  
        {/* Bill From & Bill To */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Bill From</h3>
            <div className="space-y-2 text-slate-700">
              <p className="font-medium">{invoice.billFrom.businessName}</p>
              <p>{invoice.billFrom.email}</p>
              <p>{invoice.billFrom.address}</p>
              <p>{invoice.billFrom.phone}</p>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Bill To</h3>
            <div className="space-y-2 text-slate-700">
              <p className="font-medium">{invoice.billTo.clientName}</p>
              <p>{invoice.billTo.email}</p>
              <p>{invoice.billTo.address}</p>
              <p>{invoice.billTo.phone}</p>
            </div>
          </div>
        </div>
  
        {/* Items Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-red-900">Items</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tax %</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">${item.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{item.taxPercent}%</td>
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      ${((item.quantity * item.unitPrice) * (1 + item.taxPercent / 100)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Totals */}
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${invoice.taxTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-slate-200 pt-2">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Notes & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Notes</h3>
            <p className="text-slate-700">{invoice.notes || 'No notes provided'}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Payment Terms</h3>
            <p className="text-slate-700 capitalize">{invoice.paymentTerms}</p>
            <div className="mt-4">
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                invoice.status === 'Paid' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {invoice.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style>
  {`
    @media print {
      @page {
        margin: 10mm;
        size: A4;
      }
      
      body * {
        visibility: hidden;
        margin: 0;
        padding: 0;
      }
      
      .space-y-6,
      .space-y-6 * {
        visibility: visible;
      }
      
      .space-y-6 {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        font-size: 10px;
        line-height: 1.1;
        transform: scale(0.9);
        transform-origin: top left;
      }
      
      /* Ultra compact styling */
      .space-y-6 > * {
        margin-bottom: 4px !important;
      }
      
      .flex.items-center.gap-2 {
        display: none !important;
      }
      
      .bg-white {
        background: white !important;
        padding: 8px !important;
      }
      
      .p-6 {
        padding: 8px !important;
      }
      
      table {
        font-size: 9px !important;
      }
      
      th, td {
        padding: 2px 4px !important;
      }
      
      h1 { font-size: 16px !important; }
      h3 { font-size: 12px !important; }
      p, span, div { font-size: 9px !important; }
      
      .grid.grid-cols-1.lg\\:grid-cols-2 {
        display: block !important;
      }
      
      .grid.grid-cols-1.lg\\:grid-cols-2 > * {
        margin-bottom: 6px !important;
      }
    }
  `}
</style>
    </>
  );
}

export default InvoiceDetail;