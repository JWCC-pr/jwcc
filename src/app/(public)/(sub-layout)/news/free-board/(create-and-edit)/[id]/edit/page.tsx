import NewFreeBoardEditPage from './_source/components/NewFreeBoardEditPage'

interface PageProps {
  params: Promise<{ id: string }>
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewFreeBoardEditPage id={id} />
}

export default Page
