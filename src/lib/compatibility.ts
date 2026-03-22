import type { BuildSelection, CatalogPart, GpuPart, CasePart, CpuPart, MotherboardPart, PsuPart } from "./types";

export type CompatibilityIssueId = "socket-mismatch" | "gpu-too-long";

export interface CompatibilityIssue {
  id: CompatibilityIssueId;
  severity: "error" | "warning";
  params: Record<string, string | number>;
}

function asCpu(p: CatalogPart | undefined): CpuPart | undefined {
  return p?.category === "cpu" ? p : undefined;
}

function asMb(p: CatalogPart | undefined): MotherboardPart | undefined {
  return p?.category === "motherboard" ? p : undefined;
}

function asGpu(p: CatalogPart | undefined): GpuPart | undefined {
  return p?.category === "gpu" ? p : undefined;
}

function asCase(p: CatalogPart | undefined): CasePart | undefined {
  return p?.category === "case" ? p : undefined;
}

function asPsu(p: CatalogPart | undefined): PsuPart | undefined {
  return p?.category === "psu" ? p : undefined;
}

export function getCompatibilityIssues(build: BuildSelection): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  const cpu = asCpu(build.cpu);
  const mb = asMb(build.motherboard);
  const gpu = asGpu(build.gpu);
  const pcCase = asCase(build.case);

  if (cpu && mb && cpu.socket !== mb.socket) {
    issues.push({
      id: "socket-mismatch",
      severity: "error",
      params: {
        cpuName: cpu.name,
        cpuSocket: cpu.socket,
        mbName: mb.name,
        mbSocket: mb.socket,
      },
    });
  }

  if (gpu && pcCase && gpu.lengthMm > pcCase.gpuClearanceMm) {
    issues.push({
      id: "gpu-too-long",
      severity: "error",
      params: {
        gpuName: gpu.name,
        gpuLen: gpu.lengthMm,
        caseName: pcCase.name,
        clearance: pcCase.gpuClearanceMm,
      },
    });
  }

  return issues;
}

export interface PsuAdvice {
  ok: boolean;
  gpuWatts: number;
  psuWatts: number;
}

export function getPsuAdvice(build: BuildSelection): PsuAdvice | null {
  const gpu = asGpu(build.gpu);
  const psu = asPsu(build.psu);
  if (!gpu || !psu) return null;
  const ok = psu.wattage >= gpu.recommendedPsuWatts;
  return {
    ok,
    gpuWatts: gpu.recommendedPsuWatts,
    psuWatts: psu.wattage,
  };
}
