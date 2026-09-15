import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import {
  HelpCircle,
  Search,
  BookOpen,
  Vote,
  ShieldCheck,
  KeyRound,
  FileCheck2,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

export const HelpCenterPage = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const articles = [
    {
      id: 'guide-1',
      category: 'getting-started',
      categoryName: 'Getting Started',
      title: 'How to Access Your Ballot and Confirm District Standing',
      description: 'Step-by-step instructions on verifying voter registration, checking jurisdiction boundaries, and opening your active voting booth.',
      readTime: '3 min read'
    },
    {
      id: 'guide-2',
      category: 'voting',
      categoryName: 'Ballot Instructions',
      title: 'The 3-Step Voting Booth Procedure',
      description: 'Learn how candidate selection, sealed ballot review, and 4-digit PIN verification create a legally binding democratic ballot.',
      readTime: '4 min read'
    },
    {
      id: 'guide-3',
      category: 'security',
      categoryName: 'Security & Cryptography',
      title: 'Understanding Your SHA-256 Digital Ballot Receipt',
      description: 'A non-technical explanation of cryptographic receipts, public ledger verification, and how your vote remains strictly anonymous.',
      readTime: '5 min read'
    },
    {
      id: 'guide-4',
      category: 'troubleshooting',
      categoryName: 'Troubleshooting',
      title: 'What to Do If You Forget Your 4-Digit Security PIN',
      description: 'How to safely recover or update your balloting PIN through the voter security portal before election deadlines expire.',
      readTime: '2 min read'
    },
    {
      id: 'guide-5',
      category: 'security',
      categoryName: 'Security & Cryptography',
      title: 'Voter Privacy & The Zero-Knowledge Decoupling Model',
      description: 'How VoteSphere permanently severs your voter identification record from your cast choices to prevent coercion or tracking.',
      readTime: '6 min read'
    },
    {
      id: 'guide-6',
      category: 'voting',
      categoryName: 'Ballot Instructions',
      title: 'Comparing Candidate Manifestos Side-by-Side',
      description: 'How to use the candidate comparison drawer to review policy positions, priorities, and experience before casting your ballot.',
      readTime: '3 min read'
    }
  ];

  const filtered = articles.filter((a) => {
    const matchesTab = activeTab === 'all' || a.category === activeTab;
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
      {/* Header */}
      <section className="text-center space-y-4">
        <Badge variant="primary">Electoral Assistance</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          VoteSphere Help Center & Voter Guides
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Find walkthroughs, technical explanations, and civic resources to guide your participation.
        </p>

        <div className="max-w-xl mx-auto relative pt-2">
          <Input
            placeholder="Search guides (e.g. PIN, receipt, compare, booth)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 bg-white"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-5 pointer-events-none" />
        </div>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Guides' },
          { id: 'getting-started', label: 'Getting Started' },
          { id: 'voting', label: 'Ballot Instructions' },
          { id: 'security', label: 'Security & Hashes' },
          { id: 'troubleshooting', label: 'Troubleshooting' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.map((art) => (
          <Card key={art.id} className="p-6 bg-white hover:border-primary-300 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-primary-600">
                <span>{art.categoryName}</span>
                <span className="text-slate-400 font-normal">{art.readTime}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base leading-snug">{art.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{art.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary-600">
              <span className="hover:underline flex items-center">
                Read full article <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Contact Escalation Banner */}
      <Card className="p-8 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold">Need Live Civic Support?</h3>
          <p className="text-xs text-slate-300 max-w-md">
            Our civic staff is on standby during all voting hours to help resolve technical issues, verify eligibility, or explain balloting procedures.
          </p>
        </div>
        <Link to="/contact" className="shrink-0">
          <Button variant="primary" className="bg-primary-500 hover:bg-primary-600">
            <MessageSquare className="w-4 h-4 mr-2" /> Connect With Support
          </Button>
        </Link>
      </Card>
    </div>
  );
};
