import { supabase } from '../lib/supabaseClient';

export interface ResumeSaveData {
  title: string;
  templateId: string;
  personalInfo: any;
  workExperience: any[];
  education: any[];
  skills: any[];
  customizations: any;
}

export const resumeService = {
  async saveResume(data: ResumeSaveData) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      // Check if resume exists
      let resumeId: string;
      const { data: existingResume } = await supabase
        .from('resumes')
        .select('id')
        .eq('user_id', user.id)
        .eq('title', data.title)
        .single()
        .catch(() => ({ data: null }));

      if (existingResume) {
        // Update existing resume
        resumeId = existingResume.id;
        const { error } = await supabase
          .from('resumes')
          .update({
            template_id: data.templateId,
            updated_at: new Date(),
          })
          .eq('id', resumeId);

        if (error) throw error;
      } else {
        // Create new resume
        const { data: newResume, error } = await supabase
          .from('resumes')
          .insert({
            user_id: user.id,
            title: data.title,
            template_id: data.templateId,
          })
          .select()
          .single();

        if (error) throw error;
        resumeId = newResume.id;
      }

      // Save resume data
      const { error: dataError } = await supabase.from('resume_data').upsert({
        resume_id: resumeId,
        personal_info: data.personalInfo,
        work_experience: data.workExperience,
        education: data.education,
        skills: data.skills,
        customizations: data.customizations,
        updated_at: new Date(),
      });

      if (dataError) throw dataError;

      return { success: true, resumeId };
    } catch (error) {
      console.error('Error saving resume:', error);
      return { success: false, error };
    }
  },

  async getResumes() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      return [];
    }
  },

  async getResumeData(resumeId: string) {
    try {
      const { data, error } = await supabase
        .from('resume_data')
        .select('*')
        .eq('resume_id', resumeId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching resume data:', error);
      return null;
    }
  },

  async deleteResume(resumeId: string) {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting resume:', error);
      return { success: false, error };
    }
  },
};
