"use client";

const COOKIE_SETTINGS_EVENT = "crewtrace:open-cookie-preferences";

const buttonClass =
    "text-sm font-medium leading-6 text-white/92 transition-colors hover:text-white [text-shadow:0_1px_3px_rgb(0_0_0/_0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-md";

export default function CookiePreferencesLink() {
    return (
        <button
            type="button"
            className={buttonClass}
            onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
        >
            Privacy choices
        </button>
    );
}
