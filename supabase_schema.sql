-- Resumes table
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  template_id VARCHAR(50) DEFAULT 'modern',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Resume data (JSON storage for flexibility)
CREATE TABLE resume_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE UNIQUE,
  personal_info JSONB,
  work_experience JSONB,
  education JSONB,
  skills JSONB,
  customizations JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Work experience entries
CREATE TABLE work_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  company VARCHAR(255),
  position VARCHAR(255),
  start_date DATE,
  end_date DATE,
  description TEXT,
  "order" INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Education entries
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  institution VARCHAR(255),
  degree VARCHAR(255),
  field VARCHAR(255),
  graduation_date DATE,
  description TEXT,
  "order" INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  skill_name VARCHAR(255),
  proficiency VARCHAR(50),
  "order" INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resumes
CREATE POLICY "Users can view their own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resumes"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes"
  ON resumes FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for resume_data
CREATE POLICY "Users can view their own resume data"
  ON resume_data FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_data.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert resume data for their resumes"
  ON resume_data FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_data.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update resume data for their resumes"
  ON resume_data FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_data.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- RLS Policies for work_experience
CREATE POLICY "Users can view their own work experience"
  ON work_experience FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = work_experience.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert work experience"
  ON work_experience FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = work_experience.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update work experience"
  ON work_experience FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = work_experience.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete work experience"
  ON work_experience FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = work_experience.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- RLS Policies for education
CREATE POLICY "Users can view their own education"
  ON education FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = education.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert education"
  ON education FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = education.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update education"
  ON education FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = education.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete education"
  ON education FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = education.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- RLS Policies for skills
CREATE POLICY "Users can view their own skills"
  ON skills FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = skills.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert skills"
  ON skills FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = skills.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update skills"
  ON skills FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = skills.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete skills"
  ON skills FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = skills.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resume_data_resume_id ON resume_data(resume_id);
CREATE INDEX idx_work_experience_resume_id ON work_experience(resume_id);
CREATE INDEX idx_education_resume_id ON education(resume_id);
CREATE INDEX idx_skills_resume_id ON skills(resume_id);
