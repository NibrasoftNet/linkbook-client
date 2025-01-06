import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onInput, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine the forwarded ref with the internal ref
    React.useImperativeHandle(
      ref,
      () => textareaRef.current as HTMLTextAreaElement,
    );

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
      // Call the user-provided onInput handler if it exists
      if (onInput) {
        onInput(event);
      }

      // Adjust the height of the textarea dynamically
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height to recalculate
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    return (
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden resize-none',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
