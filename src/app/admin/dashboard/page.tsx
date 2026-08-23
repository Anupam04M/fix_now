"use client";

// src/app/admin/dashboard/page.tsx
// ================================================================
// ADMIN DASHBOARD  (route: /admin/dashboard)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to the Dashboard.html design.
//
// SECTIONS:
//   1. HEADER          : welcome strip + search/bell/profile chip
//   2. METRICS CARDS   : Total | Active | Pending | Avg Rating
//   3. CHARTS          : registration area chart (SVG) +
//                        provider status donut (SVG) + legend
//   4. BOTTOM WIDGETS  : recent activities, top rated providers,
//                        quick action tiles
//
// ============================================================
// DATA FLOW  (read this before changing anything!)
// ============================================================
//   useAdminDashboard()             <-- src/hooks/useAdminDashboard.ts
//        |  one call, one payload
//        v
//   AdminDashboardData              <-- types in adminDashboard.function.ts
//        |
//        +-- d.greeting         -> header strip
//        +-- d.metrics          -> metric cards (tone drives colours)
//        +-- d.registrationChart-> <RegistrationAreaChart/> (SVG)
//        +-- d.providerStatus   -> <StatusDonut/> + legend rows
//        +-- d.recentActivities -> activity list (tone -> icon colour)
//        +-- d.topProviders     -> rated provider rows
//        +-- QUICK_ACTIONS      -> tiles (static nav config, no API)
//
// CONVERT STATIC -> DYNAMIC IN 3 STEPS (any dev can do this):
//   STEP 1: open src/api/api-function/adminDashboard.function.ts
//   STEP 2: inside fetchAdminDashboardFn(), delete the mock return
//           and uncomment api.get("/admin/dashboard")
//   STEP 3: done. This page never changes - it already renders
//           whatever that function returns.
//
// CHARTS: dependency-free inline SVG (same approach as the provider
// dashboard). Swap for recharts any time; the data shape matches.
// ============================================================

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  Bell,
  ChevronDown,
  Users,
  CircleCheck,
  Clock,
  Star,
  User,
  Check,
  Archive,
  UserPlus,
  Wrench,
  ShieldHalf,
  Newspaper,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import {
  AdminDashboardData,
} from "@/api/api-function/adminDashboard.function";
import adminAvatar from "@/assets/images/admin/avatar.jpg";

/* Shared card look from the HTML */
const CARD =
  "bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]";

/* Metric card pastel icon tones (.icon-* in the CSS) */
const METRIC_TONES = {
  total: "bg-[#F1F5F9] text-[#64748B]",
  active: "bg-[#DCFCE7] text-[#16A34A]",
  pending: "bg-[#FEF9C3] text-[#CA8A04]",
  ratings: "bg-[#FEF3C7] text-[#D97706]",
};

const METRIC_ICONS = {
  total: Users,
  active: CircleCheck,
  pending: Clock,
  ratings: Star,
};

/* Recent-activity circle tones */
const ACTIVITY_TONES = {
  neutral: "bg-[#F1F5F9] text-[#64748B]",
  success: "bg-[#DCFCE7] text-[#16A34A]",
  warning: "bg-[#FEF3C7] text-[#D97706]",
  star: "bg-[#FEF9C3] text-[#EAB308]",
};

/* Quick-action tiles — static navigation config (no API needed).
   tone -> [tile bg, tile text, icon] */
const QUICK_ACTIONS: {
  key: string;
  label: string;
  bg: string;
  text: string;
  Icon: React.ElementType;
  path: string;
}[] = [
  {
    key: "add",
    label: "Add New Provider",
    bg: "bg-[#EFF6FF]",
    text: "text-[#2563EB]",
    Icon: UserPlus,
    path: "/admin/provider_management",
  },
  {
    key: "categories",
    label: "Manage Categories",
    bg: "bg-[#FEFCE8]",
    text: "text-[#CA8A04]",
    Icon: Wrench,
    path: "/admin/service_categories",
  },
  {
    key: "suspicious",
    label: "Suspicious Activities",
    bg: "bg-[#FEF2F2]",
    text: "text-[#DC2626]",
    Icon: ShieldHalf,
    path: "/admin/activity_log",
  },
  {
    key: "pages",
    label: "Edit Static Pages",
    bg: "bg-[#F8FAFC]",
    text: "text-[#475569]",
    Icon: Newspaper,
    path: "/admin/static_pages",
  },
];

/* ================================================================
   RegistrationAreaChart — dependency-free SVG area chart matching
   the Chart.js config in the HTML:
     smooth curve (tension .4), blue line #2563eb width 2,
     vertical gradient rgba(59,130,246,.8) -> transparent,
     y axis 0..500 step 100, gridlines #f1f5f9, no points shown.
   ================================================================ */
