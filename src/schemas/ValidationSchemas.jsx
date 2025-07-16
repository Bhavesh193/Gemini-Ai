import { z } from 'zod';

export const LoginSchema = z.object({
  countryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long').regex(/^\d+$/, 'Invalid phone number'),
});

export const OtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'Invalid OTP'),
});

export const CreateChatroomSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(50, 'Title too long'),
});