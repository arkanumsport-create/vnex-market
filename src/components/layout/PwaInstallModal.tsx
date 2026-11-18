"use client";

import React, { useEffect, useState } from "react";
import { X, Download, Smartphone, CheckCircle2, Share, PlusSquare, Monitor } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { assetUrl } from "@/lib/config";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaBadgeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <path d="M12 18h.01" />
      <path d="M12 7v6" />
      <path d="m9.5 10.5 2.5 2.5 2.5-2.5" />
    </svg>
  );
}

export function PwaInstallModal() {
  const { locale, isPwaModalOpen, setPwaModalOpen } = useStore();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register(assetUrl("/sw.js")).catch(() => {
        // Ignore service worker registration errors in dev
      });
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (!isPwaModalOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={() => setPwaModalOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg border border-[#38bdf8]/45 bg-[#121622] text-[#f3f0e9] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.92)] animate-modal-rise"
      >
        {/* Top Bar with VNex Market in Blue + online store + Close X */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#0b1220] border-b border-[#38bdf8]/30">
          <div className="flex items-center gap-3">
            <img
              src={assetUrl("/logo/vnex-logo.jpg")}
              alt="VNex Market"
              className="w-10 h-10 rounded-full object-cover border border-[#38bdf8]"
            />
            <div>
              <span className="block font-serif-luxury text-lg font-extrabold text-[#38bdf8] leading-none">
                VNex Market
              </span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-[#cbd5e1] mt-1">
                online store • PWA
              </span>
            </div>
          </div>

          <button
            onClick={() => setPwaModalOpen(false)}
            aria-label="Cerrar"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff1f32] text-white border border-white/20 grid place-items-center transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0b1220] border border-[#38bdf8]/30">
            <img
              src={assetUrl("/logo/vnex-logo.jpg")}
              alt="VNex Market App Icon"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.3)] shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8] text-[#38bdf8] text-[10px] font-extrabold uppercase tracking-widest">
                <PwaBadgeIcon className="w-3 h-3" />
                <span>PWA • Web App Oficial</span>
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-white mt-1.5">
                {locale === "es"
                  ? "Aplicación Web VNex Market"
                  : "VNex Market Web Application"}
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                {locale === "es"
                  ? "Instala nuestra tienda directamente en la pantalla de inicio de tu teléfono o computadora."
                  : "Install our store directly on your phone or computer home screen."}
              </p>
            </div>
          </div>

          {/* Direct Install Button if supported by browser */}
          {installed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {locale === "es"
                  ? "¡Aplicación Web instalada correctamente!"
                  : "Web Application successfully installed!"}
              </span>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-5 rounded-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#08101f] font-extrabold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(56,189,248,0.4)] transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {locale === "es"
                  ? "INSTALAR APLICACIÓN WEB (PWA)"
                  : "INSTALL WEB APPLICATION (PWA)"}
              </span>
            </button>
          )}

          {/* Step-by-Step Guide for Android, iPhone & PC */}
          <div className="space-y-3 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#38bdf8]">
              {locale === "es"
                ? "CÓMO AGREGAR A TU PANTALLA DE INICIO:"
                : "HOW TO ADD TO YOUR HOME SCREEN:"}
            </p>

            <div className="grid grid-cols-1 gap-2.5 text-xs">
              {/* Android / Chrome */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Android (Chrome):</span>
                  <span className="text-[#cbd5e1] text-[11px]">
                    {locale === "es"
                      ? "Toca el botón «Instalar Aplicación Web» arriba o abre el menú del navegador (⋮) y selecciona «Instalar aplicación» / «Agregar a la pantalla principal»."
                      : "Tap 'Install Web Application' above or open the browser menu (⋮) and select 'Install app' / 'Add to Home screen'."}
                  </span>
                </div>
              </div>

              {/* iPhone / Safari */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Share className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">iPhone / iPad (Safari):</span>
                  <span className="text-[#cbd5e1] text-[11px] flex flex-wrap items-center gap-1">
                    {locale === "es" ? (
                      <>
                        Toca el icono <strong>Compartir</strong> en la barra inferior y selecciona{" "}
                        <span className="inline-flex items-center gap-1 text-[#38bdf8] font-bold">
                          <PlusSquare className="w-3.5 h-3.5" /> «Agregar a pantalla de inicio»
                        </span>
                        .
                      </>
                    ) : (
                      <>
                        Tap the <strong>Share</strong> icon in the bottom bar and select{" "}
                        <span className="inline-flex items-center gap-1 text-[#38bdf8] font-bold">
                          <PlusSquare className="w-3.5 h-3.5" /> &quot;Add to Home Screen&quot;
                        </span>
                        .
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Desktop */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Monitor className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {locale === "es" ? "Computadora (Chrome / Edge):" : "Desktop (Chrome / Edge):"}
                  </span>
                  <span className="text-[#cbd5e1] text-[11px]">
                    {locale === "es"
                      ? "Haz clic en el icono de instalación en la barra de direcciones (derecha) para abrir VNex Market como aplicación independiente."
                      : "Click the install icon in the right side of the address bar to launch VNex Market as a standalone app."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
