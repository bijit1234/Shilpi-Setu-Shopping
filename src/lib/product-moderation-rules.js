/**
 * Shared moderation approval rules (safe for client + server).
 */
/** Profanity / vulgar terms related to sex products / adult content */
const VULGAR_PATTERN = /\b(porn|pornography|xxx|dildo|vibrator|sex\s+toy|sex\s+toys|adult\s+toy|adult\s+toys|hentai|erotica|masturbator|masturbate)\b/i;
/**
 * Allow upload unless the product contains adult content, nudity, sexual content, or sex toys.
 */
export function isModerationApproved(result, isVirtual, title, description) {
    // MUST reject if any adult safety flags are true
    const isUnsafe = result.contains_nudity === true ||
        result.contains_sexual_content === true ||
        result.contains_sex_toys === true;
    return !isUnsafe;
}
/** Backup: scan raw AI output for profanity mentions (e.g. in reason field) */
export function scanTextForVulgarity(text) {
    return VULGAR_PATTERN.test(text);
}
