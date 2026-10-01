import type { ComponentPropsWithoutRef } from 'react';
import styles from '@/components/shared/Button.module.css';

type Props = ComponentPropsWithoutRef<'button'>;

export default function Button({ children, className, ...props }: Props) {
  const additionalClasses = className
    ?.split(/\s+/)
    .map(name => styles[name])
    .filter(Boolean)
    .join(' ');

  return (
    <button {...props} className={[styles.btn, additionalClasses].filter(Boolean).join(' ')}>
      {children}
    </button>
  );
}
