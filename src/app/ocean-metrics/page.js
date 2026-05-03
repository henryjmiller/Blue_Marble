"use client";

import { useEffect, useState } from "react";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./page.module.css";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler);

function makeDataset(label, data, borderColor, backgroundColor) {
  return { label, data, borderColor, backgroundColor, borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, fill: true, tension: 0.3 };
}

function chartOptions(yLabel, xTick) {
  return {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { labels: { color: "#334e68", font: { size: 13 }, padding: 20 } },
      tooltip: { backgroundColor: "#0a2e4d", titleColor: "#e2f0fb", bodyColor: "#b3d4ee", cornerRadius: 8, padding: 12 },
    },
    scales: {
      x: {
        grid: { color: "#0a2e4d0f" },
        ticks: {
          color: "#627d98",
          maxTicksLimit: 10,
          callback: xTick || function(value) {
            return Math.floor(parseFloat(this.getLabelForValue(value)));
          },
        },
      },
      y: {
        grid: { color: "#0a2e4d0f" },
        ticks: { color: "#627d98" },
        title: { display: true, text: yLabel, color: "#486581", font: { size: 12 } },
      },
    },
  };
}

export default function OceanMetrics() {
  const [seaLevelData, setSeaLevelData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [phData, setPhData] = useState(null);

  useEffect(() => {
    fetch("/api/ocean-metrics/sea-level")
      .then((r) => r.json())
      .then((data) => {
        setSeaLevelData({
          labels: data.map((r) => r.time.toFixed(3)),
          datasets: [makeDataset("Global Mean Sea Level (mm)", data.map((r) => r.seaLevelMm), "#0d6ebd", "#0d6ebd14")],
        });
      });

    fetch("/api/ocean-metrics/ocean-temperature")
      .then((r) => r.json())
      .then((data) => {
        setTempData({
          labels: data.map((r) => String(r.year)),
          datasets: [
            makeDataset("Temperature Anomaly (°C)", data.map((r) => r.avgTemp), "#e07b3a", "#e07b3a14"),
            { label: "Upper Bound", data: data.map((r) => r.upperBound), borderColor: "#e07b3a80", backgroundColor: "#e07b3a0a", borderWidth: 1, borderDash: [4, 4], pointRadius: 0, fill: false, tension: 0.3 },
            { label: "Lower Bound", data: data.map((r) => r.lowerBound), borderColor: "#e07b3a80", backgroundColor: "#e07b3a0a", borderWidth: 1, borderDash: [4, 4], pointRadius: 0, fill: false, tension: 0.3 },
          ],
        });
      });

    fetch("/api/ocean-metrics/ocean-ph")
      .then((r) => r.json())
      .then((data) => {
        data.sort((a, b) => {
          const toDate = (d) => {
            const [day, month, year] = d.split("/");
            return new Date(year, month - 1, day);
          };
          return toDate(a.day) - toDate(b.day);
        });
        setPhData({
          labels: data.map((r) => r.day),
          datasets: [makeDataset("Ocean pH (monthly average)", data.map((r) => r.monthlyAvg), "#2a9d8f", "#2a9d8f14")],
        });
      });
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ocean Metrics</h1>
        <p className={styles.subtitle}>Our oceans are warming, rising, and becoming more acidic. This page uses real datasets to track three of the most important indicators of ocean health over time.</p>
      </div>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Global Mean Sea Level Rise</h2>
        <p className={styles.cardDesc}>
          Global mean sea level measured by satellite, 1993–2020.
          Values show change relative to the start of the dataset.
        </p>
        <div className={styles.chartWrapper}>
          {seaLevelData ? <Line data={seaLevelData} options={chartOptions("Sea Level Change (mm)")} /> : <p className={styles.chartState}>Loading data…</p>}
        </div>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>103mm</span>
          <span className={styles.statLabel}>Rise since 1993</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>3.8mm</span>
          <span className={styles.statLabel}>Average rise per year</span>
        </div>
      </div>
      <p className={styles.explanation}>
        Sea levels have risen steadily throughout the satellite record with no sign of slowing down.
        The two main causes are melting ice sheets and glaciers adding water to the ocean, and seawater
        expanding as it gets warmer. For coastal communities this means a higher baseline for storm
        surges and flooding, and in low-lying areas, permanent land loss over the coming decades.
      </p>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Ocean Surface Temperature Anomaly</h2>
        <p className={styles.cardDesc}>
          Annual average ocean surface temperature compared to the 1850–1900 pre-industrial baseline, 1850–2025.
        </p>
        <div className={styles.chartWrapper}>
          {tempData ? <Line data={tempData} options={chartOptions("Temperature Anomaly (°C)")} /> : <p className={styles.chartState}>Loading data…</p>}
        </div>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>+0.95°C</span>
          <span className={styles.statLabel}>Above pre-industrial levels in 2024</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>+1.24°C</span>
          <span className={styles.statLabel}>Rise since 1850</span>
        </div>
      </div>
      <p className={styles.explanation}>
        The oceans absorb around 90% of the excess heat produced by greenhouse gas emissions, which
        slows the warming we feel on land but causes serious problems underwater. Warmer water holds
        less oxygen, disrupts the food chain, and is the primary driver of coral bleaching events.
        The sharp rise visible from the 1980s onwards reflects the accelerating pace of warming as
        global emissions have increased.
      </p>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Ocean pH (Acidification)</h2>
        <p className={styles.cardDesc}>
          Monthly ocean surface pH readings, 1988–2024.
          Lower pH means more acidic water.
        </p>
        <div className={styles.chartWrapper}>
          {phData ? <Line data={phData} options={chartOptions("pH", function(value) {
            const label = this.getLabelForValue(value);
            return label ? label.split("/")[2] : "";
          })} /> : <p className={styles.chartState}>Loading data…</p>}
        </div>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>8.04</span>
          <span className={styles.statLabel}>Average pH in 2024</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>-0.07</span>
          <span className={styles.statLabel}>pH decline since 1988</span>
        </div>
      </div>
      <p className={styles.explanation}>
        As the ocean absorbs carbon dioxide from the atmosphere, it forms carbonic acid, which lowers
        the pH. A drop of 0.07 units may sound small but the pH scale is logarithmic, so this
        represents a meaningful increase in acidity. Many marine organisms, including oysters, mussels,
        and corals, depend on calcium carbonate to build their shells and skeletons. More acidic water
        makes this harder and in some cases dissolves existing structures entirely.
      </p>
    </main>
  );
}
