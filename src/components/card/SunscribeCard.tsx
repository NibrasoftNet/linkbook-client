import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SubscribeCard() {
  return (
    <Card className="rounded-xl border-transparent">
      <CardHeader>
        <CardTitle>Subscription Required</CardTitle>
        <CardDescription>Subscribe to join our community</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A subscription is required</p>
      </CardContent>
      <CardFooter className="flex w-full">
        <Link href="/sign-up" className="w-full">
          <Button className="w-full">Subscribe</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
