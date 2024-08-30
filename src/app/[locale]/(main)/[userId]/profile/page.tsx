import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/auth.actions';
import ProfileDetails from '@/components/profile/ProfileDetails';
import ProfileSecurity from '@/components/profile/ProfileSecurity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ServerSessionPros } from '@/types/auth.type';

export default async function ProfilePage() {
  const t = await getTranslations('ProfileDetails');
  const session: ServerSessionPros | null = await getSession();
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Tabs defaultValue="details" className="border-b">
        <TabsList className="flex space-x-6">
          <TabsTrigger value="details" className="w-1/2">
            {t('details')}
          </TabsTrigger>
          <TabsTrigger value="security" className="w-1/2">
            {t('security')}
          </TabsTrigger>
        </TabsList>
        <TabsContent id="#details" value="details">
          <ProfileDetails session={session.user} />
        </TabsContent>
        <TabsContent id="#security" value="security">
          <ProfileSecurity />
        </TabsContent>
      </Tabs>
    </div>
  );
}
