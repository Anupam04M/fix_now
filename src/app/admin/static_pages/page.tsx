"use client";

// src/app/admin/static_pages/page.tsx
// ================================================================
// ADMIN STATIC PAGES  (route: /admin/static_pages)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to the Static_Pages.html design.
//
// SECTIONS:
//   1. HEADER        : title + breadcrumb, search/bell/profile chip
//   2. LEFT COLUMN   : "Select Pages" list (click to switch page)
//   3. TOP BAR       : Edit Page title, Published chip, Page Url
//                      input + Publish button
//   4. EDITOR BOX    : Page Title / Description / Content toolbar,
//                      Uploaded Media placeholders + drag-drop
//   5. RIGHT RAIL    : Page Status, Page Information,
//                      Revision History cards
//
// ============================================================
// DATA FLOW  (read this before changing anything!)
// ============================================================
//   useAdminStaticPages()           <-- src/hooks/useAdminStaticPages.ts
//        |  one call, one payload
//        v
//   AdminStaticPagesData            <-- adminStaticPages.function.ts
//        |
//        +-- d.pages[i]  -> left-list tile AND editor payload.
//            Selecting a tile swaps every editor field via the
//            keyed <PageEditor> remount below.
//
// INTERACTIVITY ALREADY WIRED:
//   - Page switching updates title/description/url/status/history
//   - Title, Description and Page Url are controlled inputs
//   - Publish / Preview / Save Draft / Unpublish / Upload /
//     View All History fire toasts until their APIs exist
//
// CONVERT STATIC -> DYNAMIC IN 3 STEPS (any dev can do this):
//   STEP 1: open src/api/api-function/adminStaticPages.function.ts
//   STEP 2: inside fetchAdminStaticPagesFn(), delete the mock return
//           and uncomment api.get("/admin/static-pages")
//   STEP 3: done. This page never changes - it already renders
//           whatever that function returns.
// ============================================================

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Search,
  Bell,
  ChevronDown,
  Users,
  Wrench,
  Phone,
  ExternalLink,
  ArrowRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Image as ImageIcon,
  Video,
  Table,
  Upload,
} from "lucide-react";

import { useAdminStaticPages } from "@/hooks/useAdminStaticPages";
import {
  AdminStaticPagesData,
  StaticPage,
} from "@/api/api-function/adminStaticPages.function";
import adminAvatar from "@/assets/images/admin/avatar.jpg";

/* Shared card look from the HTML */
const CARD =
  "bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]";

const LIST_ICON =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm";

const PUBLISHED_CHIP =
  "inline-block rounded border border-[#86EFAC] bg-[#F0FDF4] px-2.5 py-0.5 text-[9px] font-semibold text-[#16A34A]";

