import { cn } from '@/lib/utils';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'error';
  size: 'large' | 'small';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant, size, children, ...props }: ButtonProps) {
  const baseStyle = 'rounded px-3 py-[6px] font-semibold cursor-pointer border';

  const variantStyle = cn(
    variant === 'primary' && 'bg-primary-egg text-primary-maru',
    variant === 'secondary' && 'bg-white text-colors-grayscale-gray-70',
    variant === 'error' && 'text-error bg-error/10 ',
  );

  const sizeStyle = cn(size === 'large' && 'text-xs', size === 'small' && 'text-[10px] leading-3');

  const buttonStyles = cn(baseStyle, variantStyle, sizeStyle);

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
}

export default Button;
