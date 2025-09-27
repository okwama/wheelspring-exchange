import React, { forwardRef } from 'react';
import CurrencyInputField from 'react-currency-input-field';
import { cn } from '@/lib/utils';

interface CurrencyInputProps {
  value?: number;
  onValueChange?: (value: string | undefined, name?: string, values?: any) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  currency?: string;
  locale?: string;
  decimalsLimit?: number;
  prefix?: string;
  suffix?: string;
  allowNegativeValue?: boolean;
  disableGroupSeparators?: boolean;
  disableAbbreviations?: boolean;
  maxLength?: number;
  step?: number;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "0",
      disabled = false,
      className,
      name,
      currency = "USD",
      locale = "en-US",
      decimalsLimit = 2,
      prefix,
      suffix,
      allowNegativeValue = false,
      disableGroupSeparators = false,
      disableAbbreviations = false,
      maxLength,
      step = 1,
      ...props
    },
    ref
  ) => {
    return (
      <CurrencyInputField
        ref={ref}
        id={name}
        name={name}
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        disabled={disabled}
        decimalsLimit={decimalsLimit}
        prefix={prefix}
        suffix={suffix}
        allowNegativeValue={allowNegativeValue}
        disableGroupSeparators={disableGroupSeparators}
        disableAbbreviations={disableAbbreviations}
        maxLength={maxLength}
        step={step}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
