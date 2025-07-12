// src/components/projects/project-card.tsx
'use client';

import { Card } from '@/components/ui/card';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  className?: string;
}

export function ProjectCard({ project, onClick, className = '' }: ProjectCardProps) {
  return (
    <Card className={`p-6 hover:shadow-md cursor-pointer ${className}`} onClick={onClick}>
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>
    </Card>
  );
} 