'use client';

import { cn } from '@/utils/style';
import React, { useState } from 'react';

type TextAreaProps = {
  placeHolder: string;
  variant: 'textArea' | 'input';
};

function TextArea({ placeHolder, variant }: TextAreaProps) {
  const rows = variant === 'textArea' ? 4 : 1;

  const baseStyle =
    'resize-none rounded-lg border border-grayscale-gray-20 focus:outline-none bg-monotone-white p-3 text-grayscale-gray-80 placeholder:text-grayscale-gray-50 text-sm font-medium';
  const variantStyle = cn(variant === 'textArea' && 'w-[1032px]', variant === 'input' && 'w-[240px]');
  const textAreaStyle = cn(baseStyle, variantStyle);

  const [text, setText] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return <textarea className={textAreaStyle} rows={rows} placeholder={placeHolder} value={text} onChange={onChange} />;
}

export default TextArea;
