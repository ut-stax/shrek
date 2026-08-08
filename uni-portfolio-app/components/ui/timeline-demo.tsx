'use client';

import { useEffect, useState } from 'react';
import { Timeline } from '@/components/ui/timeline';
import { getExperiences } from '@/lib/data';
import type { Experience } from '@/types';

export default function TimelineDemo() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    getExperiences().then((exps) => {
      const sorted = exps.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
      setExperiences(sorted);
    });
  }, []);

  const data = experiences.map((exp: Experience) => {
    const startYear = new Date(exp.start_date).getFullYear();
    const endYear = exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present';
    const title = `${startYear} - ${endYear}`;

    return {
      title,
      content: (
        <div>
          <p className="mb-2 text-sm font-semibold text-black">
            {exp.role}
          </p>
          <p className="mb-2 text-sm font-medium text-black">
            {exp.company_name} {exp.employment_type && `· ${exp.employment_type}`}
          </p>
          {exp.location && (
            <p className="mb-2 text-xs text-black">
              {exp.location}
            </p>
          )}
          {exp.description && (
            <p className="mb-3 text-sm text-black">
              {exp.description}
            </p>
          )}
          {exp.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill: string, idx: number) => (
                <span key={idx} className="text-xs font-medium text-black bg-neutral-100 px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
