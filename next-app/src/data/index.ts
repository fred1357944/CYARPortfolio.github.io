import studentsRaw from './students.json';
import settingsRaw from './settings.json';
import type { Student, Settings } from '@/types';

export const students: Student[] = studentsRaw as Student[];
export const settings: Settings = settingsRaw as Settings;

export function getStudentById(id: number): Student | undefined {
    return students.find((s) => s.id === id);
}

export function getStudentsByCategory(category: string): Student[] {
    if (category === 'All') return students;
    return students.filter((s) => s.category === category);
}

export function getAllCategories(): string[] {
    return ['All', ...settings.categories.map((c) => c.id)];
}
