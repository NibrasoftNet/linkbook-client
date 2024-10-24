'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Component() {
  return (
    <section className="space-y-8">
      <div className="m-2 space-y-2">
        <h2 className="text-3xl font-bold">Get in touch</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Feel free to leave any enquiries below, or give us a call to speak
          with our helpful sales team.
        </p>
      </div>
      <div className="m-2 space-y-4">
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-bold">Contact Details</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Avatar className="size-4" />
                <span>Menzah 5 Ariana, Tunisie</span>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="size-4" />
                <span>(216) 96 676 217</span>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="size-4" />
                <a href="mailto:contact.link4book@gmail.com">
                  contact.link4book@gmail.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-bold">Leave a Message</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                className="min-h-[100px]"
              />
              <Button>Send message</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
