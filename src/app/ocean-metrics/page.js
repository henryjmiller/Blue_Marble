"use client";

import { useEffect, useState } from "react";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./page.module.css";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler);

export default function OceanMetrics() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("/api/ocean-metrics/sea-level")
      .then((r) => r.json())
      .then((data) => {
        setChartData({
          labels: data.map((r) => r.time.toFixed(3)),
          datasets: [
            {
              label: "Global Mean Sea Level (mm)",
              data: data.map((r) => r.seaLevelMm),
              borderColor: "#0d6ebd",
              backgroundColor: "rgba(13, 110, 189, 0.08)",
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4,
              fill: true,
              tension: 0.3,
            },
          ],
        });
      });
  }, []);

  const chartOptions = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        labels: { color: "#334e68", font: { size: 13 }, padding: 20 },
      },
      tooltip: {
        backgroundColor: "#0a2e4d",
        titleColor: "#e2f0fb",
        bodyColor: "#b3d4ee",
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(10, 46, 77, 0.06)" },
        ticks: {
          color: "#627d98",
          maxTicksLimit: 10,
          callback: function(value) {
            return Math.floor(parseFloat(this.getLabelForValue(value)));
          },
        },
      },
      y: {
        grid: { color: "rgba(10, 46, 77, 0.06)" },
        ticks: { color: "#627d98" },
        title: { display: true, text: "Sea Level Change (mm)", color: "#486581", font: { size: 12 } },
      },
    },
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ocean Metrics</h1>
        <p className={styles.subtitle}>Explore the measurable changes affecting our oceans, from rising sea levels and temperatures to declining pH levels and increasing pollution.</p>
      </div>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Global Mean Sea Level Rise</h2>
        <p className={styles.cardDesc}>
          Satellite altimeter measurements of global mean sea level, 1993–2020.
          Values are relative to the 1993 baseline.
        </p>
        <div className={styles.chartWrapper}>
          {chartData ? <Line data={chartData} options={chartOptions} /> : <p className={styles.chartState}>Loading data…</p>}
        </div>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>~103mm</span>
          <span className={styles.statLabel}>Rise since 1993</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>~3.8mm</span>
          <span className={styles.statLabel}>Average rise per year</span>
        </div>
      </div>
    </main>
  );
}
