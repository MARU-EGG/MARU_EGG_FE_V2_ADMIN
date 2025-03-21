'use client';

import { API_PATH } from '@/stores/querys/api-path';

export default function Home() {
  const submit = async () => {
    const data = await fetch(`${API_PATH.schedules}`, {
      method: 'get',
    }).then((res) => {
      return res.json();
    });

    console.log(data);
  };

  return (
    <>
      <button onClick={submit}>테스트용 콘솔 확인 버튼</button>
    </>
  );
}