export default function StaticPages() {
  const { data: res, isLoading } = useAdminStaticPages();

  /* Which page is open in the editor (defaults to the first) */
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
      </div>
    );
  }

  /* Payload (mock today, API tomorrow) */
  const d = res?.data as AdminStaticPagesData | undefined;

  if (!d || d.pages.length === 0) {
    return (
      <p className="p-8 text-center text-sm text-[#7A8796]">
        Unable to load static pages. Please try again later.
      </p>
    );
  }

  const selected = d.pages.find((p) => p.id === selectedId) ?? d.pages[0];

  const LIST_ICONS = {
    about: Users,
    services: Wrench,
    contact: Phone,
  };

  return (
    <div className="flex min-h-[calc(100vh-32px)] flex-col gap-[20px] rounded-[16px] bg-[#F3F5F9] p-4 md:min-h-[calc(100vh-48px)] md:p-6 lg:gap-5 lg:px-8">
      {/* ==================== 1. HEADER ==================== */}
      <header
        className={`${CARD} flex items-center justify-between gap-4 px-[16px] py-[16px] md:px-6`}
      >
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-[#0F172A]">
            Static Pages
          </h1>
          <p className="mt-[2px] truncate text-[11px] text-[#94A3B8]">
            Dashboard &gt; Static Pages
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

      {/* ==================== CONTENT GRID ==================== */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[280px_1fr]">
        {/* ---------- LEFT COLUMN: SELECT PAGES ---------- */}
        <section className={`${CARD} min-h-[300px] rounded-2xl p-5 lg:min-h-[750px]`}>
          <h2 className="text-[14px] font-bold text-[#0F172A]">
            Select Pages
          </h2>
          <p className="mb-4 mt-0.5 text-[10px] text-[#94A3B8]">
            Choose A Static Page To Manage
          </p>

          <div className="flex flex-col gap-3">
            {d.pages.map((page) => {
              const isSelected = page.id === selected.id;
              const ListIcon = LIST_ICONS[page.icon];

              return (
                <button
                  key={page.id}
                  onClick={() => setSelectedId(page.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left transition-colors ${
                    isSelected
                      ? "border-[#E2E8F0] bg-[#F8FAFC]"
                      : "border-[#F1F5F9] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`${LIST_ICON} ${
                        isSelected
                          ? "bg-[#E2E8F0] text-[#64748B]"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      <ListIcon size={15} />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#0F172A]">
                        {page.name}
                      </div>
                      <div className="text-[10px] text-[#94A3B8]">
                        {page.routeLabel}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[8px] text-[#94A3B8]">
                      Published On
                    </div>
                    <div className="text-[9px] font-semibold text-[#0F172A]">
                      {page.publishedOn}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Editor remounts on page switch so local drafts reset */}
        <PageEditor key={selected.id} page={selected} />
      </div>
    </div>
  );
}

/* ================================================================
   PAGE EDITOR — top bar + editor box + right status rail.
   Keyed by page id from the parent so every controlled input
   resets when a different page is selected.
   ================================================================ */
function PageEditor({ page }: { page: StaticPage }) {
  /* Controlled inputs seeded from the selected page */
  const [title, setTitle] = useState(page.title);
  const [description, setDescription] = useState(page.description);
  const [urlSlug, setUrlSlug] = useState(page.urlSlug);

  const handlePublish = () =>
    toast.success(`"${title}" published successfully.`);

  return (
    <div className="flex flex-col gap-5">
      {/* ---------- TOP ACTION BAR ---------- */}
      <div
        className={`${CARD} flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between`}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
          {/* Edit Page label + status chip */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-[#0F172A]">
              Edit Page: {page.name}
            </span>
            <span className={`rounded px-2 py-0.5 ${PUBLISHED_CHIP}`}>
              {page.status}
            </span>
          </div>

          {/* Page Url input + external link */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-bold text-[#0F172A]">Page Url:</span>
            <input
              type="text"
              value={urlSlug}
              onChange={(e) => setUrlSlug(e.target.value)}
              placeholder="Enter Page Url"
              className="w-36 rounded border border-[#E2E8F0] px-2.5 py-1 text-[10px] text-[#334155] outline-none"
            />
            <button
              type="button"
              aria-label="Open page"
              onClick={() => toast.info("Page preview opens in a new tab soon.")}
              className="cursor-pointer text-xs text-[#64748B] transition-colors hover:text-[#0F172A]"
            >
              <ExternalLink size={13} />
            </button>
          </div>
        </div>

        {/* Publish */}
        <button
          onClick={handlePublish}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
        >
          Publish <ArrowRight size={11} />
        </button>
      </div>

      {/* ---------- EDITOR + SIDEBAR GRID ---------- */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[1fr_240px]">
        {/* ===== LEFT EDITOR BOX ===== */}
        <div className={`${CARD} flex flex-col gap-4 rounded-2xl p-5`}>
          {/* Page Title */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-[#0F172A]">
              Page Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#F1F5F9] px-3 py-2 text-[11px] font-medium text-[#334155] outline-none"
            />
          </div>

          {/* Page Description */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-[#0F172A]">
              Page Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-[#F1F5F9] p-3 text-[10px] font-medium leading-relaxed text-[#64748B] outline-none"
            />
          </div>

          {/* Page Content Editor */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-[#0F172A]">
              Page Content
            </label>
            <div className="overflow-hidden rounded-xl border border-[#F1F5F9]">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-white p-2 text-[11px] text-[#64748B]">
                <div className="flex items-center gap-3">
                  <span className="flex cursor-pointer items-center gap-2 text-[10px] font-medium text-[#334155]">
                    Paragraph <ChevronDown size={9} />
                  </span>
                  <span className="h-3 w-[1px] bg-[#E2E8F0]" />
                  <button
                    type="button"
                    aria-label="Bold"
                    className="cursor-pointer font-bold hover:text-[#0F172A]"
                  >
                    <Bold size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Italic"
                    className="cursor-pointer italic hover:text-[#0F172A]"
                  >
                    <Italic size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Underline"
                    className="cursor-pointer underline hover:text-[#0F172A]"
                  >
                    <Underline size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Strikethrough"
                    className="cursor-pointer line-through hover:text-[#0F172A]"
                  >
                    <Strikethrough size={13} />
                  </button>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                  <button
                    type="button"
                    aria-label="Align left"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <AlignLeft size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Align center"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <AlignCenter size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Align right"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <AlignRight size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Align justify"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <AlignJustify size={13} />
                  </button>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                  <button
                    type="button"
                    aria-label="Insert link"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <Link2 size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Insert image"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <ImageIcon size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Insert video"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <Video size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Insert table"
                    className="cursor-pointer hover:text-[#0F172A]"
                  >
                    <Table size={13} />
                  </button>
                </div>
              </div>

              {/* Empty editable area */}
              <div className="h-44 bg-white p-3" />
            </div>
          </div>

          {/* Uploaded Media */}
          <div>
            <label className="mb-2 block text-[12px] font-bold text-[#0F172A]">
              Uploded Media
            </label>

            {/* Placeholder thumbnails */}
            <div className="mb-3 grid grid-cols-4 gap-3">
              {Array.from({ length: page.mediaCount }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-16 items-center justify-center rounded-xl bg-[#F1F5F9] text-lg text-[#CBD5E1]"
                >
                  <ImageIcon size={18} />
                </div>
              ))}
            </div>

            {/* Drag & drop container */}
            <div className="flex flex-col gap-4 rounded-2xl border border-[#F1F5F9] p-4 sm:flex-row sm:items-center">
              {/* Dropzone */}
              <button
                type="button"
                onClick={() => toast.info("File picker coming soon.")}
                className="mr-0 flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center sm:mr-4 sm:block"
              >
                <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-xs text-[#64748B]">
                  <Upload size={13} />
                </div>
                <div className="text-[10px] font-semibold text-[#1E293B]">
                  Drag &amp; Drop Or Click To Upload
                </div>
                <div className="mt-0.5 text-[8px] text-[#94A3B8]">
                  JPG, PNG, GIF Up To 10MB
                </div>
              </button>

              {/* Manage content */}
              <div className="shrink-0 sm:w-[180px]">
                <div className="text-[11px] font-bold text-[#0F172A]">
                  Manage Content
                </div>
                <div className="mb-3 text-[9px] text-[#94A3B8]">
                  Allowed File : Jpg, Png, Pdf
                </div>
                <button
                  onClick={() => toast.info("Upload flow coming soon.")}
                  className="w-full cursor-pointer rounded-xl bg-[#2563EB] py-2 text-[10px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Upload File
                </button>
              </div>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="mt-1 flex justify-end gap-3">
            <button
              onClick={() => toast.info("Preview opens soon.")}
              className="cursor-pointer rounded-full border border-[#2563EB] px-6 py-1.5 text-[10px] font-semibold text-[#2563EB] transition-all duration-200 hover:bg-[#2563EB] hover:text-white"
            >
              Preview
            </button>
            <button
              onClick={() => toast.success("Draft saved.")}
              className="cursor-pointer rounded-full border border-[#2563EB] px-6 py-1.5 text-[10px] font-semibold text-[#2563EB] transition-all duration-200 hover:bg-[#2563EB] hover:text-white"
            >
              Save Draft
            </button>
          </div>
        </div>

        {/* ===== RIGHT STATUS & HISTORY SIDEBARS ===== */}
        <div className="flex flex-col gap-4">
          {/* Page Status card */}
          <div className={`${CARD} rounded-2xl p-4`}>
            <h3 className="mb-2 text-[12px] font-bold text-[#0F172A]">
              Page Status
            </h3>
            <div className="mb-2">
              <span className={`rounded ${PUBLISHED_CHIP}`}>
                <span className="mr-1 inline-block h-[5px] w-[5px] rounded-full bg-[#16A34A] align-middle" />
                {page.status}
              </span>
            </div>
            <p className="mb-3 text-[9px] leading-tight text-[#94A3B8]">
              This Page Is Live And Visible In The Website
            </p>

            <div className="mb-3">
              <div className="text-[10px] font-bold text-[#0F172A]">
                Published On
              </div>
              <div className="text-[9px] text-[#94A3B8]">
                {page.publishedOn}
              </div>
            </div>

            <button
              onClick={() => toast.info("Unpublish flow coming soon.")}
              className="w-full cursor-pointer rounded-lg border border-[#2563EB] py-1.5 text-[10px] font-semibold text-[#2563EB] transition-all duration-200 hover:bg-[#2563EB] hover:text-white"
            >
              Unpublish
            </button>
          </div>

          {/* Page Information card */}
          <div className={`${CARD} flex flex-col gap-2.5 rounded-2xl p-4`}>
            <h3 className="text-[12px] font-bold text-[#0F172A]">
              Page Information
            </h3>

            <div>
              <div className="text-[10px] font-bold text-[#0F172A]">
                Created By
              </div>
              <div className="text-[9px] text-[#94A3B8]">
                {page.createdBy}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-[#0F172A]">
                Created On
              </div>
              <div className="text-[9px] text-[#94A3B8]">{page.createdOn}</div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-[#0F172A]">
                Last Updated
              </div>
              <div className="text-[9px] text-[#94A3B8]">
                {page.lastUpdated}
              </div>
            </div>
          </div>

          {/* Revision History card */}
          <div className={`${CARD} flex flex-col gap-2.5 rounded-2xl p-4`}>
            <h3 className="text-[12px] font-bold text-[#0F172A]">
              Revision History
            </h3>

            {page.revisions.map((revision) => (
              <div
                key={revision.version}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-[#0F172A]">
                    {revision.version}
                  </div>
                  <div className="text-[8px] text-[#94A3B8]">
                    {revision.date}
                  </div>
                </div>
                <span className="rounded border border-[#86EFAC] bg-[#F0FDF4] px-1.5 py-0.5 text-[7px] font-semibold text-[#16A34A]">
                  {revision.badge}
                </span>
              </div>
            ))}

            <button
              onClick={() => toast.info("Full revision history coming soon.")}
              className="mt-1 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#2563EB] py-1.5 text-[10px] font-semibold text-[#2563EB] transition-all duration-200 hover:bg-[#2563EB] hover:text-white"
            >
              View All History <ArrowRight size={9} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
