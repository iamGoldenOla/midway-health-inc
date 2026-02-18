// TypeScript types for Supabase database schema
// Auto-generated from database structure

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string | null
                    featured_image: string | null
                    featured_image_url: string | null
                    category: string | null
                    tags: string[] | null
                    published: boolean
                    meta_title: string | null
                    meta_description: string | null
                    og_image: string | null
                    focus_keyword: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    content?: string
                    excerpt?: string | null
                    featured_image?: string | null
                    featured_image_url?: string | null
                    category?: string | null
                    tags?: string[] | null
                    published?: boolean
                    meta_title?: string | null
                    meta_description?: string | null
                    og_image?: string | null
                    focus_keyword?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    content?: string
                    excerpt?: string | null
                    featured_image?: string | null
                    featured_image_url?: string | null
                    category?: string | null
                    tags?: string[] | null
                    published?: boolean
                    meta_title?: string | null
                    meta_description?: string | null
                    og_image?: string | null
                    focus_keyword?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            services: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string
                    icon: string | null
                    image: string | null
                    features: string[] | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    description: string
                    icon?: string | null
                    image?: string | null
                    features?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    description?: string
                    icon?: string | null
                    image?: string | null
                    features?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
            }

            contact_messages: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string | null
                    message: string
                    created_at: string
                    status: 'New' | 'Reviewed' | 'Contacted'
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    phone?: string | null
                    message: string
                    created_at?: string
                    status?: 'New' | 'Reviewed' | 'Contacted'
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    phone?: string | null
                    message?: string
                    created_at?: string
                    status?: 'New' | 'Reviewed' | 'Contacted'
                }
            }
            consultations: {
                Row: {
                    id: string
                    full_name: string
                    age: string | null
                    phone: string
                    email: string
                    care_type: string
                    description: string
                    urgency: 'immediate' | 'few-days' | 'week' | 'exploring'
                    preferred_contact: 'phone' | 'email'
                    created_at: string
                    status: 'New' | 'Reviewed' | 'Contacted' | 'Scheduled' | 'Closed'
                }
                Insert: {
                    id?: string
                    full_name: string
                    age?: string | null
                    phone: string
                    email: string
                    care_type: string
                    description: string
                    urgency: 'immediate' | 'few-days' | 'week' | 'exploring'
                    preferred_contact: 'phone' | 'email'
                    created_at?: string
                    status?: 'New' | 'Reviewed' | 'Contacted' | 'Scheduled' | 'Closed'
                }
                Update: {
                    id?: string
                    full_name?: string
                    age?: string | null
                    phone?: string
                    email?: string
                    care_type?: string
                    description?: string
                    urgency?: 'immediate' | 'few-days' | 'week' | 'exploring'
                    preferred_contact?: 'phone' | 'email'
                    created_at?: string
                    status?: 'New' | 'Reviewed' | 'Contacted' | 'Scheduled' | 'Closed'
                }
            }
            appointments: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string
                    service_requested: string | null
                    preferred_date: string | null
                    message: string | null
                    created_at: string
                    status: 'New' | 'Confirmed' | 'Completed' | 'Cancelled'
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    phone: string
                    service_requested?: string | null
                    preferred_date?: string | null
                    message?: string | null
                    created_at?: string
                    status?: 'New' | 'Confirmed' | 'Completed' | 'Cancelled'
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    phone?: string
                    service_requested?: string | null
                    preferred_date?: string | null
                    message?: string | null
                    created_at?: string
                    status?: 'New' | 'Confirmed' | 'Completed' | 'Cancelled'
                }
            }
            job_applications: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string
                    position: string
                    resume_url: string | null
                    cover_letter: string | null
                    created_at: string
                    status: 'New' | 'Reviewed' | 'Interviewed' | 'Rejected' | 'Hired'
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    phone: string
                    position: string
                    resume_url?: string | null
                    cover_letter?: string | null
                    created_at?: string
                    status?: 'New' | 'Reviewed' | 'Interviewed' | 'Rejected' | 'Hired'
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    phone?: string
                    position?: string
                    resume_url?: string | null
                    cover_letter?: string | null
                    created_at?: string
                    status?: 'New' | 'Reviewed' | 'Interviewed' | 'Rejected' | 'Hired'
                }
            }
            newsletter: {
                Row: {
                    id: string
                    email: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    email: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    created_at?: string
                }
            }
        }
    }
}
