import { z } from 'zod';

export const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(40, 'Username must be at most 40 characters long.'),
  email: z
    .string()
    .email('Email is not valid.')
    .min(3, 'Email must be at least 3 characters long.')
    .max(80, 'Email must be at most 80 characters long.'),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters long.')
    .max(80, 'Password must be at most 80 characters long.'),
  image: z
    .custom((value) => value instanceof File, {
      message: 'Invalid input.',
    })
    .optional(),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .min(12, 'Email must be at least 12 characters long.')
    .max(80, 'Email must be at most 80 characters long.'),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters long.')
    .max(80, 'Password must be at most 80 characters long.'),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(40, 'Username must be at most 40 characters long.'),
  image: z
    .custom((value) => value instanceof File, {
      message: 'Invalid input.',
    })
    .optional(),
});

export const communitySchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long.')
    .max(120, 'Name must be at most 40 characters long.'),
});

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(3, 'Current password must be at least 3 characters long.')
    .max(80, 'Current password must be at most 80 characters long.'),
  newPassword: z
    .string()
    .min(3, 'New password must be at least 3 characters long.')
    .max(80, 'New password must be at most 80 characters long.'),
  confirmationPassword: z
    .string()
    .min(3, 'Confirmation password must be at least 3 characters long.')
    .max(80, 'Confirmation password must be at most 80 characters long.'),
});

const commaSeparatedTagsRegex = /^(?!.*,\s,)(?:(?!,\s$).)+$/;

export const tagsSchema = z
  .string()
  .refine((value) => commaSeparatedTagsRegex.test(value), {
    message: 'Invalid tags format.',
  });

export const postSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long.')
    .max(80, 'Title must be at most 80 characters long.'),
  content: z
    .string()
    .min(3, 'Content must be at least 3 characters long.')
    .max(256, 'Content must be at most 256 characters long.'),
  tags: tagsSchema.optional().or(z.literal('')),
  image: z
    .custom((value) => value instanceof File, {
      message: 'Invalid input.',
    })
    .optional(),
});

export const commentSchema = z.object({
  text: z
    .string()
    .min(3, 'Text must be at least 3 characters long.')
    .max(256, 'Text must be at most 256 characters long.'),
});
