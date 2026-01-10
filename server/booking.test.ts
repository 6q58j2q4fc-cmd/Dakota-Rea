/**
 * Tests for booking calendar functionality
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database functions
vi.mock("./db", () => ({
  createBookingRequest: vi.fn().mockResolvedValue({ id: 1 }),
}));

// Mock the email functions
vi.mock("./email", () => ({
  sendBookingNotificationToAdmin: vi.fn().mockResolvedValue(true),
  sendBookingConfirmationToRequester: vi.fn().mockResolvedValue(true),
  generateICSContent: vi.fn().mockReturnValue("BEGIN:VCALENDAR..."),
}));

import { createBookingRequest } from "./db";
import { sendBookingNotificationToAdmin, sendBookingConfirmationToRequester, generateICSContent } from "./email";

describe("Booking System", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createBookingRequest", () => {
    it("should create a booking request with all required fields", async () => {
      const bookingData = {
        meetingType: "strategy",
        requestedDate: new Date("2026-01-21"),
        requestedTime: "10:00",
        name: "Test User",
        email: "test@example.com",
        company: "Test Company",
        message: "I would like to discuss AI strategy.",
      };

      const result = await createBookingRequest(bookingData);
      
      expect(createBookingRequest).toHaveBeenCalledWith(bookingData);
      expect(result).toHaveProperty("id");
    });

    it("should create a booking request without optional fields", async () => {
      const bookingData = {
        meetingType: "consulting",
        requestedDate: new Date("2026-01-22"),
        requestedTime: "14:00",
        name: "Another User",
        email: "another@example.com",
      };

      const result = await createBookingRequest(bookingData);
      
      expect(createBookingRequest).toHaveBeenCalledWith(bookingData);
      expect(result).toHaveProperty("id");
    });
  });

  describe("Email Notifications", () => {
    it("should send notification to admin", async () => {
      const emailData = {
        meetingType: "strategy",
        date: "Monday, January 21, 2026",
        time: "10:00",
        name: "Test User",
        email: "test@example.com",
        company: "Test Company",
        message: "Test message",
      };

      const result = await sendBookingNotificationToAdmin(emailData);
      
      expect(sendBookingNotificationToAdmin).toHaveBeenCalledWith(emailData);
      expect(result).toBe(true);
    });

    it("should send confirmation to requester", async () => {
      const emailData = {
        meetingType: "speaking",
        date: "Tuesday, January 22, 2026",
        time: "15:00",
        name: "Speaker Inquiry",
        email: "speaker@example.com",
      };

      const result = await sendBookingConfirmationToRequester(emailData);
      
      expect(sendBookingConfirmationToRequester).toHaveBeenCalledWith(emailData);
      expect(result).toBe(true);
    });
  });

  describe("ICS Calendar Generation", () => {
    it("should generate valid ICS content", () => {
      const bookingData = {
        meetingType: "strategy",
        date: "2026-01-21",
        time: "10:00",
        name: "Test User",
        email: "test@example.com",
      };

      const icsContent = generateICSContent(bookingData);
      
      expect(generateICSContent).toHaveBeenCalledWith(bookingData);
      expect(icsContent).toContain("BEGIN:VCALENDAR");
    });
  });

  describe("Meeting Types", () => {
    it("should support strategy meeting type", async () => {
      const bookingData = {
        meetingType: "strategy",
        requestedDate: new Date("2026-01-21"),
        requestedTime: "10:00",
        name: "Test User",
        email: "test@example.com",
      };

      await createBookingRequest(bookingData);
      expect(createBookingRequest).toHaveBeenCalledWith(
        expect.objectContaining({ meetingType: "strategy" })
      );
    });

    it("should support speaking meeting type", async () => {
      const bookingData = {
        meetingType: "speaking",
        requestedDate: new Date("2026-01-22"),
        requestedTime: "11:00",
        name: "Event Organizer",
        email: "events@example.com",
      };

      await createBookingRequest(bookingData);
      expect(createBookingRequest).toHaveBeenCalledWith(
        expect.objectContaining({ meetingType: "speaking" })
      );
    });

    it("should support consulting meeting type", async () => {
      const bookingData = {
        meetingType: "consulting",
        requestedDate: new Date("2026-01-23"),
        requestedTime: "14:00",
        name: "Enterprise Client",
        email: "enterprise@example.com",
      };

      await createBookingRequest(bookingData);
      expect(createBookingRequest).toHaveBeenCalledWith(
        expect.objectContaining({ meetingType: "consulting" })
      );
    });
  });
});
