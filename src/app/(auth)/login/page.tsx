'use client';

import { signIn } from '@/api/auth';
import Button from '@/components/button/button';
import { toast } from '@/components/toast';
import { setTokens } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { accessToken, refreshToken } = await signIn({ email, password });
      if (!accessToken || !refreshToken) {
        toast.open({ message: '로그인에 실패했습니다.', type: 'error' });
        return;
      }
      setTokens(accessToken, refreshToken);
      router.push('/home');
    } catch {
      toast.open({ message: '이메일 또는 비밀번호를 확인해 주세요.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-primary-egg">
      <div className="w-full max-w-sm rounded-lg bg-white px-8 py-10 shadow-sm">
        <h1 className="mb-8 text-center text-2xl font-semibold text-primary-maru">
          MARU-EGG <br /> ADMIN
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs font-medium text-grayscale-gray-70">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
              className="rounded border border-grayscale-gray-20 px-3 py-2 text-sm outline-none placeholder:text-grayscale-gray-40 focus:border-primary-maru"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs font-medium text-grayscale-gray-70">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              className="rounded border border-grayscale-gray-20 px-3 py-2 text-sm outline-none placeholder:text-grayscale-gray-40 focus:border-primary-maru"
            />
          </div>
          <div className="mt-2 flex">
            <Button type="submit" variant="primary" size="large" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
