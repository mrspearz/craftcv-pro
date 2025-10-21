import React from 'react';
import { Mail, Phone, MapPin, Calendar, Star, Zap } from 'lucide-react';
import type { TemplateProps } from '../../types';

export const CreativeTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills } = data;
  const { colors, fonts } = config;

  return (
    <div 
      className="bg-white min-h-[297mm] w-[210mm] mx-auto shadow-xl print:shadow-none print:w-full print:h-full overflow-hidden"
      style={{ fontFamily: fonts.body }}
    >
      {/* Creative Header with Asymmetric Design */}
      <div className="relative">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-90"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
          }}
        ></div>
        
        {/* Decorative Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
            style={{ backgroundColor: colors.accent || colors.secondary }}
          ></div>
          <div 
            className="absolute top-20 -left-5 w-24 h-24 rounded-full opacity-15"
            style={{ backgroundColor: colors.background }}
          ></div>
          <div 
            className="absolute bottom-10 right-20 w-16 h-16 rounded-full opacity-25"
            style={{ backgroundColor: colors.accent || colors.secondary }}
          ></div>
        </div>
        
        <div className="relative z-10 px-8 py-12">
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Name and Title */}
            <div className="col-span-2">
              <div className="mb-6">
                <h1 
                  className="text-5xl font-bold text-white mb-2 leading-tight"
                  style={{ fontFamily: fonts.heading }}
                >
                  {personalInfo.firstName}
                  <br />
                  <span className="text-4xl font-light opacity-90">
                    {personalInfo.lastName}
                  </span>
                </h1>
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-white mr-2" />
                  <h2 className="text-xl font-medium text-white opacity-90">
                    {personalInfo.title}
                  </h2>
                </div>
              </div>
              
              {/* Contact Info - Creative Layout */}
              <div className="space-y-2 text-white">
                {personalInfo.email && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile/Avatar Area - Creative Placeholder */}
            <div className="col-span-1">
              <div className="relative">
                <div 
                  className="w-40 h-40 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 flex items-center justify-center mx-auto"
                >
                  <Star className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="text-center text-white mt-4 opacity-80 text-xs">
                  Creative Professional
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Creative Summary with Quote Design */}
        {personalInfo.summary && (
          <div className="mb-10">
            <div className="relative">
              <div 
                className="absolute -left-2 -top-2 text-6xl font-bold opacity-20"
                style={{ color: colors.primary, fontFamily: fonts.heading }}
              >
                "
              </div>
              <div className="pl-8">
                <h3 
                  className="text-xl font-bold mb-4 flex items-center"
                  style={{ color: colors.primary, fontFamily: fonts.heading }}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  Creative Vision
                </h3>
                <p className="leading-relaxed text-lg italic pl-6" style={{ color: colors.text }}>
                  {personalInfo.summary}
                </p>
              </div>
              <div 
                className="absolute -right-2 bottom-0 text-6xl font-bold opacity-20 rotate-180"
                style={{ color: colors.primary, fontFamily: fonts.heading }}
              >
                "
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="col-span-3">
            {/* Work Experience with Creative Timeline */}
            {workExperience.length > 0 && (
              <div className="mb-10">
                <h3 
                  className="text-2xl font-bold mb-6 flex items-center"
                  style={{ color: colors.primary, fontFamily: fonts.heading }}
                >
                  <div 
                    className="w-1 h-8 mr-4 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  Experience Journey
                </h3>
                
                <div className="relative">
                  {/* Creative timeline line */}
                  <div 
                    className="absolute left-6 top-0 bottom-0 w-0.5 rounded-full"
                    style={{ backgroundColor: colors.secondary + '40' }}
                  ></div>
                  
                  <div className="space-y-8">
                    {workExperience.map((job) => (
                      <div key={job.id} className="relative">
                        {/* Timeline Node */}
                        <div 
                          className="absolute left-4 w-5 h-5 rounded-full border-3 bg-white shadow-lg"
                          style={{ borderColor: colors.primary }}
                        ></div>
                        
                        <div className="ml-14">
                          {/* Creative Job Card */}
                          <div 
                            className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-lg border-l-4"
                            style={{ borderLeftColor: colors.primary }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-lg font-bold" style={{ color: colors.text }}>
                                  {job.jobTitle}
                                </h4>
                                <p 
                                  className="text-lg font-semibold"
                                  style={{ color: colors.primary }}
                                >
                                  {job.company}
                                </p>
                              </div>
                              <div className="text-right">
                                <div 
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                                  style={{ backgroundColor: colors.secondary }}
                                >
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {job.startDate} - {job.current ? 'Now' : job.endDate}
                                </div>
                                {job.location && (
                                  <div className="text-sm text-gray-500 mt-1">{job.location}</div>
                                )}
                              </div>
                            </div>
                            
                            {job.description && (
                              <p className="mb-3 leading-relaxed" style={{ color: colors.text }}>
                                {job.description}
                              </p>
                            )}
                            
                            {job.achievements && job.achievements.length > 0 && (
                              <div className="space-y-2">
                                {job.achievements.map((achievement, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <div 
                                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                      style={{ backgroundColor: colors.secondary }}
                                    ></div>
                                    <span className="text-sm leading-relaxed" style={{ color: colors.text }}>
                                      {achievement}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-8">
                <h3 
                  className="text-2xl font-bold mb-6 flex items-center"
                  style={{ color: colors.primary, fontFamily: fonts.heading }}
                >
                  <div 
                    className="w-1 h-8 mr-4 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  Learning Path
                </h3>
                <div className="grid gap-4">
                  {education.map((edu) => (
                    <div 
                      key={edu.id}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border-l-3"
                      style={{ borderLeftColor: colors.secondary }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold" style={{ color: colors.text }}>
                            {edu.degree}
                          </h4>
                          <p style={{ color: colors.primary }}>
                            {edu.institution}
                          </p>
                        </div>
                        <div className="text-right text-sm" style={{ color: colors.secondary }}>
                          <div>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                          {edu.gpa && <div className="font-medium">GPA: {edu.gpa}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Creative Sidebar */}
          <div className="col-span-2">
            {/* Skills with Creative Progress Bars */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h3 
                  className="text-xl font-bold mb-6 flex items-center"
                  style={{ color: colors.primary, fontFamily: fonts.heading }}
                >
                  <Star className="w-6 h-6 mr-2" />
                  Creative Skills
                </h3>
                <div className="space-y-6">
                  {Object.entries(
                    skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(skill);
                      return acc;
                    }, {} as Record<string, typeof skills>)
                  ).map(([category, categorySkills]) => (
                    <div key={category}>
                      <h4 
                        className="font-bold text-sm mb-4 uppercase tracking-wider flex items-center"
                        style={{ color: colors.secondary }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: colors.secondary }}
                        ></div>
                        {category}
                      </h4>
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium" style={{ color: colors.text }}>
                                {skill.name}
                              </span>
                              <span 
                                className="text-xs px-2 py-1 rounded-full text-white font-medium"
                                style={{ backgroundColor: colors.primary }}
                              >
                                {skill.level}
                              </span>
                            </div>
                            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="absolute left-0 top-0 h-full rounded-full transition-all duration-300 bg-gradient-to-r"
                                style={{
                                  background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                  width: 
                                    skill.level === 'Expert' ? '100%' :
                                    skill.level === 'Advanced' ? '85%' :
                                    skill.level === 'Intermediate' ? '65%' : '45%'
                                }}
                              ></div>
                              <div 
                                className="absolute right-2 top-0 w-1 h-full bg-white opacity-50 rounded-full"
                                style={{
                                  right: 
                                    skill.level === 'Expert' ? '4px' :
                                    skill.level === 'Advanced' ? '15%' :
                                    skill.level === 'Intermediate' ? '35%' : '55%'
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};