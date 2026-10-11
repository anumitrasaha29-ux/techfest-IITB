import { GoogleGenAI } from '@google/genai';
import { config } from '../config';

export interface ConceptGenerationInput {
  domain: string;
  powerEfficiency: number;
  torque: number;
  latency: number;
  userPrompt?: string;
}

export interface GeneratedConceptResult {
  title: string;
  description: string;
  bomEstimate: string;
  thermalOutput: string;
  feasibility: string;
  subsystems: string[];
  rawAiGenerated: boolean;
}

export class GeminiService {
  private client: GoogleGenAI | null = null;

  constructor() {
    if (config.geminiApiKey) {
      try {
        this.client = new GoogleGenAI({ apiKey: config.geminiApiKey });
      } catch (err) {
        console.warn('[GeminiService] Initialization warning:', err);
      }
    } else {
      console.warn('[GeminiService] No GEMINI_API_KEY found in environment. Heuristic cybernetic engine active.');
    }
  }

  async generateConcept(input: ConceptGenerationInput): Promise<GeneratedConceptResult> {
    const { domain, powerEfficiency, torque, latency, userPrompt } = input;

    if (this.client && config.geminiApiKey) {
      try {
        const prompt = `
You are the Chief Cybernetics Engineer at Cyborg Frontier Aerospace & Bio-Mechanics Lab.
Generate a realistic, cutting-edge cybernetic engineering blueprint concept based on these parameters:
- Domain: ${domain}
- Desired Power Efficiency: ${powerEfficiency}%
- Torque Requirement: ${torque} Nm
- Signal Latency Target: ${latency} ms
${userPrompt ? `- Custom Specification: "${userPrompt}"` : ''}

Respond with ONLY a valid JSON object (no markdown code fence, no additional commentary) matching this exact schema:
{
  "title": "A precise, badass scientific/cybernetic concept name (e.g., Adaptive Bio-Mimetic Forearm Mk.VII)",
  "description": "2-3 sentences explaining the biomechanical physics, neural integration, and materials used.",
  "bomEstimate": "$XX,XXX / Unit (realistic BOM cost estimate)",
  "thermalOutput": "XX.X W Nominal (calculated thermal dissipation)",
  "feasibility": "XX% (clinical or aerospace feasibility score)",
  "subsystems": ["Subsystem 1", "Subsystem 2", "Subsystem 3", "Subsystem 4"]
}
`;

        const response = await this.client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text?.trim();
        if (text) {
          const parsed = JSON.parse(text);
          return {
            title: parsed.title || `${domain} Architecture Mk.IX`,
            description: parsed.description || 'High-specification biomechanical cybernetic assembly.',
            bomEstimate: parsed.bomEstimate || `$${(Math.random() * 5000 + 12000).toFixed(0)} / Unit`,
            thermalOutput: parsed.thermalOutput || `${(25 - (powerEfficiency * 0.12)).toFixed(1)}W Nominal`,
            feasibility: parsed.feasibility || `${Math.min(99, Math.floor(powerEfficiency * 0.9 + 10))}% Feasibility Score`,
            subsystems: Array.isArray(parsed.subsystems) ? parsed.subsystems : ['Neural Bus', 'Actuator Array', 'Titanium Lattice'],
            rawAiGenerated: true,
          };
        }
      } catch (error) {
        console.warn('[GeminiService] API call failed or timed out. Falling back to internal engine:', error);
      }
    }

    // High-fidelity heuristic cybernetic engineering fallback generator
    return this.generateHeuristicConcept(input);
  }

  private generateHeuristicConcept(input: ConceptGenerationInput): GeneratedConceptResult {
    const { domain, powerEfficiency, torque, latency } = input;
    const markNumber = Math.floor(Math.random() * 9) + 1;
    
    const domainPrefixes: Record<string, string[]> = {
      'Bionic Prosthetics': ['Neuro-Myoelectric', 'Adaptive Bio-Mimetic', 'Carbon-Synaptic', 'Direct Motor Cortex'],
      'Exoskeleton Mobility': ['High-Torque Pneumatic', 'Hydraulic Kinetic', 'Lattice Kinetic', 'Piezo-Strut'],
      'Sensory Augmentation': ['Quantum Retinal', 'Micro-LiDAR Cornea', 'Auditory Cochlear Matrix', 'Tactile Epidermal'],
      'Structural Reinforcement': ['Sub-Dermal Honeycomb', 'Titanium-Osseous', 'Diamond-Lattice', 'Graphene Mesh'],
    };

    const prefixes = domainPrefixes[domain] || ['Autonomous Cybernetic', 'High-Frequency', 'Solid-State'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const title = `${prefix} Unit Mk.${markNumber}`;

    const calculatedBom = Math.floor(8000 + (torque * 15) + (powerEfficiency * 60) - (latency * 1000));
    const calculatedThermal = Math.max(4.5, (32 - (powerEfficiency * 0.18) + (torque * 0.015))).toFixed(1);
    const calculatedFeasibility = Math.min(99, Math.max(75, Math.floor((powerEfficiency * 0.8) + (100 - latency * 10) * 0.2)));

    const subsystems = [
      'Dual-Phase Cryo Cooling Fin',
      'Hermetic Titanium-Carbide Enclosure',
      'Solid-State Neural Transducer (0.02ms latency)',
      'Brushless Torque Vectoring Core',
    ];

    return {
      title,
      description: `Engineered for ${domain.toLowerCase()} with a target of ${powerEfficiency}% power efficiency and ${torque} Nm continuous torque profile. Features zero-backlash harmonic gearing with active neural sensory dampening.`,
      bomEstimate: `$${calculatedBom.toLocaleString()} / Unit`,
      thermalOutput: `${calculatedThermal}W Nominal`,
      feasibility: `${calculatedFeasibility}% Clinical Readiness`,
      subsystems,
      rawAiGenerated: false,
    };
  }
}

export const geminiService = new GeminiService();
