import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  enquiries: router({
    // Get all enquiries
    list: protectedProcedure.query(async () => {
      return await db.getAllEnquiries();
    }),

    // Get single enquiry
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getEnquiryById(input.id);
      }),

    // Create enquiry
    create: protectedProcedure
      .input(z.object({
        dateOfEnquiry: z.string(),
        clientName: z.string(),
        time: z.string().optional(),
        communicationChannel: z.string().optional(),
        receivedBy: z.string().optional(),
        clientType: z.string().optional(),
        nationality: z.string().optional(),
        email: z.string().optional(),
        phoneNumber: z.string().optional(),
        preferredContactMethod: z.string().optional(),
        languagePreference: z.string().optional(),
        serviceRequested: z.string().optional(),
        shortDescription: z.string().optional(),
        urgencyLevel: z.string().optional(),
        clientBudget: z.string().optional(),
        potentialValueRange: z.string().optional(),
        expectedTimeline: z.string().optional(),
        referralSourceName: z.string().optional(),
        competitorInvolvement: z.string().optional(),
        competitorName: z.string().optional(),
        assignedDepartment: z.string().optional(),
        suggestedLeadLawyer: z.string().optional(),
        currentStatus: z.string().default("Pending"),
        nextAction: z.string().optional(),
        deadline: z.string().optional(),
        internalNotes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.createEnquiry(input, ctx.user.id);
      }),

    // Update enquiry
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        dateOfEnquiry: z.string().optional(),
        clientName: z.string().optional(),
        time: z.string().optional(),
        communicationChannel: z.string().optional(),
        receivedBy: z.string().optional(),
        clientType: z.string().optional(),
        nationality: z.string().optional(),
        email: z.string().optional(),
        phoneNumber: z.string().optional(),
        preferredContactMethod: z.string().optional(),
        languagePreference: z.string().optional(),
        serviceRequested: z.string().optional(),
        shortDescription: z.string().optional(),
        urgencyLevel: z.string().optional(),
        clientBudget: z.string().optional(),
        potentialValueRange: z.string().optional(),
        expectedTimeline: z.string().optional(),
        referralSourceName: z.string().optional(),
        competitorInvolvement: z.string().optional(),
        competitorName: z.string().optional(),
        assignedDepartment: z.string().optional(),
        suggestedLeadLawyer: z.string().optional(),
        currentStatus: z.string().optional(),
        nextAction: z.string().optional(),
        deadline: z.string().optional(),
        firstResponseDate: z.string().optional(),
        meetingDate: z.string().optional(),
        proposalSentDate: z.string().optional(),
        proposalValue: z.string().optional(),
        followUpCount: z.number().optional(),
        lastContactDate: z.string().optional(),
        conversionDate: z.string().optional(),
        engagementLetterDate: z.string().optional(),
        paymentStatus: z.string().optional(),
        invoiceNumber: z.string().optional(),
        lostReason: z.string().optional(),
        internalNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateEnquiry(id, data);
      }),

    // Delete enquiry
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteEnquiry(input.id);
        return { success: true };
      }),

    // Get status summary
    statusSummary: protectedProcedure.query(async () => {
      return await db.getStatusSummary();
    }),

    // Get KPI metrics
    kpiMetrics: protectedProcedure.query(async () => {
      return await db.getKPIMetrics();
    }),

    // Get pipeline forecast
    pipelineForecast: protectedProcedure.query(async () => {
      return await db.getPipelineForecast();
    }),
  }),

  payments: router({
    // Get all payments
    list: protectedProcedure.query(async () => {
      return await db.getAllPayments();
    }),

    // Get payment by enquiry ID
    getByEnquiry: protectedProcedure
      .input(z.object({ enquiryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getPaymentByEnquiryId(input.enquiryId);
      }),

    // Create payment
    create: protectedProcedure
      .input(z.object({
        enquiryId: z.number(),
        matterCode: z.string(),
        paymentTerms: z.string().optional(),
        paymentStatus: z.string().default("Not Started"),
        totalAmount: z.string().optional(),
        amountPaid: z.string().optional(),
        amountOutstanding: z.string().optional(),
        retainerPaidDate: z.string().optional(),
        retainerAmount: z.string().optional(),
        midPaymentDate: z.string().optional(),
        midPaymentAmount: z.string().optional(),
        finalPaymentDate: z.string().optional(),
        finalPaymentAmount: z.string().optional(),
        paymentNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createPayment(input);
      }),

    // Update payment
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        paymentTerms: z.string().optional(),
        paymentStatus: z.string().optional(),
        totalAmount: z.string().optional(),
        amountPaid: z.string().optional(),
        amountOutstanding: z.string().optional(),
        retainerPaidDate: z.string().optional(),
        retainerAmount: z.string().optional(),
        midPaymentDate: z.string().optional(),
        midPaymentAmount: z.string().optional(),
        finalPaymentDate: z.string().optional(),
        finalPaymentAmount: z.string().optional(),
        paymentNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updatePayment(id, data);
      }),
  }),

  users: router({
    // Get all users
    list: protectedProcedure.query(async () => {
      return await db.getAllUsers();
    }),

    // Update user role (admin only)
    updateRole: protectedProcedure
      .input(z.object({ userId: z.number(), role: z.enum(["user", "admin"]) }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        await db.updateUserRole(input.userId, input.role);
        return { success: true };
      }),

    // Update user status (admin only)
    updateStatus: protectedProcedure
      .input(z.object({ userId: z.number(), status: z.enum(["active", "inactive", "suspended"]) }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        await db.updateUserStatus(input.userId, input.status);
        return { success: true };
      }),

    // Get user activity stats
    activityStats: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return await db.getUserActivityStats(input.userId);
      }),
  }),

  auditLogs: router({
    // Get audit logs for a specific enquiry
    byEnquiry: protectedProcedure
      .input(z.object({ enquiryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getAuditLogsByEnquiry(input.enquiryId);
      }),

    // Get all audit logs with pagination
    list: protectedProcedure
      .input(z.object({ limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getAllAuditLogs(input.limit, input.offset);
      }),
  }),
});

export type AppRouter = typeof appRouter;
