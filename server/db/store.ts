import fs from 'fs';
import path from 'path';
import { config } from '../config';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  tier: string;
  selectedFinish?: string;
  sensorColor?: string;
  notes?: string;
  createdAt: string;
}

export interface MechPreset {
  id: string;
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
  createdAt: string;
}

export interface IdeatedConcept {
  id: string;
  title: string;
  domain: string;
  description: string;
  torque: number;
  latency: number;
  compatibility: number;
  upvotes: number;
  status: 'Proposed' | 'Under Review' | 'Prototyped';
  createdAt: string;
  bomEstimate?: string;
  thermalOutput?: string;
  feasibility?: string;
}

interface DatabaseSchema {
  inquiries: Inquiry[];
  mechPresets: MechPreset[];
  concepts: IdeatedConcept[];
  telemetryLogs: {
    timestamp: string;
    neuralSync: number;
    coreTemp: number;
    hydraulicPressure: number;
    activeMode: string;
  }[];
}

class JsonStore {
  private filePath: string;
  private data: DatabaseSchema;

  constructor() {
    this.filePath = path.join(config.dataDir, 'cyborg-frontier-data.json');
    this.data = this.loadData();
  }

  private ensureDir() {
    if (!fs.existsSync(config.dataDir)) {
      fs.mkdirSync(config.dataDir, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    this.ensureDir();

    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.warn('[DB] Failed to read existing database file, initializing defaults:', err);
      }
    }

    const defaultData: DatabaseSchema = {
      inquiries: [
        {
          id: 'inq-seed-1',
          name: 'Dr. Evelyn Vance',
          email: 'e.vance@neurotech-inst.org',
          organization: 'Apex Neurosciences Institute',
          tier: 'Clinical Research',
          selectedFinish: 'titanium',
          sensorColor: 'amber',
          notes: 'Evaluating bio-mimetic motor integration for clinical human trials.',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
      ],
      mechPresets: [
        {
          id: 'preset-titan-mk1',
          name: 'Standard Titanium Vanguard',
          materialPreset: 'titanium',
          explodedPercent: 25,
          subsystems: {
            armorShell: true,
            gimbalRings: true,
            quantumCore: true,
            hydraulicPistons: true,
            coolingFins: true,
            particleOrbit: true,
          },
          wireframe: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'preset-stealth-core',
          name: 'Obsidian Deep Recon',
          materialPreset: 'obsidian',
          explodedPercent: 0,
          subsystems: {
            armorShell: true,
            gimbalRings: true,
            quantumCore: true,
            hydraulicPistons: false,
            coolingFins: true,
            particleOrbit: false,
          },
          wireframe: false,
          createdAt: new Date().toISOString(),
        },
      ],
      concepts: [
        {
          id: 'c1',
          title: 'Kinetic Footfall Energy Harvester',
          domain: 'Exoskeleton Mobility',
          description: 'Piezoelectric crystalline plates embedded inside ankle shock-absorbers that recharge auxiliary battery cells with every stride.',
          torque: 420,
          latency: 0.18,
          compatibility: 99,
          upvotes: 42,
          status: 'Prototyped',
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          bomEstimate: '$8,400 / Unit',
          thermalOutput: '12W Nominal',
          feasibility: '98% Ready for Production',
        },
        {
          id: 'c2',
          title: 'Retinal Micro-OLED HUD Matrix',
          domain: 'Sensory Augmentation',
          description: 'Ultra-thin transparent cornea contact lens projecting real-time LiDAR distance vectors and thermal heat gradients directly to the retina.',
          torque: 0,
          latency: 0.05,
          compatibility: 96,
          upvotes: 38,
          status: 'Under Review',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          bomEstimate: '$4,150 / Unit',
          thermalOutput: '1.2W Nominal',
          feasibility: '91% Clinical Testing',
        },
        {
          id: 'c3',
          title: 'Sub-Dermal Titanium Rib Protector',
          domain: 'Structural Reinforcement',
          description: 'Honeycomb titanium lattice interlaced between biological ribs to deflect ballistic and high-g acceleration shocks.',
          torque: 600,
          latency: 0.1,
          compatibility: 98,
          upvotes: 29,
          status: 'Proposed',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          bomEstimate: '$19,500 / Unit',
          thermalOutput: '0W Passive',
          feasibility: '94% Structural Compliance',
        },
      ],
      telemetryLogs: [
        {
          timestamp: new Date().toISOString(),
          neuralSync: 99.4,
          coreTemp: 41.2,
          hydraulicPressure: 310,
          activeMode: 'COMBAT_READINESS',
        },
      ],
    };

    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(data: DatabaseSchema) {
    this.ensureDir();
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] Failed to save database file:', err);
    }
  }

  // --- Inquiries ---
  getInquiries(): Inquiry[] {
    return this.data.inquiries;
  }

  addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.inquiries.unshift(newInquiry);
    this.saveData(this.data);
    return newInquiry;
  }

  // --- Mech Presets ---
  getMechPresets(): MechPreset[] {
    return this.data.mechPresets;
  }

  saveMechPreset(preset: Omit<MechPreset, 'id' | 'createdAt'>): MechPreset {
    const newPreset: MechPreset = {
      ...preset,
      id: `preset-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.mechPresets.unshift(newPreset);
    this.saveData(this.data);
    return newPreset;
  }

  // --- Concepts ---
  getConcepts(): IdeatedConcept[] {
    return this.data.concepts;
  }

  addConcept(concept: Omit<IdeatedConcept, 'id' | 'createdAt' | 'upvotes'>): IdeatedConcept {
    const newConcept: IdeatedConcept = {
      ...concept,
      id: `c-${Date.now()}`,
      upvotes: 1,
      createdAt: new Date().toISOString(),
    };
    this.data.concepts.unshift(newConcept);
    this.saveData(this.data);
    return newConcept;
  }

  voteConcept(id: string): IdeatedConcept | null {
    const target = this.data.concepts.find((c) => c.id === id);
    if (!target) return null;
    target.upvotes += 1;
    this.saveData(this.data);
    return target;
  }

  // --- Telemetry Log ---
  recordTelemetry(telemetry: DatabaseSchema['telemetryLogs'][0]) {
    this.data.telemetryLogs.unshift(telemetry);
    if (this.data.telemetryLogs.length > 50) {
      this.data.telemetryLogs.pop();
    }
    this.saveData(this.data);
  }

  getRecentTelemetry() {
    return this.data.telemetryLogs.slice(0, 10);
  }
}

export const db = new JsonStore();
