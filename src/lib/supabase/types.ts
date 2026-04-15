export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          event_type: "talk" | "workshop" | "hackathon" | "panel" | "other"
          speaker_name: string | null
          speaker_bio: string | null
          speaker_photo_url: string | null
          speaker_linkedin: string | null
          speaker_company: string | null
          date: string
          venue: string | null
          registration_limit: number | null
          banner_url: string | null
          recording_url: string | null
          tags: string[]
          is_published: boolean
          is_past: boolean
          created_at: string
        }
        Insert: {
          title: string
          slug: string
          description: string
          event_type: "talk" | "workshop" | "hackathon" | "panel" | "other"
          date: string
          speaker_name?: string | null
          speaker_bio?: string | null
          speaker_photo_url?: string | null
          speaker_linkedin?: string | null
          speaker_company?: string | null
          venue?: string | null
          registration_limit?: number | null
          banner_url?: string | null
          recording_url?: string | null
          tags?: string[]
          is_published?: boolean
          is_past?: boolean
        }
      }
      members: {
        Row: {
          id: string
          clerk_id: string | null
          full_name: string
          email: string | null
          avatar_url: string | null
          bio: string | null
          role: "admin" | "member"
          generation: 1 | 2 | 3 | 4
          generation_label: string | null
          is_active: boolean
          batch_year: number | null
          branch: string | null
          skills: string[]
          position_in_club: string | null
          linkedin_url: string | null
          github_url: string | null
          twitter_url: string | null
          is_public: boolean
          created_at: string
        }
      }
      sponsors: {
        Row: {
          id: string
          company_name: string
          logo_url: string | null
          tier: "gold" | "silver" | "bronze" | "partner"
          website_url: string | null
          contact_email: string | null
          year: number | null
          is_active: boolean
          collab_type: string | null
          notes: string | null
          pipeline_stage: string
        }
      }
      registrations: {
        Row: {
          id: string
          event_id: string
          member_id: string
          registered_at: string
        }
        Insert: {
          event_id: string
          member_id: string
        }
      }
      sponsor_leads: {
        Row: {
          id: string
          company_name: string
          contact_name: string
          contact_email: string
          contact_phone: string | null
          website_url: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          company_name: string
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          website_url?: string | null
          message?: string | null
        }
      }
    }
  }
}
