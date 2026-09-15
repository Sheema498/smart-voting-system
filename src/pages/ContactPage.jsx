import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { validateContactForm } from '../utils/validators';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    voterId: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const categories = [
    'General Inquiry',
    'Voter Registration Help',
    'Ballot Booth Issue',
    'Digital Receipt Audit',
    'Accessibility Accommodation',
    'Election Administration'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketNum = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        ticketNum,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        timestamp: new Date().toLocaleString()
      });
      setFormData({
        name: '',
        email: '',
        voterId: '',
        category: 'General Inquiry',
        subject: '',
        message: ''
      });
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <Badge variant="primary">Civic Support</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact VoteSphere Civic Desk
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Have an electoral inquiry, accessibility request, or need assistance navigating your democratic ballot? Connect directly with our dedicated civic support team.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 space-y-6 bg-slate-900 text-white">
            <h3 className="text-lg font-bold">Electoral Contact Center</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Email</p>
                  <p className="text-xs text-slate-400">civic-support@votesphere.gov</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Voter Hotline</p>
                  <p className="text-xs text-slate-400">1-800-555-VOTE (Toll-Free)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Active Polling Hours</p>
                  <p className="text-xs text-slate-400">24/7 Digital Platform Availability</p>
                  <p className="text-xs text-slate-400">Civic Staff: Mon-Sat 07:00 - 21:00 EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Central Electoral Headquarters</p>
                  <p className="text-xs text-slate-400">Democratic Center Plaza, Suite 400</p>
                  <p className="text-xs text-slate-400">Capital District, National Jurisdiction</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-slate-200">Non-Partisan Guarantee</p>
              <p>
                All communications are recorded for quality assurance and strictly protected under voter confidentiality standards.
              </p>
            </div>
          </Card>
        </div>

        {/* Form Container */}
        <div className="md:col-span-2">
          <Card className="p-6 sm:p-8 space-y-6">
            {submittedTicket ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 text-emerald-950">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Inquiry Successfully Dispatched</h4>
                    <p className="text-xs text-emerald-700">Reference: {submittedTicket.ticketNum}</p>
                  </div>
                </div>
                <p className="text-sm text-emerald-800">
                  Thank you, <span className="font-semibold">{submittedTicket.name}</span>. Your inquiry regarding "{submittedTicket.subject}" has been queued. A simulated response confirmation has been dispatched to {submittedTicket.email}.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                    onClick={() => setSubmittedTicket(null)}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Send an Inquiry</h3>
                  <p className="text-xs text-slate-500">
                    Fields marked with an asterisk (*) are mandatory.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="e.g. Eleanor Vance"
                  />
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="voter@example.org"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Official Voter ID (Optional)"
                    name="voterId"
                    value={formData.voterId}
                    onChange={handleChange}
                    placeholder="e.g. VS-984210-2026"
                  />
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Topic Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Input
                  label="Subject Line *"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder="Summary of your question or issue"
                />

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Detailed Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide relevant details regarding your inquiry..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.message
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-300 focus:ring-primary-500 bg-white'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto shadow-sm"
                  >
                    {isSubmitting ? (
                      'Dispatching...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Civic Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
