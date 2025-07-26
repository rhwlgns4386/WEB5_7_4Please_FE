import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { postAuction } from '@/api/auction';
import { toast } from 'sonner';
import useS3Upload from '@/hooks/useS3Upload';

export default function useImageUpload() {
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const productImagesRef = useRef<HTMLInputElement>(null);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [productImagesUrl, setProductImagesUrl] = useState<string[]>([]);

  const { mutate: createAuction } = useMutation({
    mutationFn: postAuction,
    onSuccess: () => toast('성공적으로 등록되었습니다.'),
    onError: () => toast('등록에 실패했습니다.'),
  });

  const { uploadFileMutation } = useS3Upload();

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
      startTime: z
        .string()
        .min(1, { message: '경매 시작 시간을 선택해주세요.' }),
      bidPeriod: z.enum(['THREE', 'FIVE'], {
        message: '경매 기간을 선택해주세요.',
      }),
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
      startTime: '',
      bidPeriod: 'THREE',
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
      const blob = new Blob([JSON.stringify(file)], {
        type: 'application/json',
      });
      const formData = new FormData();
      formData.append('image', blob);
      uploadFileMutation(formData, {
        onSuccess: (data: any) => {
          setThumbnailUrl(data.data[0]);
        },
      });
    }
  };

  const handleProductImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      setProductImages(Array.from(files));
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('image', file);
      });
      uploadFileMutation(formData, {
        onSuccess: (data: any) => {
          setProductImagesUrl(data.data);
        },
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
    if (!thumbnailUrl) {
      toast.error('썸네일 이미지를 등록해주세요.');
      return;
    }
    if (productImagesUrl.length === 0) {
      toast.error('상품 이미지를 1개 이상 등록해주세요.');
      return;
    }

    createAuction({
      data: {
        productName: data.productName,
        description: data.description,
        thumbnailUrl: thumbnailUrl,
        imageUrls: productImagesUrl,
        categoryId: Number(data.categoryId),
        address: data.address,
        addressDetail: data.addressDetail,
        zipCode: data.zipCode,
        phone: data.phone,
        startDate: `${data.startDate}T${data.startTime}`,
        bidPeriod: data.bidPeriod,
        startingPrice: data.startingPrice,
        buyNowPrice: data.buyNowPrice,
      },
    });
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
