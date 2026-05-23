import {
    AlertCircle,
    BarChart3,
    CheckCircle2,
    Clock,
    Droplets,
    HardHat,
    Home,
    Layers,
    MapPin,
    ShieldCheck,
    Trees,
    TrendingUp,
    Wind,
    type LucideIcon,
} from "lucide-react";
import type { IndustryIconKey } from "@/lib/industries";

export const industryIconByKey: Record<IndustryIconKey, LucideIcon> = {
    home: Home,
    wind: Wind,
    droplets: Droplets,
    "hard-hat": HardHat,
    trees: Trees,
    layers: Layers,
    "map-pin": MapPin,
    "check-circle-2": CheckCircle2,
    "alert-circle": AlertCircle,
    "bar-chart-3": BarChart3,
    clock: Clock,
    "trending-up": TrendingUp,
    "shield-check": ShieldCheck,
};
