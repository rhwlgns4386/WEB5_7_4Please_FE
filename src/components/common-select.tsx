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
}

export default function CommonSelect({
  placeholder,
  label,
  options,
  defaultValue,
}: CommonSelectProps) {
  return (
    <Select defaultValue={defaultValue}>
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
