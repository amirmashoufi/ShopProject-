import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/utils';
import { type GetOrder } from '@/types/order';

const useGetOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => axiosInstance.get<GetOrder>(`/orders/${id}`).then((res) => res.data),
  });
};

export default useGetOrder;
