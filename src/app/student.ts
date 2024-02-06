import { Course } from "./course";

export interface Student {
    id: number,
    firstName: string,
    lastName: string,
    isActive: boolean,
    courses: Course[]
}
