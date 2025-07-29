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

  // value prop에서 Date 객체로 변환 (타임존 문제 방지)
  const selectedDate = value ? new Date(`${value}T00:00:00`) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onChange) {
      // Timezone 문제를 피하기 위해 수동으로 YYYY-MM-DD 형식 생성
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
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
            disabled={date => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
