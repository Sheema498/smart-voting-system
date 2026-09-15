import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import {
  Accessibility,
  CheckCircle2,
  Eye,
  Keyboard,
  Volume2,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AccessibilityPage = () => {
  const keyboardShortcuts = [
    { key: 'Tab', action: 'Move to the next interactive button, field, or ballot option' },
    { key: 'Shift + Tab', action: 'Move backward to the previous interactive element' },
    { key: 'Spacebar / Enter', action: 'Activate buttons, toggle candidate selection, or submit forms' },
    { key: 'Escape', action: 'Dismiss active modals, candidate drawers, or dialog overlays' },
    { key: 'Arrow Up / Down', action: 'Navigate vertical candidate lists or table rows' }
  ];

  const standards = [
    {
      title: 'WCAG 2.1 Level AA Standard',
      desc: 'All interface elements, contrast ratios, and text elements satisfy standard Web Content Accessibility Guidelines.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'High Contrast Color Ratios',
      desc: 'All primary text achieves a minimum contrast ratio of 4.5:1 against backgrounds for enhanced visual legibility.',
      icon: <Eye className="w-5 h-5 text-primary-600" />
    },
    {
      title: 'Screen Reader ARIA Semantics',
      desc: 'Form inputs, candidate selections, and modal states declare accessible names, live regions, and semantic roles.',
      icon: <Volume2 className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Keyboard-Only Navigation',
      desc: 'Complete end-to-end voting capability without requiring a mouse, trackpad, or touch gesture.',
      icon: <Keyboard className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Header */}
      <section className="text-center space-y-4">
        <Badge variant="primary">Inclusive Democracy</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Accessibility Statement & Guide
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          VoteSphere is committed to ensuring that every citizen, regardless of ability or assistive technology, can independently and privately exercise their democratic right to vote.
        </p>
      </section>

      {/* Standards Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {standards.map((s, idx) => (
          <Card key={idx} className="p-6 space-y-3 bg-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                {s.icon}
              </div>
              <h3 className="font-bold text-slate-900">{s.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
          </Card>
        ))}
      </div>

      {/* Keyboard Shortcuts Table */}
      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Keyboard Navigation Guide</h2>
          <p className="text-xs text-slate-500">
            Standard hotkeys to navigate the ballot wizard and platform without a pointing device:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                <th className="py-3 px-4">Keystroke</th>
                <th className="py-3 px-4">Action in VoteSphere</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {keyboardShortcuts.map((k, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary-700 whitespace-nowrap">
                    <kbd className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded shadow-xs text-xs">
                      {k.key}
                    </kbd>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{k.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Feedback & Accommodations */}
      <Card className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold">Need an Accessibility Accommodation?</h3>
          <p className="text-xs text-slate-300 max-w-md">
            If you encounter an accessibility barrier or require an alternative ballot format, our accessibility liaison is ready to support you.
          </p>
        </div>
        <Link to="/contact" className="shrink-0">
          <Button variant="primary" className="bg-primary-500 hover:bg-primary-600">
            Request Accommodation <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </Card>
    </div>
  );
};
