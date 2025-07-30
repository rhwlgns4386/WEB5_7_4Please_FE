import { useEffect, useState } from 'react';

interface Props {
  images: string[];
  thumbnail: string;
}

export default function ImageLibrary({ images, thumbnail }: Props) {
  const [selectedImage, setSelectedImage] = useState(thumbnail);

  const newArray = [thumbnail, ...images];

  useEffect(() => {
    setSelectedImage(thumbnail);
  }, [thumbnail]);

  return (
    <div className='flex flex-col flex-1 p-5 border border-gray-500 rounded-lg'>
      <div className='min-w-[700px] flex flex-col'>
        <div className='w-full max-h-[600px]'>
          <img
            src={selectedImage}
            className='w-full h-full object-cover'
            draggable={false}
          />
        </div>
        <div className='flex gap-3 py-6 px-4 '>
          {newArray.map((image, index) => (
            <div
              className={`w-[100px] h-[100px] rounded-md overflow-hidden cursor-pointer ${selectedImage === image ? 'ring-2 ring-orange-500' : ''}`}
              key={index}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
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