function RegistrationAreaChart({
  values,
  labels,
}: {
  values: number[];
  labels: string[];
}) {
  const W = 700;
  const H = 200;
  const PAD_X = 30;
  const PAD_Y = 10;
  const MAX_Y = 500;

  const pts = values.map((v, i) => ({
    x: PAD_X + (i * (W - PAD_X * 2)) / Math.max(values.length - 1, 1),
    y: H - PAD_Y - (v / MAX_Y) * (H - PAD_Y * 2),
  }));

  /* Catmull-Rom -> cubic bezier for Chart.js-like smoothing */
  let linePath = "";
  if (pts.length > 1) {
    linePath = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      linePath += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(
        1,
      )},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
  }
  const areaPath = `${linePath} L${pts[pts.length - 1]?.x ?? 0},${
    H - PAD_Y
  } L${pts[0]?.x ?? 0},${H - PAD_Y} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* horizontal gridlines every 100 */}
      {[100, 200, 300, 400].map((v) => {
        const y = H - PAD_Y - (v / MAX_Y) * (H - PAD_Y * 2);
        return (
          <line
            key={v}
            x1={PAD_X}
            x2={W - PAD_X}
            y1={y}
            y2={y}
            stroke="#F1F5F9"
          />
        );
      })}

      {/* y-axis tick labels 0..500 step 100 */}
      {[0, 100, 200, 300, 400, 500].map((v) => {
        const y = H - PAD_Y - (v / MAX_Y) * (H - PAD_Y * 2);
        return (
          <text
            key={v}
            x={PAD_X - 6}
            y={y + 3}
            textAnchor="end"
            fontSize="9"
            fill="#64748B"
          >
            {v}
          </text>
        );
      })}

      <path d={areaPath} fill="url(#regGrad)" />
      <path
        d={linePath}
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />

      {/* x-axis labels */}
      {labels.map((label, i) => (
        <text
          key={label}
          x={pts[i]?.x.toFixed(1)}
          y={H - 1}
          textAnchor="middle"
          fontSize="10"
          fill="#64748B"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/* ================================================================
   StatusDonut — dependency-free SVG doughnut matching the Chart.js
   config in the HTML: cutout ~78%, borderWidth 0, starts at 12
   o'clock. Center total is overlaid by the parent (absolute div).
   ================================================================ */
function StatusDonut({
  slices,
}: {
  slices: { label: string; value: number; color: string }[];
}) {
  const SIZE = 170;
  const C = SIZE / 2;
  const R = 76;
  const STROKE = 19;
  const CIRC = 2 * Math.PI * R;

  /* Precompute each slice's dash length + cumulative start offset
     (kept immutable so the React Compiler is happy) */
  const dashes = slices.map((s) => (s.value / 100) * CIRC);
  const offsets = dashes.map((_, i) =>
    dashes.slice(0, i).reduce((sum, len) => sum + len, 0),
  );

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full -rotate-90">
      {slices.map((s, i) => (
        <circle
          key={s.label}
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke={s.color}
          strokeWidth={STROKE}
          strokeDasharray={`${dashes[i]} ${CIRC - dashes[i]}`}
          strokeDashoffset={-offsets[i]}
        />
      ))}
    </svg>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { data: res, isLoading } = useAdminDashboard();

  /* Simple centered loader while the query resolves */
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
      </div>
    );
  }

  /* Payload (mock today, API tomorrow) */
  const d = res?.data as AdminDashboardData | undefined;

  if (!d) {
    return (
      <p className="p-8 text-center text-sm text-[#7A8796]">
        Unable to load dashboard. Please try again later.
      </p>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-32px)] flex-col gap-[20px] rounded-[16px] bg-[#F3F5F9] p-4 md:min-h-[calc(100vh-48px)] md:p-6 lg:gap-5 lg:px-8">
      {/* ==================== 1. HEADER ==================== */}
      <header className={`${CARD} flex items-center justify-between gap-4 rounded-2xl px-[16px] py-[16px] md:px-6`}>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-[#0F172A]">
            Welcome, {d.greeting.name}
          </h1>
          <p className="mt-[2px] truncate text-[11px] text-[#94A3B8]">
            {d.greeting.subtitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            onClick={() => toast.info("Search panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
          >
            <Search size={15} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            onClick={() => toast.info("Notifications panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
          >
            <Bell size={15} />
          </button>

          {/* Admin profile chip */}
          <div className="hidden cursor-pointer items-center gap-2.5 pl-2 sm:flex">
            <Image
              src={adminAvatar}
              alt="Admin Avatar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold leading-tight text-[#1E293B]">
                Arghya Sen
                <ChevronDown size={12} className="ml-1 inline" />
              </span>
              <span className="text-[10px] leading-tight text-[#94A3B8]">
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== 2. METRICS CARDS ==================== */}
      <section className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {d.metrics.map((metric) => {
          const Icon = METRIC_ICONS[metric.tone];
          return (
            <div key={metric.key} className={`${CARD} flex items-center gap-4 rounded-2xl p-5`}>
              {/* Pastel icon box */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${METRIC_TONES[metric.tone]}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-semibold text-[#1E293B]">
                  {metric.label}
                </span>
                <span className="my-0.5 text-xl font-bold leading-tight text-[#0F172A]">
                  {metric.value}
                </span>
                <span
                  className={`inline-flex items-center gap-[3px] text-[10px] font-medium ${
                    metric.trendUp ? "text-[#16A34A]" : "text-[#DC2626]"
                  }`}
                >
                  {metric.trendUp ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {metric.trendValue}
                  <span className="font-normal text-[#94A3B8]">
                    {metric.trendNote}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ==================== 3. CHARTS ==================== */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1.1fr]">
        {/* ---- Area graph ---- */}
        <div className={`${CARD} flex flex-col rounded-2xl p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#0F172A]">
              Provider Registration Graph
            </span>
            <select
              className="cursor-pointer rounded-lg border border-[#2563EB] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#2563EB] outline-none"
              defaultValue="This Month"
            >
              <option>This Month</option>
            </select>
          </div>

          <div className="relative min-h-[170px] flex-1">
            <RegistrationAreaChart
              values={d.registrationChart.values}
              labels={d.registrationChart.labels}
            />
          </div>
        </div>

        {/* ---- Donut chart ---- */}
        <div className={`${CARD} flex flex-col rounded-2xl p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#0F172A]">
              Provider Status
            </span>
          </div>

          <div className="flex h-full flex-col items-center justify-between gap-6 py-2.5 sm:flex-row">
            {/* Donut + center total overlay */}
            <div className="relative h-[170px] w-[170px] shrink-0">
              <StatusDonut slices={d.providerStatus.slices} />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-base font-bold leading-none text-[#0F172A]">
                  {d.providerStatus.totalLabel}
                </div>
                <div className="mt-[2px] text-[10px] text-[#94A3B8]">
                  {d.providerStatus.centerSub}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex w-full flex-col gap-3 sm:w-[48%]">
              {d.providerStatus.legend.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-2 font-semibold text-[#334155]">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </div>
                  <div className="font-semibold text-[#1E293B]">
                    {item.count}{" "}
                    <span className="ml-0.5 font-normal text-[#94A3B8]">
                      {item.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. BOTTOM WIDGETS ==================== */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr_0.9fr]">
        {/* ---- Recent Activities ---- */}
        <div className={`${CARD} flex flex-col rounded-2xl p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#0F172A]">
              Recent Activities
            </span>
            <button
              onClick={() => router.push("/admin/activity_log")}
              className="cursor-pointer rounded-lg border border-[#2563EB] bg-transparent px-3 py-1 text-[10px] font-semibold text-[#2563EB]"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {d.recentActivities.map((activity) => {
              const ActivityIcon =
                activity.tone === "success"
                  ? Check
                  : activity.tone === "warning"
                    ? Archive
                    : activity.tone === "star"
                      ? Star
                      : User;

              return (
                <div key={activity.key} className="flex items-center gap-3 pb-2">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs ${ACTIVITY_TONES[activity.tone]}`}
                  >
                    <ActivityIcon size={12} />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[11px] font-semibold leading-snug text-[#1E293B]">
                      {activity.text}
                    </span>
                    <span className="text-[9px] text-[#94A3B8]">
                      {activity.timeLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Top Rated Providers ---- */}
        <div className={`${CARD} flex flex-col rounded-2xl p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#0F172A]">
              Top Rated Providers
            </span>
            <button
              onClick={() => router.push("/admin/ratings_reviews")}
              className="cursor-pointer rounded-lg border border-[#2563EB] bg-transparent px-3 py-1 text-[10px] font-semibold text-[#2563EB]"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {d.topProviders.map((provider, index) => (
              <div
                key={provider.id}
                className={`flex items-center justify-between pb-2 ${
                  index < d.topProviders.length - 1
                    ? "border-b border-[#F8FAFC]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Placeholder avatar circle from the HTML */}
                  <div className="h-8 w-8 rounded-full bg-[#F1F5F9]" />
                  <div>
                    <div className="text-[11px] font-semibold text-[#1E293B]">
                      {provider.name}
                    </div>
                    <div className="mt-[2px] flex gap-[1px] text-[#EAB308]">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          size={9}
                          className="fill-[#EAB308]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-bold text-[#1E293B]">
                  {provider.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Quick Action ---- */}
        <div className={`${CARD} flex flex-col rounded-2xl p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#0F172A]">
              Quick Action
            </span>
          </div>

          <div className="grid h-full grid-cols-2 gap-3">
            {QUICK_ACTIONS.map(({ key, label, bg, text, Icon, path }) => (
              <button
                key={key}
                onClick={() => router.push(path)}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5 ${bg} ${text}`}
              >
                <Icon size={18} />
                <span className="text-center text-[11px] font-bold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
