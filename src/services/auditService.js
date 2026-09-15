import { mockAuditLogs } from '../data/mockAuditLogs';
import { sha256 } from '../utils/cryptoHash';

const AUDIT_STORAGE_KEY = 'votesphere_audit_logs';

export class AuditService {
  static getLogs() {
    try {
      const stored = localStorage.getItem(AUDIT_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse audit logs from storage', e);
    }
    // Initialize with mock audit logs
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(mockAuditLogs));
    return mockAuditLogs;
  }

  static async logEvent({ action, actor = 'System Automated Service', severity = 'info', details = {}, status = 'Verified' }) {
    const logs = this.getLogs();
    const prevEntry = logs[0] || {};
    const prevHash = prevEntry.hash || '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();

    const payloadString = `${timestamp}|${action}|${actor}|${JSON.stringify(details)}|${prevHash}`;
    const hash = await sha256(payloadString);

    const newEntry = {
      id: `LOG-2026-${String(logs.length + 1).padStart(4, '0')}`,
      timestamp,
      action,
      actor,
      severity,
      status,
      details,
      prevHash,
      hash
    };

    const updated = [newEntry, ...logs];
    try {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save audit log', e);
    }

    return newEntry;
  }

  static filterLogs({ query = '', severity = '', actionType = '' }) {
    const logs = this.getLogs();
    return logs.filter(log => {
      if (severity && severity !== 'all' && log.severity.toLowerCase() !== severity.toLowerCase()) {
        return false;
      }
      if (actionType && actionType !== 'all' && !log.action.toLowerCase().includes(actionType.toLowerCase())) {
        return false;
      }
      if (query) {
        const q = query.toLowerCase();
        const matchesAction = log.action.toLowerCase().includes(q);
        const matchesActor = log.actor.toLowerCase().includes(q);
        const matchesHash = (log.hash || '').toLowerCase().includes(q);
        const matchesId = log.id.toLowerCase().includes(q);
        if (!matchesAction && !matchesActor && !matchesHash && !matchesId) {
          return false;
        }
      }
      return true;
    });
  }

  static clearLogs() {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(mockAuditLogs));
    return mockAuditLogs;
  }
}
