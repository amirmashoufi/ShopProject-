import { axiosInstance } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface ReviewData {
  rating: number;
  comment: string;
}

export const useCreateProductReview = (productId: string) => {
  const createReview = useMutation<any, AxiosError, ReviewData>({
    mutationFn: async (data) => {
      try {
        const res = await axiosInstance.post(`/products/${productId}/reviews`, data);
        return res.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Error sending review:', axiosError.response || axiosError.message);
        throw axiosError;
      }
    },
  });

  return createReview;
};
