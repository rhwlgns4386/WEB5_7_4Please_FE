export default function ImageLibrary() {
  return (
    <div className='flex flex-col flex-1 p-5 border border-gray-500 rounded-lg'>
      <div className='min-w-[700px] flex flex-col'>
        <div className='w-full max-h-[600px]'>
          <img
            src='https://picsum.photos/700/400'
            className='w-full h-full object-cover'
            draggable={false}
          />
        </div>
        <div className='flex gap-3 py-6 px-4 '>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className='w-[100px] h-[100px] rounded-md overflow-hidden cursor-pointer'
              key={index}
            >
              <img
                src='https://picsum.photos/700/400'
                className='w-full h-full object-cover'
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
