import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import Sidebar from '../components/Sidebar'
import "../App.css"
import { AnimatePresence } from 'motion/react'
import ShareModal from '../components/ShareModal'
import CodeEditorPanel from "../components/CodeEditorPanel";
import FeedbackPanel from "../components/FeedbackPanel";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { useMedia } from "react-use";
import API from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { pushNewReview } from "../redux/Slices/userSlice";
import { useSearchParams } from "react-router-dom";
import { fetchReviewById, setResult, setTitleUpdate } from "../redux/Slices/reviewSlice";
import SearchModal from '../components/SearchModal'
import ApiKeyModal from '../components/ApiKeyModal'

function Temp() {
  const { code, mode, language, title, result } = useSelector((state) => state.review);
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const isMobile = useMedia('(max-width: 767px)');
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const reviewId = searchParams.get("review")
  const [search, setSearch] = useState(false)

  useEffect(() => {
    if (reviewId) {
      dispatch(fetchReviewById(reviewId));
    }
  }, [reviewId, dispatch]);

  const reviewCode = async () => {
    const finalTitle = title.trim() || `${language} Code Review`;
    setLoading(true);
    dispatch(setResult(''));

    try {
      if (reviewId) {
        // Update existing review
        const response = await API.put(`/ai/review/${reviewId}`, {
          code,
          title: finalTitle,
          language,
          review: result,
          mode
        });
        dispatch(setResult(response.data?.data?.response));
        dispatch(setTitleUpdate({ id: reviewId, title }));

      } else {
        // Create new review
        const response = await API.post('/ai', {
          code,
          title: finalTitle,
          language,
          mode
        });

        const newSession = response.data?.data?.newSession;
        const generatedResult = response.data?.data?.response;

        dispatch(setResult(generatedResult));
        dispatch(pushNewReview(newSession));
      }
    } catch (err) {
      dispatch(setResult('❌ Error: ' + (err?.response?.data?.message || err.message)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen max-h-screen w-full overflow-hidden">
      {showModal && (
        <ShareModal reviewId={reviewId} onClose={() => setShowModal(false)} />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && <Sidebar toggleSidebar={() => setIsOpen(!isOpen)} openSearch={() => setSearch(!search)} />}
        {search && <SearchModal onClose={() => setSearch(!search)} />}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar handleShareModal={() => setShowModal(true)} collapsed={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

        <div className="p-4 bg-zinc-200 dark:bg-neutral-800 flex-1 overflow-auto max-w-full flex flex-col md:flex-row  border border-neutral-300 dark:border-neutral-700">
          <PanelGroup
            direction={isMobile ? "vertical" : "horizontal"}
            className="w-full "
            style={{
              display: isMobile ? "block" : "flex",
              overflow: isMobile ? "auto" : "hidden"
            }}
          >

            <Panel defaultSize={50}>
              <CodeEditorPanel
                reviewCode={reviewCode}
                loading={loading}
              />
            </Panel>
            <PanelResizeHandle className="w-1 bg-zinc-200 dark:bg-neutral-800 hover:bg-indigo-400/50 dark:hover:bg-indigo-600/50 cursor-col-resize" />

            <Panel>
              <FeedbackPanel loading={loading} />
            </Panel>
          </PanelGroup>

        </div>
      </div>
    </div >

  )
}

export default Temp
