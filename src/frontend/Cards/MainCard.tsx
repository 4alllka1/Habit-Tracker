import { Zap } from "lucide-react";
import BaseCard from "../components/BaseCard";

interface Props {
  icon: any;
  iconColor: string;
  bgColor?: string;
  title?: string;
  text?: string;
  description?: string;
  hover?: boolean;
  brightBorder?: boolean;
  px?: number;
  py?: number;
}

function MainCard({
  icon,
  iconColor,
  bgColor,
  title,
  text,
  description,
  hover = true,
  brightBorder = false,
  px,
  py,
}: Props) {
  if (title) {
    return (
      <BaseCard
        hover={hover}
        brightBorder={brightBorder}
        px={px ? px : 5}
        py={py ? py : 5}
      >
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-2xl inline-flex"
            style={{ color: iconColor, backgroundColor: bgColor }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <p className="mb-2 text-xl font-bold">{title}</p>
            <p className="mb-3 text-neutral-600">{text}</p>
            <p className="text-sm inline-flex gap-2 items-center justify-center text-neutral-500">
              <Zap size={16} />
              {description}
            </p>
          </div>
        </div>
      </BaseCard>
    );
  }
  return (
    <BaseCard hover={hover} brightBorder={brightBorder} px={px} py={py}>
      <div>
        <span style={{ color: iconColor }}>
          <p className="text-2xl font-bold">{icon}</p>
        </span>
        <p className="font-bold text-lg">{text}</p>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </BaseCard>
  );
}

export default MainCard;
