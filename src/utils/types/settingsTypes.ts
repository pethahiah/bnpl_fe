export interface ISettings {
  daily_threshold: number,
  created_at: string,
  updated_at: string
}

export interface ISettingsActionBody {
  daily_threshold: number
} 