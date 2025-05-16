
import TopBar from '../components/TopBar'
import "../App.css"
import { useEffect, useState } from "react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import FeedbackPanel from "../components/FeedbackPanel";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { useMedia } from "react-use";
import { useDispatch } from "react-redux";
import { useParams, } from "react-router-dom";
import { fetchReviewById, } from "../redux/Slices/reviewSlice";
import ShareModal from '../components/ShareModal';

const SharePage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { id: reviewId } = useParams()
  const isMobile = useMedia('(max-width: 767px)');
  const dispatch = useDispatch()

  useEffect(() => {
    if (reviewId) {
      dispatch(fetchReviewById(reviewId));
    }
  }, [reviewId, dispatch]);

  return (
    <div className="flex min-h-screen max-h-screen w-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {showModal && (
          <ShareModal reviewId={reviewId} onClose={() => setShowModal(false)} />
        )}

        <TopBar handleShareModal={() => setShowModal(true)} shareMode={true} collapsed={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        <div className="p-4 bg-neutral-200 dark:bg-neutral-800 flex flex-col md:flex-row   flex-1 overflow-auto max-w-full border  dark:border-neutral-700 border-neutral-300">

          <PanelGroup
            direction={isMobile ? "vertical" : "horizontal"}
            className="w-full h-full"
            style={{
              display: isMobile ? "block" : "flex",
              overflow: isMobile ? "auto" : "hidden"
            }}
          >

            <Panel defaultSize={50}>
              <CodeEditorPanel
                shareMode={true}
                reviewCode={() => { console.error("You are not allowed to do this.") }}
              />
            </Panel>

            <PanelResizeHandle className="w-1  bg-neutral-200 dark:bg-neutral-800 hover:bg-indigo-400 dark:hover:bg-indigo-600 cursor-col-resize" />

            <Panel>
              <FeedbackPanel shareMode={true} />
            </Panel>

          </PanelGroup>
        </div>
      </div>
    </div>

  )
}

export default SharePage