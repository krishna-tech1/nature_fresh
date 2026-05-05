"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { PackageSearch, Truck } from "lucide-react";
import styles from "./MapSection.module.css";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

// Unique explicit color for every procurement country
const procurementColorMap: Record<string, string> = {
  "India": "#FF6B6B",
  "Sri Lanka": "#00BACF",
  "Vietnam": "#F59E0B",
  "Thailand": "#10B981",
  "Indonesia": "#6366F1",
  "United Arab Emirates": "#EC4899",
  "Oman": "#F97316",
  "Bahrain": "#8B5CF6",
  "Qatar": "#14B8A6",
};

// Unique explicit color for every supply country
const supplyColorMap: Record<string, string> = {
  "United States": "#FF6B6B",
  "United Kingdom": "#00BACF",
  "China": "#F59E0B",
  "Vietnam": "#10B981",
  "Thailand": "#6366F1",
  "United Arab Emirates": "#EC4899",
  "Ireland": "#F97316",
  "Belgium": "#8B5CF6",
};

// Normalize country names from geo data to our keys
const normalizeName = (name: string): string => {
  if (name === "United States of America") return "United States";
  if (name === "Dem. Rep. Vietnam" || name === "Viet Nam") return "Vietnam";
  if (name === "UAE") return "United Arab Emirates";
  if (name === "Bahrain" || name === "البحرين") return "Bahrain";
  if (name === "Qatar" || name === "قطر") return "Qatar";
  return name;
};

interface GeoFeature {
  rsmKey: string;
  properties: { name: string };
}

const MapSection = () => {
  const [activeTab, setActiveTab] = useState<"procurement" | "supply">("procurement");
  const [tooltip, setTooltip] = useState<{ name: string; color: string } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => { setIsMounted(true); }, []);

  const getActiveColorMap = () =>
    activeTab === "procurement" ? procurementColorMap : supplyColorMap;

  const getCountryColor = (rawName: string): string | null => {
    const name = normalizeName(rawName);
    return getActiveColorMap()[name] ?? null;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    // Clamp x so tooltip doesn't overflow right edge
    const x = Math.min(event.clientX + 14, rect.right - 200);
    // Always show below cursor; if too close to bottom flip above
    const spaceBelow = rect.bottom - event.clientY;
    const y = spaceBelow > 60 ? event.clientY + 14 : event.clientY - 48;
    setTooltipPos({ x, y });
  };

  if (!isMounted) return null;

  const activeColorMap = getActiveColorMap();

  return (
    <section className={styles.mapSection}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.preTitle}>GLOBAL NETWORK</span>
            <h2 className={styles.title}>Our Global Footprint</h2>
            <p className={styles.subtitle}>
              Connecting sustainable sources to premium markets across the globe.
            </p>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === "procurement" ? styles.active : ""}`}
              onClick={() => setActiveTab("procurement")}
            >
              <PackageSearch size={18} />
              <span>Procurement</span>
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "supply" ? styles.active : ""}`}
              onClick={() => setActiveTab("supply")}
            >
              <Truck size={18} />
              <span>Supply</span>
            </button>
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <div className={styles.mapContainer} onMouseMove={handleMouseMove} ref={mapRef}>
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{ scale: 170, center: [10, 5] }}
              width={800}
              height={380}
              style={{ width: "100%", height: "100%", display: "block", position: "absolute", top: 0, left: 0 }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: GeoFeature[] }) =>
                  geographies.map((geo: GeoFeature) => {
                    const color = getCountryColor(geo.properties.name);
                    const isActive = color !== null;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          if (isActive && color) {
                            setTooltip({ name: normalizeName(geo.properties.name), color });
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          default: {
                            fill: isActive ? color : "#ffffff",
                            fillOpacity: isActive ? 0.9 : 1,
                            stroke: isActive ? color : "#cbd5e1",
                            strokeWidth: isActive ? 0.8 : 0.4,
                            outline: "none",
                            transition: "all 0.25s ease",
                          },
                          hover: {
                            fill: isActive ? color : "#f1f5f9",
                            fillOpacity: 1,
                            stroke: isActive ? "#fff" : "#94a3b8",
                            strokeWidth: isActive ? 1 : 0.6,
                            outline: "none",
                            cursor: isActive ? "pointer" : "default",
                            filter: isActive ? "brightness(1.15)" : "none",
                          },
                          pressed: {
                            fill: isActive ? color : "#f8fafc",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* Hover Tooltip */}
            {tooltip && (
              <div
                className={styles.mapTooltip}
                style={{
                  position: "fixed",
                  left: tooltipPos.x,
                  top: tooltipPos.y,
                  pointerEvents: "none",
                }}
              >
                <span
                  className={styles.tooltipDot}
                  style={{ backgroundColor: tooltip.color }}
                />
                {tooltip.name}
              </div>
            )}
          </div>


        </div>

        {/* Stats Section */}
        <div className={styles.statsWrapper}>
          <div className={styles.statsHeader}>
            <span className={styles.preTitle}>GLOBAL REACH</span>
            <h2 className={styles.statsTitle}>Scale Without Boundaries.</h2>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3>40+</h3>
              <p>COUNTRIES SERVED</p>
            </div>
            <div className={styles.statItem}>
              <h3>15k</h3>
              <p>TONS EXPORTED / YR</p>
            </div>
            <div className={styles.statItem}>
              <h3>25+</h3>
              <p>YEARS OF EXPERTISE</p>
            </div>
            <div className={styles.statItem}>
              <h3>100%</h3>
              <p>COLD CHAIN INTEGRITY</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
