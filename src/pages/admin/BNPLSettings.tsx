"use client"

import React, { useEffect, useState } from "react"
import { getCurrentBNPLSettings, updateBNPLSettings } from "@/store/actions/admin/settings"
import { ISettings } from "@/utils/types/settingsTypes"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { toast } from "react-hot-toast"

const BNPLSettingsPage = () => {
  const [settings, setSettings] = useState<ISettings | null>(null)
  const [value, setValue] = useState<string>("")
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    getCurrentBNPLSettings({
      handleDone: (resp) => {
        const data = resp?.data || resp
        // normalize shape
        if (data) {
          setSettings(data as ISettings)
          setValue(String((data as ISettings).daily_threshold || ""))
        }
      },
    })
  }, [])

  const handleSubmit = () => {
    const parsed = Number(value)
    if (Number.isNaN(parsed) || parsed < 0) {
      toast.error("Please enter a valid non-negative number for daily threshold")
      return
    }
    setSaving(true)
    updateBNPLSettings({
      body: { daily_threshold: parsed },
      handleDone: (resp) => {
        toast.success(resp?.message || "Settings updated")
        // refresh
        getCurrentBNPLSettings({ handleDone: (r) => { setSettings(r?.data || r); setValue(String((r?.data || r)?.daily_threshold || parsed)); }, handleError: () => { }, isSilent: true })
        setSaving(false)
      },
      handleError: () => {
        toast.error("Failed to update settings")
        setSaving(false)
      }
    })
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow px-6 py-6">
        <h1 className="text-2xl font-semibold mb-2">BNPL Settings</h1>
        <p className="text-sm text-[#666] mb-6">Manage global BNPL configuration for your platform.</p>


        <div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-[#222] mb-2">Daily threshold</label>
              <Input
                name="daily_threshold"
                value={value}
                placeholder="Enter daily threshold"
                onChange={(n, v) => setValue(String(v))}
                type="number"
                min={0}
              />
              <p className="text-xs text-[#666] mt-2">Users will not be allowed to create new BNPL transactions above this threshold per day.</p>
            </div>

            <div className="flex gap-3 mt-3">
              <Button
                label="Save changes"
                type="contained"
                onClick={handleSubmit}
                disabled={saving}
                className="!px-6 !m-0 flex-1 !w-fit" />
              <Button
                label="Reset"
                type="flat"
                onClick={() => { setValue(String(settings?.daily_threshold ?? "")) }}
                disabled={saving}
                className="!px-6 !m-0 flex-1 !w-fit" />
            </div>

            {settings && (
              <div className="mt-6 text-sm text-[#444]">
                <p>Created: <span className="text-[#666]">{new Date(settings.created_at).toLocaleString()}</span></p>
                <p>Last updated: <span className="text-[#666]">{new Date(settings.updated_at).toLocaleString()}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BNPLSettingsPage