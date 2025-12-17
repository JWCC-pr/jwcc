import NewFreeBoardEditPage from './_source/components/NewFreeBoardEditPage'

interface FreeBoardEditPageProps {
  params: Promise<{ id: string }>
}

const FreeBoardEditPage: React.FC<FreeBoardEditPageProps> = async ({
  params,
}) => {
  const { id } = await params

  return <NewFreeBoardEditPage id={id} />
}

export default FreeBoardEditPage
