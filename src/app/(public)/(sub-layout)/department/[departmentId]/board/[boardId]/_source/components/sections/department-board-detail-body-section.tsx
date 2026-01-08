import TiptabEditorContent from '@/app/(public)/(sub-layout)/_source/components/tiptab-editor-content'
import { DepartmentBoardType } from '@/generated/apis/@types/data-contracts'

interface DepartmentBoardDetailBodySectionProps {
  board: Pick<DepartmentBoardType, 'body'>
}

const DepartmentBoardDetailBodySection: React.FC<
  DepartmentBoardDetailBodySectionProps
> = ({ board }) => {
  return <TiptabEditorContent body={board.body} />
}

export default DepartmentBoardDetailBodySection
