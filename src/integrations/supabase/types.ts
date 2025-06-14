export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      apps: {
        Row: {
          created_at: string | null
          icon: string
          id: string
          is_system: boolean | null
          name: string
          type: string
        }
        Insert: {
          created_at?: string | null
          icon: string
          id?: string
          is_system?: boolean | null
          name: string
          type: string
        }
        Update: {
          created_at?: string | null
          icon?: string
          id?: string
          is_system?: boolean | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      calls: {
        Row: {
          call_time: string | null
          call_type: string
          duration: number | null
          from_number: string
          id: string
          is_read: boolean | null
          phone_number_id: string
          to_number: string
        }
        Insert: {
          call_time?: string | null
          call_type: string
          duration?: number | null
          from_number: string
          id?: string
          is_read?: boolean | null
          phone_number_id: string
          to_number: string
        }
        Update: {
          call_time?: string | null
          call_type?: string
          duration?: number | null
          from_number?: string
          id?: string
          is_read?: boolean | null
          phone_number_id?: string
          to_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "calls_phone_number_id_fkey"
            columns: ["phone_number_id"]
            isOneToOne: false
            referencedRelation: "temp_phone_numbers"
            referencedColumns: ["id"]
          },
        ]
      }
      desktop_settings: {
        Row: {
          background_url: string | null
          created_at: string | null
          id: string
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          background_url?: string | null
          created_at?: string | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          background_url?: string | null
          created_at?: string | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          from_number: string
          id: string
          is_read: boolean | null
          phone_number_id: string
          received_at: string | null
          to_number: string
        }
        Insert: {
          content: string
          from_number: string
          id?: string
          is_read?: boolean | null
          phone_number_id: string
          received_at?: string | null
          to_number: string
        }
        Update: {
          content?: string
          from_number?: string
          id?: string
          is_read?: boolean | null
          phone_number_id?: string
          received_at?: string | null
          to_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_phone_number_id_fkey"
            columns: ["phone_number_id"]
            isOneToOne: false
            referencedRelation: "temp_phone_numbers"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          is_active: boolean | null
          max_numbers: number
          plan_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          max_numbers: number
          plan_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          max_numbers?: number
          plan_name?: string
          user_id?: string
        }
        Relationships: []
      }
      temp_phone_numbers: {
        Row: {
          area_code: string
          created_at: string | null
          expires_at: string
          id: string
          is_active: boolean | null
          location: string | null
          phone_number: string
          user_id: string
        }
        Insert: {
          area_code: string
          created_at?: string | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          phone_number: string
          user_id: string
        }
        Update: {
          area_code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          phone_number?: string
          user_id?: string
        }
        Relationships: []
      }
      user_apps: {
        Row: {
          app_id: string
          created_at: string | null
          id: string
          is_on_desktop: boolean | null
          is_on_taskbar: boolean | null
          position_x: number | null
          position_y: number | null
          user_id: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          id?: string
          is_on_desktop?: boolean | null
          is_on_taskbar?: boolean | null
          position_x?: number | null
          position_y?: number | null
          user_id: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          id?: string
          is_on_desktop?: boolean | null
          is_on_taskbar?: boolean | null
          position_x?: number | null
          position_y?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_apps_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          extra_data: Json | null
          id: string
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          extra_data?: Json | null
          id?: string
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          extra_data?: Json | null
          id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
