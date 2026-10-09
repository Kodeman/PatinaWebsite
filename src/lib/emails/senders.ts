/** Personal sender for Founding Circle, designer, and maker signup messages. */
export const kodySignupSender = {
  from: "Kody at Patina <hello@patina.cloud>",
  replyTo: "hello@patina.cloud",
} as const;

/** Internal inbox that receives a notification for every new lead. */
export const LEAD_NOTIFY_TO = "kody@patina.cloud";
