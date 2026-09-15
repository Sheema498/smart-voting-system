import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import { VotingProvider, useVoting } from '../context/VotingContext';

const TestVotingConsumer = () => {
  const { elections, candidates, castVote, hasVoted, getVotesForElection, voterReceipts } = useVoting();

  const activeElection = elections.find((e) => e.status === 'Active') || elections[0];
  const electionCandidates = candidates.filter((c) => c.electionId === activeElection?.id);
  const cand = electionCandidates[0];

  return (
    <div>
      <div data-testid="election-count">{elections.length}</div>
      <div data-testid="candidate-count">{candidates.length}</div>
      <div data-testid="voted-status">
        {activeElection && hasVoted(activeElection.id) ? 'voted' : 'not-voted'}
      </div>
      <button
        onClick={() => {
          if (!activeElection || !cand) return;
          const res = castVote({
            electionId: activeElection.id,
            candidateId: cand.id,
            pin: '1234'
          });
          document.getElementById('vote-result').textContent = res.success ? 'success' : res.error;
        }}
      >
        Cast Test Ballot
      </button>
      <span id="vote-result"></span>
      <div data-testid="receipts-count">{voterReceipts.length}</div>
    </div>
  );
};

describe('VotingContext Integration Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads elections and candidates into state', () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <VotingProvider>
            <TestVotingConsumer />
          </VotingProvider>
        </NotificationProvider>
      </AuthProvider>
    );

    const elCount = parseInt(screen.getByTestId('election-count').textContent, 10);
    expect(elCount).toBeGreaterThan(0);
    const candCount = parseInt(screen.getByTestId('candidate-count').textContent, 10);
    expect(candCount).toBeGreaterThan(0);
  });

  it('allows casting a ballot and generates cryptographic receipt', () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <VotingProvider>
            <TestVotingConsumer />
          </VotingProvider>
        </NotificationProvider>
      </AuthProvider>
    );

    const initialReceipts = parseInt(screen.getByTestId('receipts-count').textContent, 10);
    const btn = screen.getByText('Cast Test Ballot');

    act(() => {
      btn.click();
    });

    const res = document.getElementById('vote-result').textContent;
    expect(res).toBe('success');
    expect(screen.getByTestId('voted-status').textContent).toBe('voted');
    const newReceipts = parseInt(screen.getByTestId('receipts-count').textContent, 10);
    expect(newReceipts).toBeGreaterThanOrEqual(initialReceipts + 1);
  });

  it('prevents double voting in the same election contest', () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <VotingProvider>
            <TestVotingConsumer />
          </VotingProvider>
        </NotificationProvider>
      </AuthProvider>
    );

    const btn = screen.getByText('Cast Test Ballot');

    // First ballot cast
    act(() => {
      btn.click();
    });
    expect(document.getElementById('vote-result').textContent).toBe('success');

    // Second ballot cast attempt
    act(() => {
      btn.click();
    });
    expect(document.getElementById('vote-result').textContent).toContain('already cast');
  });
});
