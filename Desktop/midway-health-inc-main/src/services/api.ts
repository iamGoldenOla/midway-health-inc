import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Tables = Database['public']['Tables'];

// =====================================================
// BLOG POSTS
// =====================================================

export const blogApi = {
    // Get all blog posts
    async getAll() {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get single blog post by slug
    async getBySlug(slug: string) {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data;
    },

    // Create blog post (admin)
    async create(post: Tables['blog_posts']['Insert']) {
        const { data, error } = await supabase
            .from('blog_posts')
            .insert([post])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update blog post (admin)
    async update(id: string, updates: Tables['blog_posts']['Update']) {
        const { data, error } = await supabase
            .from('blog_posts')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete blog post (admin)
    async delete(id: string) {
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

// =====================================================
// SERVICES
// =====================================================

export const servicesApi = {
    // Get all services
    async getAll() {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('title');

        if (error) throw error;
        return data;
    },

    // Get service by slug
    async getBySlug(slug: string) {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data;
    },

    // Create service (admin)
    async create(service: Tables['services']['Insert']) {
        const { data, error } = await supabase
            .from('services')
            .insert([service])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update service (admin)
    async update(id: string, updates: Tables['services']['Update']) {
        const { data, error } = await supabase
            .from('services')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete service (admin)
    async delete(id: string) {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

// =====================================================
// CONTACT MESSAGES
// =====================================================

export const contactApi = {
    // Submit contact message (public)
    async submit(message: Tables['contact_messages']['Insert']) {
        const { data, error } = await supabase
            .from('contact_messages')
            .insert([message])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get all messages (admin)
    async getAll() {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Update message status (admin)
    async updateStatus(id: string, status: Tables['contact_messages']['Row']['status']) {
        const { data, error } = await supabase
            .from('contact_messages')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete message (admin)
    async delete(id: string) {
        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

// =====================================================
// CONSULTATIONS
// =====================================================

export const consultationsApi = {
    // Submit consultation request (public)
    async submit(consultation: Tables['consultations']['Insert']) {
        const { data, error } = await supabase
            .from('consultations')
            .insert([consultation])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get all consultations (admin)
    async getAll() {
        const { data, error } = await supabase
            .from('consultations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Filter by urgency (admin)
    async getByUrgency(urgency: Tables['consultations']['Row']['urgency']) {
        const { data, error } = await supabase
            .from('consultations')
            .select('*')
            .eq('urgency', urgency)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Update consultation status (admin)
    async updateStatus(id: string, status: Tables['consultations']['Row']['status']) {
        const { data, error } = await supabase
            .from('consultations')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete consultation (admin)
    async delete(id: string) {
        const { error } = await supabase
            .from('consultations')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

// =====================================================
// APPOINTMENTS
// =====================================================

export const appointmentsApi = {
    // Book appointment (public)
    async book(appointment: Tables['appointments']['Insert']) {
        const { data, error } = await supabase
            .from('appointments')
            .insert([appointment])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get all appointments (admin)
    async getAll() {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('preferred_date', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Update appointment status (admin)
    async updateStatus(id: string, status: Tables['appointments']['Row']['status']) {
        const { data, error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete appointment (admin)
    async delete(id: string) {
        const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

// =====================================================
// JOB APPLICATIONS
// =====================================================

export const jobApplicationsApi = {
    // Submit application (public)
    async submit(application: Tables['job_applications']['Insert']) {
        const { data, error } = await supabase
            .from('job_applications')
            .insert([application])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Upload resume to storage
    async uploadResume(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `resumes/${fileName}`;

        const { data, error } = await supabase.storage
            .from('resumes')
            .upload(filePath, file);

        if (error) throw error;
        return data.path;
    },

    // Download resume (admin)
    async downloadResume(resumePath: string) {
        const { data, error } = await supabase.storage
            .from('resumes')
            .download(resumePath);

        if (error) throw error;
        return data;
    },

    // Get all applications (admin)
    async getAll() {
        const { data, error } = await supabase
            .from('job_applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Update application status (admin)
    async updateStatus(id: string, status: Tables['job_applications']['Row']['status']) {
        const { data, error } = await supabase
            .from('job_applications')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete application (admin)
    async delete(id: string) {
        const { error } = await supabase
            .from('job_applications')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

// =====================================================
// NEWSLETTER
// =====================================================

export const newsletterApi = {
    // Subscribe (public)
    async subscribe(email: string) {
        const { data, error } = await supabase
            .from('newsletter')
            .insert([{ email }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get all subscribers (admin)
    async getAll() {
        const { data, error } = await supabase
            .from('newsletter')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Delete subscriber (admin)
    async delete(id: string) {
        const { error } = await supabase
            .from('newsletter')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

// =====================================================
// STORAGE (Blog Images)
// =====================================================

export const storageApi = {
    // Upload blog image
    async uploadBlogImage(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        const { data, error } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file);

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        return publicUrl;
    },

    // Delete blog image
    async deleteBlogImage(filePath: string) {
        const { error } = await supabase.storage
            .from('blog-images')
            .remove([filePath]);

        if (error) throw error;
    },
};

// =====================================================
// AUTHENTICATION
// =====================================================

export const authApi = {
    // Sign in
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Get current session
    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    },

    // Get current user
    async getUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },
};
