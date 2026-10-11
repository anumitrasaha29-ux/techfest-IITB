import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Box, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Layers, 
  Sliders, 
  Eye, 
  Download, 
  Cpu, 
  Camera, 
  SunMedium, 
  Code,
  Shield,
  Zap,
  CheckCircle2,
  Play,
  Pause
} from 'lucide-react';

interface Task2Props {
  onOpenCodeView?: () => void;
}

interface ComponentNode {
  id: string;
  name: string;
  category: string;
  meshGroup: THREE.Group;
  initialPos: THREE.Vector3;
  explodedOffset: THREE.Vector3;
  enabled: boolean;
}

export const Task2BuildIn3D: React.FC<Task2Props> = ({ onOpenCodeView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Scene state
  const [wireframe, setWireframe] = useState(false);
  const [explodedPercent, setExplodedPercent] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeMaterialPreset, setActiveMaterialPreset] = useState<'titanium' | 'obsidian' | 'gold' | 'neon'>('titanium');
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('Core Reactor');
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  // Subsystems toggleable in the 3D build
  const [enabledParts, setEnabledParts] = useState({
    armorShell: true,
    gimbalRings: true,
    quantumCore: true,
    hydraulicPistons: true,
    coolingFins: true,
    particleOrbit: true
  });

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const componentsRef = useRef<ComponentNode[]>([]);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const gimbalGroupRef = useRef<THREE.Group | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const mouseState = useRef({ isDown: false, startX: 0, startY: 0, rotX: 0.3, rotY: 0.6, targetRotX: 0.3, targetRotY: 0.6, zoom: 6.5, targetZoom: 6.5 });

  // Material palette
  const materials = {
    titanium: {
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x0f172a,
      coreEmissive: 0xf59e0b
    },
    obsidian: {
      color: 0x18181b,
      metalness: 0.6,
      roughness: 0.35,
      emissive: 0x09090b,
      coreEmissive: 0x06b6d4
    },
    gold: {
      color: 0xfbbf24,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x451a03,
      coreEmissive: 0xf59e0b
    },
    neon: {
      color: 0x0284c7,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x0369a1,
      coreEmissive: 0x38bdf8
    }
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080e);
    scene.fog = new THREE.FogExp2(0x06080e, 0.08);
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 550;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, mouseState.current.zoom);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // 4. Lighting setup (3-point studio lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf59e0b, 2.5, 12);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // 5. Build 3D Cybernetic Assembler Architecture
    const masterAssembly = new THREE.Group();
    scene.add(masterAssembly);

    const compList: ComponentNode[] = [];

    // Helper material generator
    const createPBRMaterial = () => {
      const matConfig = materials[activeMaterialPreset];
      return new THREE.MeshStandardMaterial({
        color: matConfig.color,
        metalness: matConfig.metalness,
        roughness: matConfig.roughness,
        wireframe: wireframe
      });
    };

    // Subsystem 1: Quantum Core Reactor
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      emissive: materials[activeMaterialPreset].coreEmissive,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: wireframe
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMeshRef.current = coreMesh;
    coreGroup.add(coreMesh);

    // Core energy field aura
    const auraGeo = new THREE.SphereGeometry(0.95, 24, 24);
    const auraMat = new THREE.MeshBasicMaterial({
      color: materials[activeMaterialPreset].coreEmissive,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    coreGroup.add(auraMesh);

    masterAssembly.add(coreGroup);
    compList.push({
      id: 'quantumCore',
      name: 'Quantum Reactor Core',
      category: 'Primary Power Generation',
      meshGroup: coreGroup,
      initialPos: new THREE.Vector3(0, 0, 0),
      explodedOffset: new THREE.Vector3(0, 0, 0),
      enabled: enabledParts.quantumCore
    });

    // Subsystem 2: Dual Concentric Gimbal Rings
    const gimbalGroup = new THREE.Group();
    gimbalGroupRef.current = gimbalGroup;

    // Ring 1 (Inner)
    const ring1Geo = new THREE.TorusGeometry(1.3, 0.05, 16, 64);
    const ring1Mat = createPBRMaterial();
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    gimbalGroup.add(ring1);

    // Ring 2 (Outer)
    const ring2Geo = new THREE.TorusGeometry(1.65, 0.06, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ring1Mat);
    ring2.rotation.x = Math.PI / 3;
    gimbalGroup.add(ring2);

    masterAssembly.add(gimbalGroup);
    compList.push({
      id: 'gimbalRings',
      name: 'Concentric Gyro Gimbals',
      category: 'Spatial Stabilization Array',
      meshGroup: gimbalGroup,
      initialPos: new THREE.Vector3(0, 0, 0),
      explodedOffset: new THREE.Vector3(0, 1.8, 0),
      enabled: enabledParts.gimbalRings
    });

    // Subsystem 3: Articulating Hydraulic Piston Rods (4 quadrant nodes)
    const hydraulicGroup = new THREE.Group();
    const pistonMat = createPBRMaterial();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const pistonPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.4, 16), pistonMat);
      pistonPillar.position.set(Math.cos(angle) * 1.8, 0, Math.sin(angle) * 1.8);
      
      const headCap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 16), pistonMat);
      headCap.position.set(Math.cos(angle) * 1.8, 0.7, Math.sin(angle) * 1.8);
      
      hydraulicGroup.add(pistonPillar);
      hydraulicGroup.add(headCap);
    }
    masterAssembly.add(hydraulicGroup);
    compList.push({
      id: 'hydraulicPistons',
      name: 'Quad Hydraulic Servos',
      category: 'Kinetic Articulation',
      meshGroup: hydraulicGroup,
      initialPos: new THREE.Vector3(0, 0, 0),
      explodedOffset: new THREE.Vector3(0, 0, 1.5),
      enabled: enabledParts.hydraulicPistons
    });

    // Subsystem 4: Peripheral Armor Shell Brackets (Front & Rear Shells)
    const armorGroup = new THREE.Group();
    const armorMat = createPBRMaterial();
    
    // Top Plate
    const topPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.1, 0.25, 6), armorMat);
    topPlate.position.set(0, 1.2, 0);
    armorGroup.add(topPlate);

    // Bottom Plate
    const bottomPlate = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 1.9, 0.25, 6), armorMat);
    bottomPlate.position.set(0, -1.2, 0);
    armorGroup.add(bottomPlate);

    masterAssembly.add(armorGroup);
    compList.push({
      id: 'armorShell',
      name: 'Titanium Shell Brackets',
      category: 'Structural Ballistic Armor',
      meshGroup: armorGroup,
      initialPos: new THREE.Vector3(0, 0, 0),
      explodedOffset: new THREE.Vector3(0, 2.2, 0),
      enabled: enabledParts.armorShell
    });

    // Subsystem 5: Cooling Radiator Fins (Lateral)
    const coolingGroup = new THREE.Group();
    const finMat = createPBRMaterial();
    for (let f = -3; f <= 3; f++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 1.2), finMat);
      fin.position.set(-1.8, f * 0.2, 0);
      coolingGroup.add(fin);

      const finR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 1.2), finMat);
      finR.position.set(1.8, f * 0.2, 0);
      coolingGroup.add(finR);
    }
    masterAssembly.add(coolingGroup);
    compList.push({
      id: 'coolingFins',
      name: 'Microfluidic Radiator Fins',
      category: 'Thermal Regulation Matrix',
      meshGroup: coolingGroup,
      initialPos: new THREE.Vector3(0, 0, 0),
      explodedOffset: new THREE.Vector3(2.0, 0, 0),
      enabled: enabledParts.coolingFins
    });

    // Subsystem 6: Orbiting Quantum Particles
    const particleCount = 450;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const radius = 1.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions[p * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[p * 3 + 1] = radius * Math.sin(phi);
      particlePositions[p * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: materials[activeMaterialPreset].coreEmissive,
      size: 0.04,
      transparent: true,
      opacity: 0.8
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMat);
    particleSystemRef.current = particleSystem;
    masterAssembly.add(particleSystem);

    componentsRef.current = compList;

    // Ground holographic laser alignment grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x334155, 0x1e293b);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // 6. Interaction events (Mouse Orbit / Drag)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const onMouseDown = (e: MouseEvent) => {
      mouseState.current.isDown = true;
      mouseState.current.startX = e.clientX;
      mouseState.current.startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseState.current.isDown) return;
      const deltaX = e.clientX - mouseState.current.startX;
      const deltaY = e.clientY - mouseState.current.startY;
      mouseState.current.startX = e.clientX;
      mouseState.current.startY = e.clientY;

      mouseState.current.targetRotY += deltaX * 0.008;
      mouseState.current.targetRotX = Math.max(-1.2, Math.min(1.2, mouseState.current.targetRotX + deltaY * 0.008));
    };

    const onMouseUp = () => {
      mouseState.current.isDown = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      mouseState.current.targetZoom = Math.max(3.5, Math.min(11, mouseState.current.targetZoom + e.deltaY * 0.005));
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 550;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera damping
      mouseState.current.rotX += (mouseState.current.targetRotX - mouseState.current.rotX) * 0.08;
      mouseState.current.rotY += (mouseState.current.targetRotY - mouseState.current.rotY) * 0.08;
      mouseState.current.zoom += (mouseState.current.targetZoom - mouseState.current.zoom) * 0.08;

      if (autoRotate && !mouseState.current.isDown) {
        mouseState.current.targetRotY += delta * 0.35;
      }

      // Position camera around origin
      const dist = mouseState.current.zoom;
      const cx = dist * Math.sin(mouseState.current.rotY) * Math.cos(mouseState.current.rotX);
      const cy = dist * Math.sin(mouseState.current.rotX);
      const cz = dist * Math.cos(mouseState.current.rotY) * Math.cos(mouseState.current.rotX);

      camera.position.set(cx, cy, cz);
      camera.lookAt(0, 0, 0);

      // Micro internal rotations
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.x += delta * 0.6;
        coreMeshRef.current.rotation.y += delta * 0.9;
      }
      if (gimbalGroupRef.current) {
        gimbalGroupRef.current.children[0].rotation.z += delta * 0.4;
        gimbalGroupRef.current.children[1].rotation.x += delta * 0.5;
      }
      if (particleSystemRef.current) {
        particleSystemRef.current.rotation.y += delta * 0.2;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  }, []);

  // Update exploded view positions dynamically
  useEffect(() => {
    const factor = explodedPercent / 100;
    componentsRef.current.forEach((comp) => {
      const targetPos = comp.initialPos.clone().add(comp.explodedOffset.clone().multiplyScalar(factor));
      comp.meshGroup.position.copy(targetPos);
    });
  }, [explodedPercent]);

  // Update part visibility
  useEffect(() => {
    componentsRef.current.forEach((comp) => {
      const isVisible = enabledParts[comp.id as keyof typeof enabledParts] ?? true;
      comp.meshGroup.visible = isVisible;
    });
  }, [enabledParts]);

  // Update Wireframe & Material Shaders
  useEffect(() => {
    if (!sceneRef.current) return;
    const matConfig = materials[activeMaterialPreset];

    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.wireframe = wireframe;
          if (child === coreMeshRef.current) {
            child.material.emissive.setHex(matConfig.coreEmissive);
          } else {
            child.material.color.setHex(matConfig.color);
            child.material.metalness = matConfig.metalness;
            child.material.roughness = matConfig.roughness;
          }
          child.material.needsUpdate = true;
        }
      }
      if (child instanceof THREE.Points && child.material instanceof THREE.PointsMaterial) {
        child.material.color.setHex(matConfig.coreEmissive);
        child.material.needsUpdate = true;
      }
    });
  }, [wireframe, activeMaterialPreset]);

  // Snapshot capture handler
  const handleCaptureSnapshot = () => {
    if (!rendererRef.current) return;
    setSnapshotTaken(true);
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `cyborg-3d-build-${activeMaterialPreset}.png`;
    link.href = dataUrl;
    link.click();
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  // Preset Camera Angles
  const setCameraPreset = (view: 'iso' | 'front' | 'top' | 'core') => {
    if (view === 'iso') {
      mouseState.current.targetRotX = 0.35;
      mouseState.current.targetRotY = 0.65;
      mouseState.current.targetZoom = 6.5;
    } else if (view === 'front') {
      mouseState.current.targetRotX = 0.0;
      mouseState.current.targetRotY = 0.0;
      mouseState.current.targetZoom = 6.0;
    } else if (view === 'top') {
      mouseState.current.targetRotX = 1.45;
      mouseState.current.targetRotY = 0.0;
      mouseState.current.targetZoom = 6.2;
    } else if (view === 'core') {
      mouseState.current.targetRotX = 0.2;
      mouseState.current.targetRotY = 0.4;
      mouseState.current.targetZoom = 4.0;
    }
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col">
      {/* Task Demonstration Header Bar */}
      <div className="bg-[#0b0e18] border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-cyan-400 uppercase tracking-wider font-mono">Task 2</span>
          <span className="hidden sm:inline text-slate-600">/</span>
          <span className="text-slate-300 font-medium">Build in 3D: Cybernetic Sub-Assembly Constructor</span>
        </div>
        <div className="flex items-center gap-3">
          {onOpenCodeView && (
            <button
              onClick={onOpenCodeView}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Task 2 Code</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 3D Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Left Side: 3D Viewport with HUD */}
        <div ref={containerRef} className="flex-1 relative min-h-[500px] lg:min-h-full bg-[#06080e] overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

          {/* Floating Top HUD: Diagnostics & Camera Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="p-3 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800/90 pointer-events-auto shadow-lg text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-cyan-300 uppercase tracking-wider font-semibold">WebGL 2.0 Renderer</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                Mesh Nodes: 18 · Shaders: Standard PBR · Orbit: Active
              </div>
            </div>

            {/* Quick Camera Presets */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800/90 pointer-events-auto">
              <button
                onClick={() => setCameraPreset('iso')}
                className="px-2.5 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Isometric View"
              >
                Isometric
              </button>
              <button
                onClick={() => setCameraPreset('front')}
                className="px-2.5 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Front Ortho View"
              >
                Front
              </button>
              <button
                onClick={() => setCameraPreset('top')}
                className="px-2.5 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Top Plan View"
              >
                Top
              </button>
              <button
                onClick={() => setCameraPreset('core')}
                className="px-2.5 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Reactor Zoom"
              >
                Reactor Close-up
              </button>
            </div>
          </div>

          {/* Bottom Floating Control Strip */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            {/* Rotation and Wireframe HUD */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800/90 pointer-events-auto">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                  autoRotate ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Auto-Spin</span>
              </button>

              <button
                onClick={() => setWireframe(!wireframe)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                  wireframe ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Wireframe CAD</span>
              </button>

              <button
                onClick={handleCaptureSnapshot}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Capture 3D Render"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{snapshotTaken ? 'Saved!' : 'Snapshot'}</span>
              </button>
            </div>

            {/* Exploded View Slider Pill */}
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800/90 pointer-events-auto text-xs">
              <span className="font-mono text-slate-400">EXPLODE:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={explodedPercent}
                onChange={(e) => setExplodedPercent(Number(e.target.value))}
                className="w-28 sm:w-36 accent-cyan-400 cursor-pointer"
              />
              <span className="font-mono text-cyan-400 font-bold tabular-nums w-10 text-right">{explodedPercent}%</span>
            </div>
          </div>
        </div>

        {/* Right Side: Builder & Inspector Control Center */}
        <div className="w-full lg:w-96 bg-[#090d16] border-t lg:border-t-0 lg:border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Box className="w-4 h-4 text-cyan-400" />
                <span>Modular 3D Assembly</span>
              </div>
              <h2 className="text-xl font-bold font-display uppercase tracking-tight text-white">
                Cyborg Core Constructor
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Add, detach, and inspect individual mechanical subsystems in true 3D spatial coordinates.
              </p>
            </div>

            {/* Material Presets */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                PBR Surface Metallurgy
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['titanium', 'obsidian', 'gold', 'neon'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setActiveMaterialPreset(preset)}
                    className={`py-2 px-3 rounded border text-left capitalize transition-colors cursor-pointer ${
                      activeMaterialPreset === preset
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 font-semibold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {preset === 'titanium' && 'Titanium Alloy'}
                    {preset === 'obsidian' && 'Obsidian Matrix'}
                    {preset === 'gold' && 'Electrum Gold'}
                    {preset === 'neon' && 'Quantum Cyan'}
                  </button>
                ))}
              </div>
            </div>

            {/* Modular Subsystem Builder Toggles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-mono text-slate-300 uppercase tracking-wider">
                  Assemble Sub-Components
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {Object.values(enabledParts).filter(Boolean).length}/6 Active
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'quantumCore', label: 'Quantum Reactor Core', desc: 'Central nuclear-plasma fusion battery' },
                  { id: 'gimbalRings', label: 'Concentric Gyro Gimbals', desc: 'Dual-axis inertia dampener' },
                  { id: 'hydraulicPistons', label: 'Hydraulic Piston Columns', desc: 'Quad-vector shock absorb mounts' },
                  { id: 'armorShell', label: 'Titanium Shell Brackets', desc: 'Hexagonal ballistic enclosure' },
                  { id: 'coolingFins', label: 'Microfluidic Radiator Fins', desc: 'Coolant heat siphoning fins' },
                  { id: 'particleOrbit', label: 'Orbital Flux Stream', desc: 'Quantum containment energy particles' },
                ].map((part) => {
                  const isChecked = enabledParts[part.id as keyof typeof enabledParts];
                  return (
                    <div
                      key={part.id}
                      onClick={() => {
                        setEnabledParts((prev) => ({
                          ...prev,
                          [part.id]: !prev[part.id as keyof typeof enabledParts]
                        }));
                        setSelectedSubsystem(part.label);
                      }}
                      className={`p-2.5 rounded border text-xs cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                        isChecked 
                          ? 'border-slate-700 bg-slate-900/80 text-white' 
                          : 'border-slate-800/60 bg-slate-950/40 text-slate-500 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-200">{part.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{part.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center ${
                        isChecked ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-slate-700'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Component Spec Panel */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="text-[11px] font-mono text-cyan-400 uppercase">Subsystem Telemetry</div>
              <div className="font-bold text-white text-sm">{selectedSubsystem}</div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 font-mono text-[11px]">
                <div>
                  <span className="text-slate-500 block">Status:</span>
                  <span className="text-emerald-400">Integrated</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Efficiency:</span>
                  <span className="text-slate-200">98.4%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tolerance:</span>
                  <span className="text-slate-200">±0.002 mm</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Heat Sink:</span>
                  <span className="text-cyan-400">Active Liquid</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleCaptureSnapshot}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export 3D Blueprint Snapshot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
