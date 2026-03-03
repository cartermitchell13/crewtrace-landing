const DAY_IN_MS = 24 * 60 * 60 * 1000;

function asUtcStartOfDay(value) {
    return new Date(
        Date.UTC(
            value.getUTCFullYear(),
            value.getUTCMonth(),
            value.getUTCDate(),
            0,
            0,
            0,
            0,
        ),
    );
}

function formatUtcDate(value) {
    return value.toISOString().slice(0, 10);
}

function parseWeekStartDate(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error("Missing required --week value (expected YYYY-MM-DD).");
    }

    const parsed = new Date(`${value.trim()}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) {
        throw new Error(`Invalid week date "${value}". Expected YYYY-MM-DD in UTC.`);
    }

    const mondayCheck = parsed.getUTCDay();
    if (mondayCheck !== 1) {
        throw new Error(
            `Week start "${value}" must be a Monday in UTC for previous Monday-Sunday windowing.`,
        );
    }

    return asUtcStartOfDay(parsed);
}

function resolveUtcMonday(value) {
    const dayStart = asUtcStartOfDay(value);
    const weekday = dayStart.getUTCDay();
    const offsetToMonday = (weekday + 6) % 7;
    return new Date(dayStart.getTime() - offsetToMonday * DAY_IN_MS);
}

function resolvePreviousUtcWeek(referenceDate = new Date()) {
    const currentWeekMonday = resolveUtcMonday(referenceDate);
    const previousWeekMonday = new Date(currentWeekMonday.getTime() - 7 * DAY_IN_MS);
    return resolveUtcWeekWindow({ week: formatUtcDate(previousWeekMonday) });
}

export function resolveUtcWeekWindow(options = {}) {
    const weekStart = options.week
        ? parseWeekStartDate(options.week)
        : resolvePreviousUtcWeek(options.referenceDate).week_start_date;
    const weekEnd = new Date(weekStart.getTime() + 6 * DAY_IN_MS);
    const weekEndExclusive = new Date(weekStart.getTime() + 7 * DAY_IN_MS);

    return {
        week_start: formatUtcDate(weekStart),
        week_end: formatUtcDate(weekEnd),
        week_start_date: weekStart,
        week_end_date: weekEnd,
        range_start_utc_iso: weekStart.toISOString(),
        range_end_utc_iso: new Date(weekEndExclusive.getTime() - 1).toISOString(),
        range_end_exclusive_utc_iso: weekEndExclusive.toISOString(),
    };
}

export function isTimestampInUtcWeek(value, weekWindow) {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
        return false;
    }

    const startMs = weekWindow.week_start_date.getTime();
    const endExclusiveMs = Date.parse(weekWindow.range_end_exclusive_utc_iso);
    return parsed >= startMs && parsed < endExclusiveMs;
}

export function buildWeekFreezeMetadata(weekWindow, options = {}) {
    const frozenAt = options.frozenAt ?? new Date();
    return {
        freeze_key: `week-${weekWindow.week_start}__${weekWindow.week_end}`,
        week_start: weekWindow.week_start,
        week_end: weekWindow.week_end,
        freeze_window_utc: `${weekWindow.range_start_utc_iso} to ${weekWindow.range_end_utc_iso}`,
        frozen_at: frozenAt.toISOString(),
        policy: "first-successful-run-freezes-week",
    };
}

