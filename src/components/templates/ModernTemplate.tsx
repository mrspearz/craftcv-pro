import React from 'react';
import { Mail, Phone, MapPin, Calendar, User } from 'lucide-react';
import type { TemplateProps } from '../../types';

export const ModernTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills, interests } = data;
  const { colors, fonts } = config;

  const dotsForLevel = (level: string) => {
    switch (level) {
      case 'Expert':
        return 10;
      case 'Advanced':
        return 8;
      case 'Intermediate':
        return 6;
      default:
        return 4;
    }
  };

  const softSkills = skills.filter(s => s.category.toLowerCase().includes('soft'));

  return (
    <div
      data-resume-template="modern"
      className="bg-white min-h-[297mm] w-[210mm] mx-auto print:shadow-none print:w-full print:h-full relative"
      style={{ fontFamily: fonts.body }}
    >
      <div className="grid grid-cols-12 min-h-full">
        {/* LEFT SIDEBAR */}
        <div
          className="col-span-4 text-white relative"
          style={{ backgroundColor: colors.primary }}
        >
          {/* Header area with name */}
          <div className="px-6 pt-8 pb-14">
            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: fonts.heading }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
          </div>

          {/* Photo overlapping header */}
          <div className="absolute left-1/2 -translate-x-1/2 top-20">
            {personalInfo.profilePicture ? (
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={personalInfo.profilePicture}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-36 h-36 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                <User className="w-16 h-16 opacity-80" />
              </div>
            )}
          </div>

          <div className="pt-40 px-6 pb-8 space-y-8">
            {/* Contact */}
            <div>
              <h3 className="uppercase text-xs font-semibold tracking-wider opacity-90">Contact</h3>
              <div className="h-px bg-white/40 my-2" />
              <div className="space-y-2 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.dateOfBirth && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{personalInfo.dateOfBirth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Strengths / Soft skills */}
            {softSkills.length > 0 && (
              <div>
                <h3 className="uppercase text-xs font-semibold tracking-wider opacity-90">Strengths</h3>
                <div className="h-px bg-white/40 my-2" />
                <ul className="space-y-1 text-sm">
                  {softSkills.slice(0, 6).map((s) => (
                    <li key={s.id} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }} />
                      <span>{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hobbies & Interests */}
            {interests.length > 0 && (
              <div>
                <h3 className="uppercase text-xs font-semibold tracking-wider opacity-90">Hobbies & Interests</h3>
                <div className="h-px bg-white/40 my-2" />
                <ul className="space-y-1 text-sm">
                  {interests.slice(0, 6).map((i) => (
                    <li key={i.id} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }} />
                      <span>{i.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-8 bg-white p-10">
          {/* Name and Title */}
          <div className="mb-8">
            <h1
              className="text-5xl font-bold leading-tight"
              style={{ fontFamily: fonts.heading, color: colors.text }}
            >
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.title && (
              <p className="text-xl font-medium mt-1" style={{ color: colors.primary }}>
                {personalInfo.title}
              </p>
            )}
            <div className="mt-4 h-1 w-20 rounded-full" style={{ backgroundColor: colors.primary }} />
          </div>

          {/* Profile / Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h3 className="text-lg font-bold tracking-wide mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                Profile
              </h3>
              <p className="leading-relaxed" style={{ color: colors.text }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold tracking-wide mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold" style={{ color: colors.text }}>{edu.degree}</p>
                      <p className="text-sm opacity-80">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    </div>
                    <div className="text-sm opacity-80 whitespace-nowrap">
                      {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Courses & Certifications */}
          {data.certifications.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold tracking-wide mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                Courses & Certifications
              </h3>
              <div className="space-y-3">
                {data.certifications.map((c) => (
                  <div key={c.id} className="flex items-start justify-between">
                    <div>
                      <p className="font-medium" style={{ color: colors.text }}>{c.name}</p>
                      <p className="text-sm opacity-80">{c.issuer}</p>
                    </div>
                    <div className="text-sm opacity-80 whitespace-nowrap">{c.date}{c.expiryDate ? ` — ${c.expiryDate}` : ''}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold tracking-wide mb-4" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                Work Experience
              </h3>
              <div className="space-y-6">
                {workExperience.map((job) => (
                  <div key={job.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold" style={{ color: colors.text }}>{job.jobTitle}</p>
                        <p className="text-sm opacity-80">{job.company}{job.location ? `, ${job.location}` : ''}</p>
                      </div>
                      <div className="text-sm opacity-80 whitespace-nowrap">
                        {job.startDate} — {job.current ? 'Present' : job.endDate}
                      </div>
                    </div>
                    {job.description && (
                      <p className="mt-2 leading-relaxed" style={{ color: colors.text }}>
                        {job.description}
                      </p>
                    )}
                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {job.achievements.map((a, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: colors.primary }} />
                            <span className="leading-relaxed" style={{ color: colors.text }}>{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills with dot ratings */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold tracking-wide mb-4" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                Skills
              </h3>
              <div className="space-y-5">
                {Object.entries(
                  skills.reduce((acc, s) => {
                    if (!acc[s.category]) acc[s.category] = [] as typeof skills;
                    acc[s.category].push(s);
                    return acc;
                  }, {} as Record<string, typeof skills>)
                ).map(([category, list]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold mb-2" style={{ color: colors.text }}>{category}</h4>
                    <div className="space-y-2">
                      {list.map((s) => (
                        <div key={s.id} className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: colors.text }}>{s.name}</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <span
                                key={i}
                                className="inline-block w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: i < dotsForLevel(s.level) ? colors.primary : '#E5E7EB',
                                  opacity: i < dotsForLevel(s.level) ? 1 : 0.7,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
