import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockFaq } from '../data/mockFaq';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(mockFaq[0]?.id || 'faq-1');

  const categories = useMemo(() => {
    const cats = new Set(mockFaq.map((item) => item.category || 'General'));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredFaqs = useMemo(() => {
    return mockFaq.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const qLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.q.toLowerCase().includes(qLower) ||
        item.a.toLowerCase().includes(qLower);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Header */}
      <section className="text-center space-y-4">
        <Badge variant="primary">Knowledge Base</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-base">
          Find answers regarding cryptographic ballot security, voter eligibility, digital receipts, and real-time auditability.
        </p>
      </section>

      {/* Search & Category filter */}
      <section className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Search questions by keyword (e.g. security, PIN, receipt, audit)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 text-base bg-white shadow-xs"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion list */}
      <section className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <Card className="p-8 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-semibold text-slate-800">No matching questions found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your search terms or selecting "All" categories.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </Button>
          </Card>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id || faq.q}
                className={`border rounded-2xl transition-all duration-200 bg-white ${
                  isExpanded
                    ? 'border-primary-300 ring-2 ring-primary-100 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1">
                    {faq.category && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary-600">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="font-semibold text-base text-slate-900 leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <div className="shrink-0 p-1 rounded-full text-slate-400 bg-slate-50">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-primary-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-1 border-t border-slate-100">
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Support Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-lg text-primary-950">Still have questions?</h4>
          <p className="text-sm text-primary-800">
            Our civic support team is available to assist you with voter access, district verification, and ballot questions.
          </p>
        </div>
        <Link to="/contact" className="shrink-0">
          <Button variant="primary" className="shadow-sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Civic Desk
          </Button>
        </Link>
      </Card>
    </div>
  );
};
