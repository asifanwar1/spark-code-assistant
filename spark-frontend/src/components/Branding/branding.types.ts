import { Feature } from "@/constants/Features";
import { Stats } from "@/constants/Stats";

export interface IBrandingSectionProps {
    features: Feature[];
    stats: Stats[];
    heading: string;
    text: string;
    className?: string;
}
