import { UserTable } from './_components/user-table';

export default function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container mx-auto py-10">
      <UserTable searchParams={searchParams} />
    </div>
  );
}
