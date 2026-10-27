import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Arjun Yadav',
    email: '27-arjun.yadav@fiib.edu.in',
    phone: '+91 98765 43210',
    address: 'Plot 12, Institutional Area, Vasant Kunj',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110070',
    paymentMethod: 'upi'
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      onOrderSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
                Express Checkout
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Complete Your Aqua Bliss Order
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>Delivery Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Payment Option</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'upi', label: 'UPI / QR', sub: 'GPay / PhonePe / Paytm' },
                    { id: 'card', label: 'Cards', sub: 'Debit & Credit' },
                    { id: 'cod', label: 'Cash on Delivery', sub: 'Pay on arrival' }
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex flex-col justify-between transition-all ${
                        formData.paymentMethod === p.id
                          ? 'border-sky-600 bg-sky-50/70 text-slate-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{p.label}</span>
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === p.id}
                          onChange={() => setFormData({ ...formData, paymentMethod: p.id })}
                          className="text-sky-600 focus:ring-sky-500"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">{p.sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order total & Submit */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Items Total ({items.reduce((s, it) => s + it.quantity, 0)})</span>
                  <span className="font-semibold text-slate-900">₹{subtotal}/-</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}/-`}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                  <span className="text-base font-bold text-slate-900">Total Payable</span>
                  <span className="text-2xl font-black text-slate-900">₹{total}/-</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Confirm Order (₹{total}/-)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Order Placed Successfully!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, {formData.name}! Your order has been registered and is being prepared for express dispatch to {formData.city}.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 max-w-sm mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-bold text-slate-900">#AB-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">Tomorrow by 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-medium text-slate-900 uppercase">{formData.paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors cursor-pointer text-sm"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
