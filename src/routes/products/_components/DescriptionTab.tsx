interface DescriptionTabProps {
  description: string;
}

export default function DescriptionTab({ description }: DescriptionTabProps) {
  return (
    <div className='whitespace-pre-line h-[450px] overflow-y-auto py-4'>
      {description}
    </div>
  );
}
