export default async function Bill({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  return <h1>Hello {code}</h1>;
}
