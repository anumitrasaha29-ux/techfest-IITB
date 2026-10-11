/**
 * Cyborg Frontier - Frontend API Client Service
 * Connects React UI to the Express backend with seamless offline fallback.
 */

const API_BASE = '/api';

export interface ClinicalInquiryPayload {
  name: string;
  email: string;
  organization?: string;
  tier?: string;
  selectedFinish?: string;
  sensorColor?: string;
  notes?: string;
}

export interface ConceptGeneratePayload {
  domain: string;
  powerEfficiency: number;
  torque: number;
  latency: number;
  userPrompt?: string;
}

export interface ConceptProposalPayload {
  title: string;
  domain: string;
  description: string;
  torque: number;
  latency: number;
  compatibility: number;
  bomEstimate?: string;
  thermalOutput?: string;
  feasibility?: string;
}

export interface MechPresetPayload {
  name: string;
  materialPreset: 'titanium' | 'obsidian' | 'gold' | 'neon';
  explodedPercent: number;
  subsystems: {
    armorShell: boolean;
    gimbalRings: boolean;
    quantumCore: boolean;
    hydraulicPistons: boolean;
    coolingFins: boolean;
    particleOrbit: boolean;
  };
  wireframe: boolean;
}

export const CyborgApi = {
  // --- Task 1: Clinical Inquiries ---
  async submitInquiry(payload: ClinicalInquiryPayload) {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[API] Server unreachable for inquiry, operating in client fallback mode:', err);
      return {
        success: true,
        offline: true,
        data: {
          id: `inq-local-${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString(),
        },
      };
    }
  },

  async getInquiries() {
    try {
      const res = await fetch(`${API_BASE}/inquiries`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[API] Failed to fetch inquiries from server:', err);
      return { success: false, data: [] };
    }
  },

  // --- Task 4: AI Ideation Lab ---
  async generateAiConcept(payload: ConceptGeneratePayload) {
    try {
      const res = await fetch(`${API_BASE}/ideate/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API] AI endpoint unreachable, using client heuristic generator:', err);
      return {
        title: `${payload.domain} Mk.${Math.floor(Math.random() * 8) + 1}`,
        description: `Custom cybernetic configuration engineered for ${payload.powerEfficiency}% power efficiency and ${payload.torque} Nm torque profile.`,
        bomEstimate: `$${(Math.random() * 6000 + 10000).toFixed(0)} / Unit`,
        thermalOutput: `${(30 - payload.powerEfficiency * 0.15).toFixed(1)}W Nominal`,
        feasibility: `${Math.min(99, Math.floor(payload.powerEfficiency * 0.95 + 10))}% Feasibility Score`,
        rawAiGenerated: false,
      };
    }
  },

  async getConcepts() {
    try {
      const res = await fetch(`${API_BASE}/ideate/concepts`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API] Could not fetch concepts from server:', err);
      return null;
    }
  },

  async addConcept(payload: ConceptProposalPayload) {
    try {
      const res = await fetch(`${API_BASE}/ideate/concepts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API] Could not post concept to server:', err);
      return {
        id: `c-local-${Date.now()}`,
        ...payload,
        upvotes: 1,
        status: 'Proposed',
        createdAt: new Date().toISOString(),
      };
    }
  },

  async voteConcept(id: string) {
    try {
      const res = await fetch(`${API_BASE}/ideate/concepts/${id}/vote`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API] Upvote server call failed:', err);
      return null;
    }
  },

  // --- Task 2: 3D Mech Presets ---
  async saveMechPreset(payload: MechPresetPayload) {
    try {
      const res = await fetch(`${API_BASE}/mech/presets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[API] Could not persist mech preset to server:', err);
      return { success: false };
    }
  },

  async getMechPresets() {
    try {
      const res = await fetch(`${API_BASE}/mech/presets`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API] Could not load mech presets from server:', err);
      return [];
    }
  },

  // --- Live Telemetry & Stats ---
  async getLiveTelemetry() {
    try {
      const res = await fetch(`${API_BASE}/telemetry/live`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      return null;
    }
  },

  async getSystemStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      return null;
    }
  },
};
