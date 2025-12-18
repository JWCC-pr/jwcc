import NewsPassingNoticeDetailPage from './_source/components/news-passing-notice-detail-page'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsPassingNoticeDetailPage passingNoticeId={Number(id)} />
}

export default Page
