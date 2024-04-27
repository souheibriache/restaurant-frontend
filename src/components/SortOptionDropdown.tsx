import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"} className="w-full">
          Sort By: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((item) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
