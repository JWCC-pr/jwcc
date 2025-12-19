import TiptabEditorContent from '@/app/(public)/(sub-layout)/_source/components/tiptab-editor-content'
import { BoardType } from '@/generated/apis/@types/data-contracts'

interface FreeBoardDetailBodySectionProps {
  data: Pick<BoardType, 'body'>
}

const FreeBoardDetailBodySection: React.FC<FreeBoardDetailBodySectionProps> = ({
  data,
}) => {
  return <TiptabEditorContent body={data.body} />
}

export default FreeBoardDetailBodySection
