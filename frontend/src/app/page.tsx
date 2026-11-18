"use client";

import { useState } from "react";
import {
  personas,
  troncCommun,
  suiviActivs,
  pourcentageAvancement,
  type ModuleTroncCommun,
} from "@/lib/donnees-demo";

export default function Home() {
  const [personaId, setPersonaId] = useState<string | null>(null);
  const [activSelectionneeId, setActivSelectionneeId] = useState<string | null>(null);
  const persona = personas.find((p) => p.id === personaId) ?? null;

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "1.5rem", fontFamily: "sans-serif" }}>
      <h1>Espace ACTIV&apos;</h1>

      {persona && (
        <button
          onClick={() => {
            setPersonaId(null);
            setActivSelectionneeId(null);
          }}
          style={{ marginBottom: "1rem" }}
        >
          Changer de persona
        </button>
      )}

      {!persona ? (
        <ChoixPersona onChoisir={setPersonaId} />
      ) : persona.role === "activ" ? (
        <EcranTroncCommun titre={`Tronc commun de ${persona.nom}`} modules={troncCommun} />
      ) : persona.role === "chargee-remobilisation" ? (
        activSelectionneeId ? (
          <EcranTroncCommun
            titre={`Tronc commun de ${suiviActivs.find((a) => a.id === activSelectionneeId)!.nom}`}
            modules={suiviActivs.find((a) => a.id === activSelectionneeId)!.modules}
            onRetour={() => setActivSelectionneeId(null)}
          />
        ) : (
          <DashboardChargeeRemobilisation onChoisirActiv={setActivSelectionneeId} />
        )
      ) : (
        <p>
          Connectée en tant que {persona.nom} ({persona.libelleRole}). Écran à venir pour ce rôle.
        </p>
      )}
    </main>
  );
}

function ChoixPersona({ onChoisir }: { onChoisir: (id: string) => void }) {
  return (
    <section>
      <h2>Qui êtes-vous ?</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {personas.map((p) => (
          <li key={p.id} style={{ marginBottom: "0.5rem" }}>
            <button onClick={() => onChoisir(p.id)}>
              {p.nom} — {p.libelleRole}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EcranTroncCommun({
  titre,
  modules,
  onRetour,
}: {
  titre: string;
  modules: ModuleTroncCommun[];
  onRetour?: () => void;
}) {
  return (
    <section>
      {onRetour && (
        <button onClick={onRetour} style={{ marginBottom: "1rem" }}>
          ← Retour au tableau de bord
        </button>
      )}
      <h2>{titre}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {modules.map((module) => (
          <li key={module.id} style={{ marginBottom: "0.5rem" }}>
            {module.statut === "vu" ? "✅" : "⬜️"} {module.titre}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DashboardChargeeRemobilisation({
  onChoisirActiv,
}: {
  onChoisirActiv: (id: string) => void;
}) {
  return (
    <section>
      <h2>Tableau de bord — avancement des ACTIV&apos;</h2>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        {suiviActivs.map((activ) => {
          const pourcentage = pourcentageAvancement(activ.modules);
          const complet = pourcentage === 100;
          return (
            <button
              key={activ.id}
              onClick={() => onChoisirActiv(activ.id)}
              style={{
                textAlign: "left",
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "1rem",
                background: "white",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>{activ.nom}</strong>
                <span
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: 999,
                    background: complet ? "#dcfce7" : "#fef9c3",
                    color: complet ? "#166534" : "#854d0e",
                  }}
                >
                  {complet ? "Formation complète" : "En formation"}
                </span>
              </div>
              <div
                style={{
                  marginTop: "0.5rem",
                  height: 8,
                  borderRadius: 4,
                  background: "#eee",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pourcentage}%`,
                    height: "100%",
                    background: complet ? "#22c55e" : "#3b82f6",
                  }}
                />
              </div>
              <div style={{ fontSize: "0.8rem", marginTop: "0.25rem", color: "#555" }}>
                {pourcentage}% du tronc commun
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
