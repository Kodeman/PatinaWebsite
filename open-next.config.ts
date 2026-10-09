import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  // A small tag store keeps Sanity path/tag revalidation working across isolates.
  // Regional caching stays off so publishing does not require a zone-purge token.
  tagCache: doShardedTagCache({ baseShardSize: 1, regionalCache: false }),
});
