import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Món ăn',
    href: '/menu',
  },
  {
    title: 'Đơn hàng',
    href: '/orders',
    authRequired: true,
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false,
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
    authRequired: true,
  },
];

export default function NavItems({ className }: { className?: string }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  return menuItems.map((item) => {
    if (
      (!item.authRequired && accessToken) ||
      (item.authRequired && !accessToken)
    ) {
      return null;
    } else {
      return (
        <Link
          href={item.href}
          key={item.href}
          className={cn(className, 'font-sans')}
        >
          {item.title}
        </Link>
      );
    }
  });
}
