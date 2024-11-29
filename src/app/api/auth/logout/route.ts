import authApiRequest from '@/apiRequests/authApiRequest';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;
  const refreshToken = cookiesStore.get('refreshToken')?.value;
  cookiesStore.delete('accessToken');
  cookiesStore.delete('refreshToken');

  if (!accessToken || !refreshToken) {
    return Response.json({ message: 'Không nhận được token' }, { status: 200 });
  }

  try {
    const result = await authApiRequest.sLogout({
      accessToken,
      refreshToken,
    });
    return Response.json(result.payload);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: 'Lỗi khi gọi API đến server BE' },
      { status: 200 }
    );
  }
}
