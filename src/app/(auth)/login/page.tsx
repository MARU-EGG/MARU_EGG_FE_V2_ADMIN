'use client';

import { useLoginMutation } from '@/app/(auth)/login/hooks/use-login-mutation';
import { toast } from '@/components/toast';
import { setTokens } from '@/utils/auth';
import MaruIcon from '@public/svg/maru.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: ({ accessToken, refreshToken }) => {
          setTokens(accessToken, refreshToken);
          router.push('/home');
        },
        onError: () => toast.open({ message: '이메일 또는 비밀번호를 확인해주세요', type: 'error' }),
      },
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-primary-egg">
      <div className="w-full max-w-sm rounded-lg bg-white px-8 py-10 shadow-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image src={MaruIcon} alt="마루 아이콘" width={110} height={110} />
          <h1 className="text-center text-2xl font-semibold text-primary-maru">
            MARU-EGG <br /> ADMIN
          </h1>
        </div>
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
          <div className="mt-2 flex justify-center">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-primary-maru py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
