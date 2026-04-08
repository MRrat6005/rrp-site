import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import type { Locale } from "@/config/site.config";
import { cx } from "@/ui/dashboard/dashboard-primitives";

const editorCopy = {
  en: {
    edit: "Edit",
    save: "Save",
    saving: "Saving...",
    cancel: "Cancel",
    saved: "Saved",
    saveError: "Changes could not be saved right now.",
    locked: "This section is locked for updates.",
    requiredName: "Name is required."
  },
  ru: {
    edit: "Edit",
    save: "Save",
    saving: "Сохранение...",
    cancel: "Cancel",
    saved: "Сохранено",
    saveError: "Сейчас не удалось сохранить изменения.",
    locked: "Этот раздел закрыт для обновления.",
    requiredName: "Укажите название."
  }
} as const;

export function getDashboardEditorCopy(locale: Locale) {
  return editorCopy[locale];
}

function getFieldClassName(className?: string) {
  return cx(
    "w-full rounded-[0.95rem] border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white/84 outline-none transition placeholder:text-white/28 focus:border-white/[0.18] focus:bg-white/[0.04] focus:text-white",
    className
  );
}

function getButtonClassName(kind: "primary" | "secondary") {
  return kind === "primary"
    ? "inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
    : "inline-flex items-center justify-center rounded-full border border-white/[0.08] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/64 transition hover:bg-white/[0.03] hover:text-white/82 disabled:cursor-not-allowed disabled:opacity-40";
}

export function DashboardField({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="space-y-2.5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/34">{label}</p>
        {hint ? <p className="mt-1 text-sm leading-6 text-white/46">{hint}</p> : null}
      </div>
      {children}
    </label>
  );
}

export function DashboardTextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={getFieldClassName(props.className)} />;
}

export function DashboardTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={getFieldClassName(cx("min-h-[112px] resize-y", props.className))} />;
}

export function DashboardSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={getFieldClassName(cx("appearance-none", props.className))} />;
}

export function DashboardInlineState({ tone, children }: { tone: "success" | "error" | "muted"; children: ReactNode }) {
  const toneClassName = tone === "success" ? "text-emerald-200/84" : tone === "error" ? "text-rose-200/84" : "text-white/48";
  return <p className={cx("text-sm leading-6", toneClassName)}>{children}</p>;
}

interface DashboardEditActionsProps {
  locale: Locale;
  isDirty: boolean;
  isEditing: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSave: () => void;
}

export function DashboardEditActions({ locale, isDirty, isEditing, isSaving, onCancel, onEdit, onSave }: DashboardEditActionsProps) {
  const copy = getDashboardEditorCopy(locale);

  return isEditing ? (
    <div className="flex flex-wrap gap-2 border-t border-white/[0.05] pt-4">
      <button type="button" onClick={onSave} disabled={isSaving || !isDirty} className={getButtonClassName("primary")}>
        {isSaving ? copy.saving : copy.save}
      </button>
      <button type="button" onClick={onCancel} disabled={isSaving} className={getButtonClassName("secondary")}>
        {copy.cancel}
      </button>
    </div>
  ) : (
    <div className="border-t border-white/[0.05] pt-4">
      <button type="button" onClick={onEdit} className={getButtonClassName("secondary")}>
        {copy.edit}
      </button>
    </div>
  );
}

export function normalizeOptionalText(value: string): string | null {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

export function normalizeListInput(value: string): string[] {
  const seen = new Set<string>();
  const items: string[] = [];
  for (const item of value.split(/[\n,]/)) {
    const normalized = item.trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    items.push(normalized);
  }
  return items;
}

export function normalizeLocaleCode(value: string): string | null {
  const normalized = normalizeOptionalText(value)?.replace(/_/g, "-");
  if (!normalized) return null;
  const [language, region, ...rest] = normalized.split("-");
  const parts = [language.toLowerCase()];
  if (region) parts.push(region.toUpperCase());
  if (rest.length > 0) parts.push(...rest);
  return parts.join("-");
}

export function normalizeLocaleListInput(value: string): string[] {
  const seen = new Set<string>();
  const items: string[] = [];
  for (const item of normalizeListInput(value)) {
    const normalized = normalizeLocaleCode(item);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    items.push(normalized);
  }
  return items;
}
