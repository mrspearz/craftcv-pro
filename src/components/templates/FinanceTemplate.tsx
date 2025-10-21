import React from 'react';
import type { TemplateProps } from '../../types';

export const FinanceTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills, certifications } = data;
  const { colors, fonts } = config;

  return (
    <div 
      className="max-w-4xl mx-auto bg-white shadow-lg min-h-[297mm] w-[210mm] print:shadow-none print:w-full print:h-full"
      style={{ fontFamily: fonts.body }}
    >
      <div className="p-8">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6" style={{ borderColor: colors.secondary }}>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: fonts.heading, color: colors.text }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-lg font-medium mb-2" style={{ color: colors.primary }}>
              {personalInfo.title}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3 text-sm" style={{ color: colors.secondary }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>•</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.text, fontFamily: fonts.heading }}>
              Professional Summary
            </h2>
            <p className="leading-relaxed text-justify" style={{ color: colors.text }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.text, fontFamily: fonts.heading }}>
              Professional Experience
            </h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-5 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg" style={{ color: colors.text }}>{exp.jobTitle}</h3>
                    <p className="font-semibold" style={{ color: colors.primary }}>{exp.company}, {exp.location}</p>
                  </div>
                  <div className="font-medium" style={{ color: colors.secondary }}>
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                </div>
                {exp.description && (
                  <div className="ml-4" style={{ color: colors.text }}>
                    {exp.description.split('\n').map((item, i) => (
                      <p key={i} className="leading-relaxed text-sm mb-1">• {item}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.text, fontFamily: fonts.heading }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold" style={{ color: colors.text }}>{edu.degree}</h3>
                    <p style={{ color: colors.primary }}>{edu.institution}, {edu.location}</p>
                    {edu.gpa && <p style={{ color: colors.secondary }}>GPA: {edu.gpa}</p>}
                  </div>
                  <div className="font-medium" style={{ color: colors.secondary }}>
                    <p>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.text, fontFamily: fonts.heading }}>
                Core Competencies
              </h2>
              <ul className="space-y-1" style={{ color: colors.text }}>
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.secondary }}></span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.text, fontFamily: fonts.heading }}>
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <h3 className="font-semibold" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-sm" style={{ color: colors.primary }}>{cert.issuer}</p>
                  <p className="text-sm" style={{ color: colors.secondary }}>{cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};