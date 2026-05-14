/**
 * Optional push via https://brrr.now/docs/ — set BRRR_WEBHOOK_URL to the full webhook URL from the app.
 */
export async function sendBrrrNotification(
    title: string,
    message: string,
): Promise<boolean> {
    const webhookUrl = process.env.BRRR_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
        return false;
    }

    const body = {
        title,
        message,
        "interruption-level": "active" as const,
    };

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errText = await response.text().catch(() => "");
        console.error("brrr notification failed.", {
            status: response.status,
            body: errText,
        });
    }

    return response.ok;
}
