"use client";

import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/config/site.config";
import { DashboardApiError, patchDashboardServerSettings } from "@/lib/dashboard-api";
import type { DashboardServer, DashboardSettingGroup } from "@/lib/dashboard-model";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardEditActions,
  DashboardField,
  DashboardInlineState,
  DashboardTextInput,
  getDashboardEditorCopy,
  normalizeLocaleCode,
  normalizeLocaleListInput,
  normalizeOptionalText
} from "@/ui/dashboard/dashboard-settings-editor";
import { DashboardMessagePanel, DashboardPanel, DashboardSectionHeading } from "@/ui/dashboard/dashboard-primitives";

interface DashboardLocalizationPageProps {
  locale: Locale;
  onServerChange: (nextServer: DashboardServer) => void;
  server: DashboardServer;
}

interface LocalizationFormState {
  defaultLocale: string;
  fallbackLocale: string;
  preferredLocale: string;
  supportedLocales: string;
  timezone: string;
}

function renderRows(rows: DashboardSettingGroup[]) {
  return <div className="divide-y divide-white/[0.05]">{rows.map((row) => <div key={row.label} className="py-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{row.label}</p><p className="mt-2 text-sm font-medium text-white/82">{row.value}</p><p className="mt-1 text-sm leading-6 text-white/50">{row.note}</p></div>)}</div>;
}

function renderCard(label: string, value: string) {
  return <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{label}</p><p className="mt-2 text-sm text-white/78">{value}</p></div>;
}

function createLocalizationForm(server: DashboardServer): LocalizationFormState {
  const localization = server.settingsData?.localization;
  return {
    defaultLocale: localization?.defaultLocale ?? "",
    fallbackLocale: localization?.fallbackLocale ?? "",
    preferredLocale: localization?.preferredLocale ?? "",
    supportedLocales: localization?.supportedLocales.join(", ") ?? "",
    timezone: localization?.timezone ?? ""
  };
}

function buildLocalizationPatch(form: LocalizationFormState) {
  return {
    defaultLocale: normalizeLocaleCode(form.defaultLocale),
    fallbackLocale: normalizeLocaleCode(form.fallbackLocale),
    preferredLocale: normalizeLocaleCode(form.preferredLocale),
    supportedLocales: normalizeLocaleListInput(form.supportedLocales),
    timezone: normalizeOptionalText(form.timezone)
  };
}

export function DashboardLocalizationPage({ locale, onServerChange, server }: DashboardLocalizationPageProps) {
  const copy = getDashboardCopy(locale);
  const editorCopy = getDashboardEditorCopy(locale);
  const localization = server.settingsData?.localization;
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; value: string } | null>(null);
  const initialForm = useMemo(() => createLocalizationForm(server), [server]);
  const [form, setForm] = useState<LocalizationFormState>(initialForm);

  useEffect(() => {
    if (!isEditing) setForm(initialForm);
  }, [initialForm, isEditing]);

  if (server.localization.length === 0) return <DashboardMessagePanel title={copy.localizationPage.emptyTitle} body={copy.localizationPage.emptyBody} />;

  const initialPatch = buildLocalizationPatch(initialForm);
  const currentPatch = buildLocalizationPatch(form);
  const isDirty = JSON.stringify(currentPatch) !== JSON.stringify(initialPatch);

  const startEditing = () => {
    setForm(initialForm);
    setMessage(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setForm(initialForm);
    setMessage(null);
    setIsEditing(false);
  };

  const saveChanges = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const nextServer = await patchDashboardServerSettings(server, { localization: currentPatch });
      onServerChange(nextServer);
      setIsEditing(false);
      setMessage({ tone: "success", value: editorCopy.saved });
    } catch (error) {
      if (error instanceof DashboardApiError && error.status === 403) {
        onServerChange({ ...server, accessLevel: "none" });
        return;
      }
      setMessage({ tone: "error", value: error instanceof DashboardApiError && error.status === 403 ? editorCopy.locked : editorCopy.saveError });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <DashboardPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <DashboardSectionHeading title={copy.localizationPage.title} />
          {renderRows(server.localization)}
        </div>
      </DashboardPanel>
      <DashboardPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <DashboardSectionHeading title={copy.localizationPage.noteTitle} body={copy.localizationPage.note} />
          {isEditing ? (
            <div className="grid gap-4 border-t border-white/[0.05] pt-4 sm:grid-cols-2">
              <DashboardField label="Timezone" hint="IANA timezone used for server defaults.">
                <DashboardTextInput value={form.timezone} placeholder="Europe/Kaliningrad" onChange={(event) => setForm((current) => ({ ...current, timezone: event.target.value }))} />
              </DashboardField>
              <DashboardField label="Preferred locale" hint="Primary locale surfaced to the dashboard.">
                <DashboardTextInput value={form.preferredLocale} placeholder="en-US" onChange={(event) => setForm((current) => ({ ...current, preferredLocale: event.target.value }))} />
              </DashboardField>
              <DashboardField label="Default locale" hint="Server default when no explicit preference exists.">
                <DashboardTextInput value={form.defaultLocale} placeholder="en-US" onChange={(event) => setForm((current) => ({ ...current, defaultLocale: event.target.value }))} />
              </DashboardField>
              <DashboardField label="Fallback locale" hint="Last fallback when a translation is missing.">
                <DashboardTextInput value={form.fallbackLocale} placeholder="en" onChange={(event) => setForm((current) => ({ ...current, fallbackLocale: event.target.value }))} />
              </DashboardField>
              <div className="sm:col-span-2">
                <DashboardField label="Supported locales" hint="Comma-separated locale list kept intentionally lightweight.">
                  <DashboardTextInput value={form.supportedLocales} placeholder="en-US, ru-RU" onChange={(event) => setForm((current) => ({ ...current, supportedLocales: event.target.value }))} />
                </DashboardField>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-3 border-t border-white/[0.05] pt-4 sm:grid-cols-2">
                {renderCard("Timezone", localization?.timezone ?? "-")}
                {renderCard("Preferred", localization?.preferredLocale ?? "-")}
                {renderCard("Default", localization?.defaultLocale ?? "-")}
                {renderCard("Fallback", localization?.fallbackLocale ?? "-")}
                {renderCard("Locales", localization?.supportedLocales?.length ? String(localization.supportedLocales.length) : "0")}
                {renderCard("Translations", localization?.translationsVersion ?? "-")}
              </div>
              <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4 text-sm leading-6 text-white/64">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">Supported locales</p>
                <p className="mt-3">{localization?.supportedLocales?.join(", ") || "-"}</p>
              </div>
            </>
          )}
          {message ? <DashboardInlineState tone={message.tone}>{message.value}</DashboardInlineState> : null}
          <DashboardEditActions locale={locale} isDirty={isDirty} isEditing={isEditing} isSaving={isSaving} onCancel={cancelEditing} onEdit={startEditing} onSave={saveChanges} />
        </div>
      </DashboardPanel>
    </div>
  );
}
