import { GradeContent } from "@/src/types/spelling";
import { grade1Content } from "./grade1";

const EMPTY_CONTENT = (grade: number): GradeContent => ({ grade, units: [], lessons: [], words: [] });

// Grades 2-8 are not built yet; they resolve to empty content instead of
// crashing so the rest of the app can be developed grade-by-grade.
export const GRADE_CONTENT: Record<number, GradeContent> = {
  1: grade1Content,
  2: EMPTY_CONTENT(2),
  3: EMPTY_CONTENT(3),
  4: EMPTY_CONTENT(4),
  5: EMPTY_CONTENT(5),
  6: EMPTY_CONTENT(6),
  7: EMPTY_CONTENT(7),
  8: EMPTY_CONTENT(8),
};
