"use client";

import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/config/site.config";
import { DashboardApiError, patchDashboardServerSettings } from "@/lib/dashboard-api";
import type { DashboardServer, DashboardSettingGroup } from "@/lib/dashboard-model";
import { DashboardAuthProfileCard } from "@/ui/dashboard/dashboard-auth-profile-card";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardEditActions,
  DashboardField,
  DashboardInlineState,
  DashboardSelect,
  DashboardTextInput,
  getDashboardEditorCopy,
  normalizeListInput,
  normalizeOptionalText
} from "@/ui/dashboard/dashboard-settings-editor";
import { DashboardMessagePanel, DashboardPanel, DashboardSectionHeading } from "@/ui/dashboard/dashboard-primitives";

interface DashboardAccessPageProps {
  locale: Locale;
  onServerChange: (nextServer: DashboardServer) => void;
  server: DashboardServer;
}

interface AccessFormState {
  adminAccess: string;
  allowBotWrite: string;
  allowDashboardWrite: string;
  botManagerRoles: string;
  dashboardAdminRoles: string;
  ownerAccess: string;
}

function renderRows(rows: DashboardSettingGroup[]) {
  return <div className="divide-y divide-white/[0.05]">{rows.map((row) => <div key={row.label} className="py-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{row.label}</p><p className="mt-2 text-sm font-medium text-white/82">{row.value}</p><p className="mt-1 text-sm leading-6 text-white/50">{row.note}</p></div>)}</div>;
}

function renderCard(label: string, value: string) {
  return <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{label}</p><p className="mt-2 text-sm text-white/78">{value}</p></div>;
}

function formatPolicy(value: string | null | undefined) {
  if (!value) return "-";
  switch (value) {
    case "read_write": return "Read & write";
    case "read_only": return "Read only";
    case "none": return "No access";
    default: return value;
  }
}

function formatFlag(value: boolean | null | undefined) {
  if (value === true) return "Allowed";
  if (value === false) return "Blocked";
  return "-";
}

function createAccessForm(server: DashboardServer): AccessFormState {
  const access = server.settingsData?.access;
  return {
    adminAccess: access?.adminAccess ?? "",
    allowBotWrite: access?.allowBotWrite === null || access?.allowBotWrite === undefined ? "" : String(access.allowBotWrite),
    allowDashboardWrite: access?.allowDashboardWrite === null || access?.allowDashboardWrite === undefined ? "" : String(access.allowDashboardWrite),
    botManagerRoles: access?.botManagerRoles.join(", ") ?? "",
    dashboardAdminRoles: access?.dashboardAdminRoles.join(", ") ?? "",
    ownerAccess: access?.ownerAccess ?? ""
  };
}

function normalizeGateValue(value: string): boolean | null {
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

function buildAccessPatch(form: AccessFormState) {
  return {
    adminAccess: normalizeOptionalText(form.adminAccess),
    allowBotWrite: normalizeGateValue(form.allowBotWrite),
    allowDashboardWrite: normalizeGateValue(form.allowDashboardWrite),
    botManagerRoles: normalizeListInput(form.botManagerRoles),
    dashboardAdminRoles: normalizeListInput(form.dashboardAdminRoles),
    ownerAccess: normalizeOptionalText(form.ownerAccess)
  };
}

export function DashboardAccessPage({ locale, onServerChange, server }: DashboardAccessPageProps) {
  const copy = getDashboardCopy(locale);
  const editorCopy = getDashboardEditorCopy(locale);
  const access = server.settingsData?.access;
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; value: string } | null>(null);
  const initialForm = useMemo(() => createAccessForm(server), [server]);
  const [form, setForm] = useState<AccessFormState>(initialForm);

  useEffect(() => {
    if (!isEditing) setForm(initialForm);
  }, [initialForm, isEditing]);

  if (server.access.length === 0) return <DashboardMessagePanel title={copy.accessPage.emptyTitle} body={copy.accessPage.emptyBody} />;

  const initialPatch = buildAccessPatch(initialForm);
  const currentPatch = buildAccessPatch(form);
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
      const nextServer = await patchDashboardServerSettings(server, { access: currentPatch });
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
    <div className="space-y-4">
      <DashboardAuthProfileCard locale={locale} />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.accessPage.title} />
            {renderRows(server.access)}
          </div>
        </DashboardPanel>
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.accessPage.noteTitle} body={copy.accessPage.note} />
            {isEditing ? (
              <div className="grid gap-4 border-t border-white/[0.05] pt-4 sm:grid-cols-2">
                <DashboardField label="Owner policy" hint="What owner-level operators can do in this workspace.">
                  <DashboardSelect value={form.ownerAccess} onChange={(event) => setForm((current) => ({ ...current, ownerAccess: event.target.value }))}>
                    <option value="">Not set</option>
                    <option value="read_write">Read & write</option>
                    <option value="read_only">Read only</option>
                    <option value="none">No access</option>
                  </DashboardSelect>
                </DashboardField>
                <DashboardField label="Admin policy" hint="Current admin default for dashboard surfaces.">
                  <DashboardSelect value={form.adminAccess} onChange={(event) => setForm((current) => ({ ...current, adminAccess: event.target.value }))}>
                    <option value="">Not set</option>
                    <option value="read_write">Read & write</option>
                    <option value="read_only">Read only</option>
                    <option value="none">No access</option>
                  </DashboardSelect>
                </DashboardField>
                <DashboardField label="Dashboard admin roles" hint="Comma-separated role ids or labels.">
                  <DashboardTextInput value={form.dashboardAdminRoles} placeholder="lead-admin, ops" onChange={(event) => setForm((current) => ({ ...current, dashboardAdminRoles: event.target.value }))} />
                </DashboardField>
                <DashboardField label="Bot manager roles" hint="Comma-separated role ids or labels.">
                  <DashboardTextInput value={form.botManagerRoles} placeholder="bot-ops, support" onChange={(event) => setForm((current) => ({ ...current, botManagerRoles: event.target.value }))} />
                </DashboardField>
                <DashboardField label="Dashboard write" hint="Write gate for dashboard edits.">
                  <DashboardSelect value={form.allowDashboardWrite} onChange={(event) => setForm((current) => ({ ...current, allowDashboardWrite: event.target.value }))}>
                    <option value="">Not set</option>
                    <option value="true">Allowed</option>
                    <option value="false">Blocked</option>
                  </DashboardSelect>
                </DashboardField>
                <DashboardField label="Bot write" hint="Write gate for bot-originated changes.">
                  <DashboardSelect value={form.allowBotWrite} onChange={(event) => setForm((current) => ({ ...current, allowBotWrite: event.target.value }))}>
                    <option value="">Not set</option>
                    <option value="true">Allowed</option>
                    <option value="false">Blocked</option>
                  </DashboardSelect>
                </DashboardField>
              </div>
            ) : (
              <>
                <div className="grid gap-3 border-t border-white/[0.05] pt-4 sm:grid-cols-2">
                  {renderCard("Owner policy", formatPolicy(access?.ownerAccess))}
                  {renderCard("Admin policy", formatPolicy(access?.adminAccess))}
                  {renderCard("Owners", access?.ownerCount !== null && access?.ownerCount !== undefined ? String(access.ownerCount) : "-")}
                  {renderCard("Admins", access?.adminCount !== null && access?.adminCount !== undefined ? String(access.adminCount) : "-")}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">Role groups</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-white/64">
                      <p><span className="text-white/42">Dashboard admins:</span> {access?.dashboardAdminRoles?.join(", ") || "-"}</p>
                      <p><span className="text-white/42">Bot managers:</span> {access?.botManagerRoles?.join(", ") || "-"}</p>
                    </div>
                  </div>
                  <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">Write gates</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-white/64">
                      <p><span className="text-white/42">Dashboard:</span> {formatFlag(access?.allowDashboardWrite)}</p>
                      <p><span className="text-white/42">Bot:</span> {formatFlag(access?.allowBotWrite)}</p>
                      <p><span className="text-white/42">Policy version:</span> {access?.policyVersion ?? "-"}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {message ? <DashboardInlineState tone={message.tone}>{message.value}</DashboardInlineState> : null}
            <DashboardEditActions locale={locale} isDirty={isDirty} isEditing={isEditing} isSaving={isSaving} onCancel={cancelEditing} onEdit={startEditing} onSave={saveChanges} />
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
