import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { ProductModel } from '@/types/product.model';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/utils';
import type { AxiosError } from 'axios';

interface ReviewData {
  rating: number;
  comment: string;
}

const CommentSubmit = ({ product }: { product: ProductModel }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const createReview = useMutation<any, AxiosError, ReviewData>({
    mutationFn: async (data) => {
      try {
        const res = await axiosInstance.post(`/products/${product._id}/reviews`, data);
        return res.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('error:', axiosError.response || axiosError.message);
        throw axiosError;
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview.mutate(
      { rating, comment },
      {
        onSuccess: () => {
          setRating(1);
          setComment('');
          toast.success('نظر با موفقیت ثبت شد');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  // مقدار value به صورت string دریافت و به number تبدیل می‌شود
  function handleRatingClick(value: string) {
    setRating(Number(value));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3xl max-w-3xl">
      <label className="font-medium">امتیاز</label>
      <Select onValueChange={handleRatingClick}>
        <SelectTrigger className="w-3xl bg-white">
          <SelectValue placeholder="انتخاب امتیاز" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-neutral-800">
          <SelectItem value="5">عالی</SelectItem>
          <SelectItem value="4">خیلی خوب</SelectItem>
          <SelectItem value="3">خوب</SelectItem>
          <SelectItem value="2">متوسط</SelectItem>
          <SelectItem value="1">ضعیف</SelectItem>
        </SelectContent>
      </Select>
      <label className="font-medium">نظر</label>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="نظر خود را وارد نمایید"
        className="w-w-3xl bg-white"
      />
      <Button size={'lg'}> {createReview.isPending ? 'در حال ارسال...' : 'ثبت نظر'}</Button>
    </form>
  );
};

export default CommentSubmit;
