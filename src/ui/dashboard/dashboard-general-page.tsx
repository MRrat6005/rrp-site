"use client";

import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/config/site.config";
import { DashboardApiError, patchDashboardServerSettings } from "@/lib/dashboard-api";
import type { DashboardServer, DashboardSettingGroup } from "@/lib/dashboard-model";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardDiscordSyncPanel } from "@/ui/dashboard/dashboard-discord-structure";
import {
  DashboardEditActions,
  DashboardField,
  DashboardInlineState,
  DashboardTextInput,
  DashboardTextarea,
  getDashboardEditorCopy,
  normalizeOptionalText
} from "@/ui/dashboard/dashboard-settings-editor";
import { DashboardPanel, DashboardSectionHeading } from "@/ui/dashboard/dashboard-primitives";
import { useDashboardDiscordStructure } from "@/ui/dashboard/use-dashboard-discord-structure";

interface DashboardGeneralPageProps {
  locale: Locale;
  onServerChange: (nextServer: DashboardServer) => void;
  server: DashboardServer;
}

interface GeneralFormState {
  contactEmail: string;
  name: string;
  notes: string;
  supportUrl: string;
}

function renderRows(rows: DashboardSettingGroup[]) {
  return <div className="divide-y divide-white/[0.05]">{rows.map((row) => <div key={row.label} className="py-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{row.label}</p><p className="mt-2 text-sm font-medium text-white/82">{row.value}</p><p className="mt-1 text-sm leading-6 text-white/50">{row.note}</p></div>)}</div>;
}

function renderCard(label: string, value: string) {
  return <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{label}</p><p className="mt-2 text-sm text-white/78">{value}</p></div>;
}

function formatFlag(value: boolean | null | undefined, trueLabel: string, falseLabel: string) {
  if (value === true) return trueLabel;
  if (value === false) return falseLabel;
  return "-";
}

function createGeneralForm(server: DashboardServer): GeneralFormState {
  const general = server.settingsData?.general;
  return {
    contactEmail: general?.contactEmail ?? "",
    name: general?.name ?? server.name ?? "",
    notes: general?.notes ?? "",
    supportUrl: general?.supportUrl ?? ""
  };
}

function buildGeneralPatch(form: GeneralFormState) {
  return {
    contactEmail: normalizeOptionalText(form.contactEmail),
    name: form.name.trim(),
    notes: normalizeOptionalText(form.notes),
    supportUrl: normalizeOptionalText(form.supportUrl)
  };
}

export function DashboardGeneralPage({ locale, onServerChange, server }: DashboardGeneralPageProps) {
  const copy = getDashboardCopy(locale);
  const editorCopy = getDashboardEditorCopy(locale);
  const general = server.settingsData?.general;
  const discord = useDashboardDiscordStructure(server.id, server.accessLevel !== "none");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; value: string } | null>(null);
  const initialForm = useMemo(() => createGeneralForm(server), [server]);
  const [form, setForm] = useState<GeneralFormState>(initialForm);

  useEffect(() => {
    if (!isEditing) setForm(initialForm);
  }, [initialForm, isEditing]);

  const initialPatch = buildGeneralPatch(initialForm);
  const currentPatch = buildGeneralPatch(form);
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
    if (!currentPatch.name) {
      setMessage({ tone: "error", value: editorCopy.requiredName });
      return;
    }

    setIsSaving(true);
    setMessage(null);
    try {
      const nextServer = await patchDashboardServerSettings(server, { general: currentPatch });
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
          <DashboardSectionHeading title={copy.general.title} />
          {server.general.length > 0 ? renderRows(server.general) : <p className="text-sm leading-6 text-white/52">{copy.general.emptyBody}</p>}
        </div>
      </DashboardPanel>
      <div className="space-y-4">
        <DashboardPanel className="p-5 sm:p-6">
          <DashboardDiscordSyncPanel
            locale={locale}
            structure={discord.data}
            isLoading={discord.isLoading}
            isRefreshing={discord.isRefreshing}
            error={discord.error}
            onRefresh={discord.requestRefresh}
            body="General keeps the existing clean edit flow. Discord structure is shown here only as sync context."
          />
        </DashboardPanel>
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.general.noteTitle} body={copy.general.note} />
            {isEditing ? (
              <div className="grid gap-4 border-t border-white/[0.05] pt-4">
                <DashboardField label="Name" hint="Primary server label shown in the dashboard.">
                  <DashboardTextInput value={form.name} maxLength={120} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
                </DashboardField>
                <DashboardField label="Contact email" hint="A simple contact point for ops or support.">
                  <DashboardTextInput type="email" value={form.contactEmail} placeholder="ops@example.com" onChange={(event) => setForm((current) => ({ ...current, contactEmail: event.target.value }))} />
                </DashboardField>
                <DashboardField label="Support URL" hint="Optional link to support docs or a contact surface.">
                  <DashboardTextInput type="url" value={form.supportUrl} placeholder="https://" onChange={(event) => setForm((current) => ({ ...current, supportUrl: event.target.value }))} />
                </DashboardField>
                <DashboardField label="Notes" hint="Short internal context shown in the dashboard summary.">
                  <DashboardTextarea value={form.notes} placeholder="Operational note" onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
                </DashboardField>
              </div>
            ) : (
              <div className="grid gap-3 border-t border-white/[0.05] pt-4 sm:grid-cols-2">
                {renderCard("Name", general?.name || server.name || "-")}
                {renderCard("Contact", general?.contactEmail ?? "-")}
                {renderCard("Support", general?.supportUrl ?? "-")}
                {renderCard("Notes", general?.notes ?? "-")}
                {renderCard("Dashboard", formatFlag(general?.dashboardEnabled, "Enabled", "Disabled"))}
                {renderCard("Bot sync", formatFlag(general?.botSyncEnabled, "Enabled", "Disabled"))}
              </div>
            )}
            {message ? <DashboardInlineState tone={message.tone}>{message.value}</DashboardInlineState> : null}
            <DashboardEditActions locale={locale} isDirty={isDirty} isEditing={isEditing} isSaving={isSaving} onCancel={cancelEditing} onEdit={startEditing} onSave={saveChanges} />
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
