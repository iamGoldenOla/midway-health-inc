import { pgTable, uuid, varchar, text, timestamp, date, jsonb, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User profiles table (extends Supabase Auth users)
export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).notNull(), // 'student', 'teacher', 'admin'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Students table
export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  userId: uuid('user_id').references(() => userProfiles.id, { onDelete: 'cascade' }),
  gradeLevel: varchar('grade_level', { length: 10 }).notNull(),
  guardianContact: jsonb('guardian_contact'), // {name: string, phone: string, email: string}
  enrollmentDate: date('enrollment_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Teachers table
export const teachers = pgTable('teachers', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  userId: uuid('user_id').references(() => userProfiles.id, { onDelete: 'cascade' }),
  subject: varchar('subject', { length: 100 }),
  hireDate: date('hire_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Classes table
export const classes = pgTable('classes', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  gradeLevel: varchar('grade_level', { length: 10 }).notNull(),
  teacherId: uuid('teacher_id').references(() => teachers.id, { onDelete: 'setNull' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Enrollments table
export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  studentId: uuid('student_id').references(() => students.id, { onDelete: 'cascade' }).notNull(),
  classId: uuid('class_id').references(() => classes.id, { onDelete: 'cascade' }).notNull(),
  enrollmentDate: date('enrollment_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Form templates table
export const formTemplates = pgTable('form_templates', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  fields: jsonb('fields'), // JSON schema defining form fields
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Form submissions table
export const formSubmissions = pgTable('form_submissions', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  formId: uuid('form_id').references(() => formTemplates.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => userProfiles.id, { onDelete: 'cascade' }).notNull(),
  answers: jsonb('answers'), // Submitted form data
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Define relations
export const userProfilesRelations = relations(userProfiles, ({ one, many }) => ({
  student: one(students, {
    fields: [userProfiles.id],
    references: [students.userId],
  }),
  teacher: one(teachers, {
    fields: [userProfiles.id],
    references: [teachers.userId],
  }),
  formSubmissions: many(formSubmissions),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  user: one(userProfiles, {
    fields: [students.userId],
    references: [userProfiles.id],
  }),
  enrollments: many(enrollments),
}));

export const teachersRelations = relations(teachers, ({ one, many }) => ({
  user: one(userProfiles, {
    fields: [teachers.userId],
    references: [userProfiles.id],
  }),
  classes: many(classes),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  teacher: one(teachers, {
    fields: [classes.teacherId],
    references: [teachers.id],
  }),
  enrollments: many(enrollments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  student: one(students, {
    fields: [enrollments.studentId],
    references: [students.id],
  }),
  class: one(classes, {
    fields: [enrollments.classId],
    references: [classes.id],
  }),
}));

export const formTemplatesRelations = relations(formTemplates, ({ many }) => ({
  submissions: many(formSubmissions),
}));

export const formSubmissionsRelations = relations(formSubmissions, ({ one }) => ({
  form: one(formTemplates, {
    fields: [formSubmissions.formId],
    references: [formTemplates.id],
  }),
  user: one(userProfiles, {
    fields: [formSubmissions.userId],
    references: [userProfiles.id],
  }),
}));