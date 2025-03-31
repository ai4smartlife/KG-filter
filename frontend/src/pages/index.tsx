import { DeleteIcon, SmallLogoIcon, MenuIcon } from "@/assets/icons";
import { ContentQuiz, SidebarButton, UserInfor } from "@/components";
import { uppercaseLetters } from "@/constants";
import useRabbitMQ from "@/hooks/useRabbitMQ";
import { authSelector } from "@/redux/reducers";
import { ModelApi } from "@/services";
import { IContent, IConversation } from "@/types";
import { Avatar, Button, Dropdown, Input, List, Modal, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const messageContainerRef = useRef<any>(null);
  const { user, loggedin } = useSelector(authSelector);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<IConversation>();
  const [show, setShow] = useState(false);
  const [question, setQuestions] = useState("");
  const [data, setData] = useState<IConversation[]>([]);
  const [contents, setContents] = useState<IContent[]>([]);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [version, setVersion] = useState(1);

  const [progressMessages, clearMessages] = useRabbitMQ();

  const [currentConversation, setCurrentConversation] =
    useState<IConversation>();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const handleGetHistory = useCallback(async () => {
    try {
      const res = await ModelApi.getConversationUser();
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetHistory();
  }, []);

  useEffect(() => {
    if (!loggedin) {
      setCurrentConversation(undefined);
      setData([]);
      setContents([]);
    }
  }, [loggedin]);

  const handleClickConversation = useCallback(async (data: IConversation) => {
    try {
      setIsLoading(true);
      setContents([]);
      setCurrentConversation(data);
      const res = await ModelApi.getConversationContent(data._id);
      setContents(res.data.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSignIn = useCallback(() => {
    router.push("/login");
  }, []);

  const handleGetAnswer = useCallback(async () => {
    try {
      if (question === "") {
        toast.error("Vui lòng nhập câu hỏi");
      } else {
        clearMessages();
        setLoading(true);
        setQuestions("");
        const conversationId = currentConversation?._id || "";
        setContents((contents) => [
          ...contents,
          {
            _id: "",
            conversation: conversationId,
            question: question,
            type: "ASK",
            createdAt: "",
            updatedAt: "Wed, 17 Apr 2024 08:46:54 GMT",
          },
        ]);
        let res: any;
        if (loggedin) {
          res = await ModelApi.getAnswerByUser({
            question: question.trim(),
            conversation: conversationId ? conversationId : undefined,
          });
          if (!currentConversation) {
            try {
              const conversations = await ModelApi.getConversationUser();
              setData(conversations.data.data);
              setCurrentConversation(
                conversations.data.data.filter(
                  (e: any) => e._id === res.data.data.conversation
                )[0]
              );
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          res = await ModelApi.getAnswerByCustomer({
            question: question.trim(),
            conversation: conversationId,
          });
        }
        
        setContents((contents) => [
          ...contents,
          {
            _id: res.data.data?._id || "",
            answer: res.data.data.answer,
            conversation: conversationId,
            question: question,
            graph: res.data.data.graph,
            type: "ANSWER",
            createdAt: "",
            updatedAt: "Wed, 17 Apr 2024 08:46:54 GMT",
          },
        ]);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "There are some problem");
      setContents((contents) => {
        const newContents = contents.slice(0, -1);
        return newContents;
      });
    } finally {
      setLoading(false);
    }
  }, [answers, question, currentConversation, contents, version]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [contents]);

  const handleAddNewChat = useCallback(() => {
    setCurrentConversation(undefined);
    setContents([]);
  }, []);

  const handleDeleteChat = useCallback(
    async (id: string) => {
      try {
        await ModelApi.deleteConversationUser(id);
        await handleGetHistory();
        if (id === currentConversation?._id) {
          setCurrentConversation(undefined);
          setContents([]);
        }
        toast.success("Delete conversation success!");
      } catch (error) {
        console.log(error);
        toast.error("Delete conversation fail!");
      } finally {
        setOpen(false);
      }
    },
    [handleGetHistory, currentConversation]
  );

  return (
    <div className="bg-white relative z-0 flex h-screen w-full overflow-hidden">
      <div
        className={`absolute ${
          !show && "hidden"
        } shadow sm:relative z-20 max-w-[260px] sm:block sm:w-[25%] min-w-[200px] sm:max-w-[350px] h-full flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary`}
      >
        <div className="bg-gray-50 h-full flex flex-col justify-between">
          <SidebarButton
            text="New chat"
            type="action"
            className="mx-[20px] mt-[20px]"
            onClick={handleAddNewChat}
          />
          <div className="h-full max-h-[70%]">
            <p className="text-base font-sans text-gray-500 mx-[20px]">
              History
            </p>
            <div className="mt-[20px] flex flex-col gap-2 h-full max-h-[90%] overflow-y-scroll px-[20px]">
              {data?.map((conversation) => (
                <SidebarButton
                  text={conversation.title}
                  key={conversation._id}
                  active={currentConversation?._id === conversation._id}
                  className="gap-3"
                  onDelete={() => {
                    setOpen(true);
                    setDeleteData(conversation);
                    // handleDeleteChat(conversation._id);
                  }}
                  onClick={() => {
                    handleClickConversation(conversation);
                  }}
                />
              ))}
            </div>
          </div>
          {loggedin && user ? (
            <UserInfor className="mx-[20px] mb-[30px]" />
          ) : (
            <div className="flex flex-col w-full pb-[30px] gap-5">
              <div className="px-[20px]">
                <div
                  className="w-full h-[40px] rounded-xl bg-green-500 flex items-center justify-center cursor-pointer hover:bg-green-600"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  <span className="font-sans text-base text-white font-medium">
                    Sign Up
                  </span>
                </div>
              </div>
              <div className="px-[20px]">
                <div
                  className="w-full h-[40px] border border-gray-400 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"
                  onClick={handleSignIn}
                >
                  <span className="font-sans text-base text-black font-medium">
                    Login
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex relative h-full max-w-full flex-1 flex-col overflow-hidden self-end z-1">
        <div className="sticky top-0 z-10 flex min-h-[40px] items-center  border-b p-[10px]">
          <div
            className="p-[10px] block sm:hidden z-10"
            onClick={() => {
              setShow(true);
            }}
          >
            <Image src={MenuIcon} alt="Logo" className="w-[15px] h-[15px]" />
          </div>
          <span className="text-2xl font-sans font-medium text-black p-3 cursor-pointer">
            Quiz
          </span>
        </div>
        <div
          className="overflow-y-auto h-full w-full flex-1 overflow-hidden items-center flex flex-col"
          ref={messageContainerRef}
          onClick={() => {
            setShow(false);
          }}
        >
          <div className="flex flex-col pb-[30px] max-w-[800px] w-[90%]">
            {contents.map((e) => (
              <ContentQuiz data={e} key={e._id} />
            ))}
            {(isLoading || loading) && (
              <div className="flex flex-row px-[20px] pt-[30px] items-start gap-2 w-full">
                <div className="rounded-full min-w-[40px] h-[40px] bg-gray-200 border border-gray-200 flex items-center justify-center">
                  <Image src={SmallLogoIcon} alt="Logo" className="w-[20px] h-[20px]" />
                </div>
                <div className="flex flex-col gap-4 mt-[7px] w-full">
				          <span className="font-sans font-semibold text-black text-xl">Quiz</span>
                  {progressMessages?.map((msg, index) => (
                    <li key={index}>{msg}</li>
					        ))}
                  <Skeleton active />
                </div>
              </div>
            )}
            {!currentConversation && contents.length === 0 && (
              <div className="w-full items-center flex flex-col pt-[100px] gap-[20px]">
                <div className="rounded-full w-[70px] h-[70px] bg-gray-200 border border-gray-200 flex items-center justify-center">
                  <Image
                    src={SmallLogoIcon}
                    alt="Logo"
                    className="w-[35px] h-[35px]"
                  />
                </div>
                <span className="text-3xl text-black font-medium font-sans">
                  How can I help you?
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="py-6 px-[20px] bg-gray-100 justify-center flex">
          <div className="gap-[15px] flex flex-col max-w-[900px] w-full">
            <TextArea
              className="min-h-[40px] text-base text-black rounded-[12px] border-gray-400"
              placeholder="Question"
              value={question}
              onChange={(event) => {
                setQuestions(event.target.value);
              }}
              tabIndex={0}
            />
            <div className="w-full flex flex-row justify-end gap-5">
              <Button
                className="min-h-[48px] rounded-[12px] w-[40%] max-w-[200px]"
                type="primary"
                loading={loading}
                disabled={loading}
                onClick={handleGetAnswer}
              >
                <span className="font-sans text-base text-white font-medium">
                  Submit
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onOk={() => {
          if (deleteData) handleDeleteChat(deleteData._id);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        title="Delete conversation"
      >
        <p>Do you want to delete this conversation ?</p>
      </Modal>
    </div>
  );
};

export default Page;
