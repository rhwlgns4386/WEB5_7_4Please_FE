import { s3Upload } from '@/api/auction';
import { useMutation } from '@tanstack/react-query';

export default function useS3Upload() {
  const { mutate: uploadFileMutation } = useMutation({
    mutationFn: s3Upload,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  return { uploadFileMutation };
}
