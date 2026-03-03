"use client";

import { useEffect } from "react";
import { captureFirstTouchAttribution } from "@/lib/first-touch-attribution";

export default function FirstTouchBootstrap() {
    useEffect(() => {
        captureFirstTouchAttribution();
    }, []);

    return null;
}
