"use client";

import { useBuild } from "@/context/BuildContext";

export function CompatibilityStrip() {
  const { issues, t } = useBuild();
  if (issues.length === 0) {
    return <p className="text-sm leading-relaxed text-chemical">{t("compat.ok")}</p>;
  }

  return (
    <div className="space-y-2">
      {issues.map((i) => (
        <div
          key={i.id}
          className={`flex gap-3 rounded-xl border p-3 backdrop-blur-md ${
            i.severity === "error"
              ? "border-lab-danger/45 bg-red-950/15"
              : "border-lab-amber/30 bg-zinc-950/50"
          }`}
        >
          <span className="font-mono text-lab-amber-glow" aria-hidden>
            {i.severity === "error" ? "!" : "—"}
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-200">
              {i.id === "socket-mismatch"
                ? t("compat.socketTitle")
                : i.id === "gpu-too-long"
                  ? t("compat.gpuTitle")
                  : ""}
            </p>
            <p className="text-xs text-zinc-500">
              {i.id === "socket-mismatch"
                ? t("compat.socketDetail", {
                    cpuName: String(i.params.cpuName),
                    cpuSocket: String(i.params.cpuSocket),
                    mbName: String(i.params.mbName),
                    mbSocket: String(i.params.mbSocket),
                  })
                : i.id === "gpu-too-long"
                  ? t("compat.gpuDetail", {
                      gpuName: String(i.params.gpuName),
                      gpuLen: i.params.gpuLen as number,
                      caseName: String(i.params.caseName),
                      clearance: i.params.clearance as number,
                    })
                  : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
