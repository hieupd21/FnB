import authApiRequest from '@/apiRequests/authApiRequest';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};
