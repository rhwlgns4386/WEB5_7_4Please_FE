import { s3Upload } from '@/api/auction';
import { useMutation } from '@tanstack/react-query';

export default function useS3Upload() {
  const s3UploadMutation = useMutation({
    mutationFn: s3Upload,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  return s3UploadMutation;
}
