/** Message for logs from any thrown value; never throws itself. */
export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Unknown error";
}
