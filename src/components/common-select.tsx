import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CommonSelectProps {
  placeholder?: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

export default function CommonSelect({
  placeholder,
  label,
  options,
  defaultValue,
  onValueChange,
}: CommonSelectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
