import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export default function useImageUpload() {
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const productImagesRef = useRef<HTMLInputElement>(null);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [productImagesUrl, setProductImagesUrl] = useState<string[]>([]);

  const formSchema = z
    .object({
      // 기본 정보
      productName: z
        .string()
        .min(2, { message: '상품명은 2자 이상이어야 합니다.' })
        .max(100, { message: '상품명은 100자 이하여야 합니다.' }),
      categoryId: z.string().min(1, { message: '카테고리를 선택해주세요.' }),
      description: z
        .string()
        .min(10, { message: '상품 설명은 10자 이상이어야 합니다.' })
        .max(1000, { message: '상품 설명은 1000자 이하여야 합니다.' }),

      // 거래 정보
      zipCode: z
        .string()
        .min(1, { message: '우편번호를 입력해주세요.' })
        .regex(/^\d{5}$/, {
          message: '올바른 우편번호 형식이 아닙니다. (5자리 숫자)',
        }),
      address: z.string().min(1, { message: '주소를 입력해주세요.' }),
      addressDetail: z.string().min(1, { message: '상세주소를 입력해주세요.' }),
      phone: z
        .string()
        .min(1, { message: '연락처를 입력해주세요.' })
        .regex(/^010-\d{4}-\d{4}$/, {
          message: '올바른 연락처 형식이 아닙니다. (010-0000-0000)',
        }),

      // 경매 설정
      startDate: z.string().min(1, { message: '경매 시작일을 선택해주세요.' }),
      bidPeriod: z.enum(['3', '5'], { message: '경매 기간을 선택해주세요.' }),
      startingPrice: z
        .number({ message: '시작가를 입력해주세요.' })
        .min(1000, { message: '시작가는 1,000원 이상이어야 합니다.' }),
      buyNowPrice: z
        .number({ message: '즉시구매가를 입력해주세요.' })
        .min(1000, { message: '즉시구매가는 1,000원 이상이어야 합니다.' }),
    })
    .refine(data => data.buyNowPrice > data.startingPrice, {
      message: '즉시구매가는 시작가보다 높아야 합니다.',
      path: ['buyNowPrice'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      productName: '',
      categoryId: '',
      description: '',
      zipCode: '',
      address: '',
      addressDetail: '',
      phone: '',
      startDate: '',
      bidPeriod: '3',
      startingPrice: 1000,
      buyNowPrice: 10000,
    },
  });

  const handleThumbnailUpload = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.click();
    }
  };

  const handleProductImagesUpload = () => {
    if (productImagesRef.current) {
      productImagesRef.current.click();
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnailUrl(reader.result as string);
      };
    }
  };

  const handleProductImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      setProductImages(Array.from(files));
      const urls = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = error => {
            reject(error);
          };
        });
      });
      Promise.all(urls).then(results => {
        setProductImagesUrl(results as string[]);
      });
    }
  };

  const handleThumbnailRemove = () => {
    setThumbnail(null);
    setThumbnailUrl(null);
    if (thumbnailRef.current) {
      thumbnailRef.current.value = '';
    }
  };

  const handleProductImagesRemove = (index: number) => {
    setProductImagesUrl(prev => prev.filter((_, i) => i !== index));
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('폼 데이터:', data);
    console.log('썸네일 파일:', thumbnail);
    console.log('상품 이미지 파일들:', productImages);

    // 여기에 실제 백엔드 API 호출 로직을 추가
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, value.toString());
    // });
    // if (thumbnail) formData.append('thumbnail', thumbnail);
    // productImages.forEach((image, index) => {
    //   formData.append(`productImages`, image);
    // });
    //
    // // API 호출
    // fetch('/api/products', {
    //   method: 'POST',
    //   body: formData
    // });
  };

  return {
    thumbnailRef,
    productImagesRef,
    thumbnail,
    thumbnailUrl,
    productImages,
    productImagesUrl,
    handleThumbnailUpload,
    handleProductImagesUpload,
    handleThumbnailChange,
    handleThumbnailRemove,
    handleProductImagesChange,
    handleProductImagesRemove,

    form,
    handleFormSubmit,
  };
}
