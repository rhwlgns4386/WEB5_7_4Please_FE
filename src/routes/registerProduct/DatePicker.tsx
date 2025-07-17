import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // value prop에서 Date 객체로 변환
  const selectedDate = value ? new Date(value) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onChange) {
      // ISO 날짜 문자열로 변환하여 전달
      onChange(date.toISOString().split('T')[0]);
    }
    setOpen(false);
  };

  return (
    <div className='flex flex-col gap-3 mb-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id='date'
            className='w-48 justify-between font-normal'
          >
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : '시작일을 선택해주세요'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={handleDateSelect}
            className='rounded-md border shadow'
            disabled={date => date <= new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
