import React, { useRef, forwardRef } from 'react';
import { useMergedRef, clamp } from '@mantine/hooks';
import { Text, MantineSize } from '@mantine/core';
import { padTime } from '../pad-time/pad-time';
import useStyles from '../TimeInputBase.styles';

interface TimeFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'size'> {
  /** Called with onChange event */
  onChange(value: string, triggerShift: boolean): void;

  /** Called when input loses focus, used to format value */
  setValue(value: string): void;

  /** Adds colon after the field */
  withSeparator?: boolean;

  /** Colon text size */
  size?: MantineSize;

  /** Maximum possible value, min value is always 0 */
  max?: number;
}

export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(
  (
    {
      className,
      onFocus,
      onBlur,
      onChange,
      setValue,
      withSeparator = false,
      size = 'sm',
      max,
      value,
      ...others
    }: TimeFieldProps,
    ref
  ) => {
    const { classes, cx, theme } = useStyles({ size, hasValue: !!value });
    const inputRef = useRef<HTMLInputElement>();

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      typeof onFocus === 'function' && onFocus(event);
      inputRef.current.select();
    };

    const handleBlur = (event: any) => {
      typeof onBlur === 'function' && onBlur(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      event.stopPropagation();
      inputRef.current.select();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.nativeEvent.code === 'ArrowUp') {
        event.preventDefault();
        const padded = padTime(
          clamp({ value: parseInt(event.currentTarget.value, 10) + 1, max, min: 0 }).toString()
        );

        if (value !== padded) {
          setValue(padded);
          onChange(padded, false);
        }
      }

      if (event.nativeEvent.code === 'ArrowDown') {
        event.preventDefault();
        const padded = padTime(
          clamp({ value: parseInt(event.currentTarget.value, 10) - 1, max, min: 0 }).toString()
        );

        if (value !== padded) {
          setValue(padded);
          onChange(padded, false);
        }
      }
    };

    return (
      <>
        <input
          type="text"
          ref={useMergedRef(inputRef, ref)}
          onChange={(event) => onChange(event.currentTarget.value, true)}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          value={value}
          className={cx(classes.timeInput, className)}
          {...others}
        />

        {withSeparator && (
          <Text
            size={size}
            style={{
              lineHeight: 1,
              color: value
                ? 'inherit'
                : theme.colorScheme === 'dark'
                ? theme.colors.dark[2]
                : theme.colors.gray[7],
            }}
          >
            :
          </Text>
        )}
      </>
    );
  }
);

TimeField.displayName = '@mantine/dates/TimeField';
