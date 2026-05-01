"use client";

import React, { useState, useEffect } from "react";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from "react-simple-maps";
import { PackageSearch, Truck, Plus, Minus } from "lucide-react";
import styles from "./MapSection.module.css";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

const procurementCountries = [
  "India", "Sri Lanka", "Vietnam", "Thailand", 
  "Indonesia", "United Arab Emirates", "Oman", "Bahrain", "Qatar"
];

const supplyCountries = [
  "United States", "United Kingdom", "China", "Vietnam", 
  "Thailand", "United Arab Emirates", "Ireland", "Belgium"
];

interface GeoFeature {
  rsmKey: string;
  properties: {
    name: string;
  };
}

const MapSection = () => {
  const [activeTab, setActiveTab] = useState<"procurement" | "supply">("procurement");
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ coordinates: [20, 10], zoom: 1 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  const isHighlighted = (name: string) => {
    let normalizedName = name;
    if (name === "United States of America") normalizedName = "United States";
    if (name === "United Kingdom") normalizedName = "United Kingdom";
    if (name === "Dem. Rep. Vietnam") normalizedName = "Vietnam";
    if (name === "UAE") normalizedName = "United Arab Emirates";
    
    const list = activeTab === "procurement" ? procurementCountries : supplyCountries;
    return list.includes(normalizedName);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPos({ x: event.clientX, y: event.clientY });
  };

  if (!isMounted) return null;

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
              className={`${styles.tabBtn} ${activeTab === 'procurement' ? styles.active : ''}`}
              onClick={() => setActiveTab('procurement')}
            >
              <PackageSearch size={18} />
              <span>Procurement</span>
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'supply' ? styles.active : ''}`}
              onClick={() => setActiveTab('supply')}
            >
              <Truck size={18} />
              <span>Supply</span>
            </button>
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <div className={styles.mapContainer} onMouseMove={handleMouseMove}>
            <div className={styles.zoomControls}>
              <button onClick={handleZoomIn} title="Zoom In"><Plus size={18} /></button>
              <button onClick={handleZoomOut} title="Zoom Out"><Minus size={18} /></button>
            </div>

            <ComposableMap 
              projection="geoMercator"
              projectionConfig={{ scale: 120 }}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
            >
              <ZoomableGroup 
                zoom={position.zoom} 
                center={position.coordinates as [number, number]} 
                onMoveEnd={handleMoveEnd}
                maxZoom={12}
                translateExtent={[
                  [0, -100],
                  [800, 500]
                ]}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: GeoFeature[] }) =>
                    geographies.map((geo: GeoFeature) => {
                      const highlighted = isHighlighted(geo.properties.name);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => {
                            if (highlighted) setTooltipContent(geo.properties.name);
                          }}
                          onMouseLeave={() => setTooltipContent("")}
                          style={{
                            default: {
                              fill: highlighted ? "rgba(0, 186, 207, 0.15)" : "#f8fafc",
                              outline: "none",
                              transition: "all 0.3s ease",
                            },
                            hover: {
                              fill: highlighted ? "var(--primary-color)" : "#f1f5f9",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: "#00717e",
                              outline: "none",
                            },
                          }}
                          stroke={highlighted ? "var(--primary-color)" : "#e2e8f0"}
                          strokeWidth={highlighted ? 1.5 : 0.4} // Thicker stroke for small countries
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {tooltipContent && (
              <div 
                className={styles.mapTooltip}
                style={{ 
                  position: 'fixed',
                  left: tooltipPos.x + 15, 
                  top: tooltipPos.y + 15,
                  pointerEvents: 'none'
                }}
              >
                {tooltipContent}
              </div>
            )}
            
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: "var(--primary-color)" }}></span>
                <span>{activeTab === 'procurement' ? 'Procurement' : 'Supply'} Market</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: "#cbd5e1" }}></span>
                <span>Global Reach</span>
              </div>
            </div>
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
