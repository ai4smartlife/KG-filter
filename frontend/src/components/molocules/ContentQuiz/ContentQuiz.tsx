import React, {
	FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { ContentQuizProps } from "./ContentQuiz.types";
import Image from "next/image";
import { DefaultAvatarIcon, DisLikeIcon, SmallLogoIcon } from "@/assets/icons";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/reducers";
import toast from "react-hot-toast";
import { ModelApi } from "@/services";
import {
	ForceGraph2D,
	ForceGraph3D,
	ForceGraphVR,
	ForceGraphAR,
} from "react-force-graph";
import dynamic from "next/dynamic";

//@ts-ignore
import Graph from "react-graph-vis";
import { marked } from "marked";

const ContentQuiz: FC<ContentQuizProps> = ({ data }) => {
	const renderMarkdown = (markdown: any) => {
		// Convert Markdown to HTML
		const htmlContent = marked(markdown);

		return { __html: htmlContent }; // Return the HTML object
	};
	const { loggedin, user } = useSelector(authSelector);
	const layoutRef = useRef<any>(null);
	const [width, setWidth] = useState(0);
	const [component, setComponent] = useState<JSX.Element>();
	const [show, setShow] = useState(false);
	const [bad, setBad] = useState(false);

	useEffect(() => {
		if (layoutRef.current) {
			setWidth(layoutRef.current.offsetWidth); // Lấy width ban đầu
		}
	}, []);

	if (data.type === "ASK") {
		return (
			<div className="flex flex-row px-[20px] pt-[30px] items-start gap-2  w-full">
				<Image
					src={DefaultAvatarIcon}
					alt="Logo"
					className="w-[40px] h-[40px] rounded-full"
				/>
				<div className=" flex flex-col gap-4 mt-[7px] w-full">
					<span className="font-sans font-semibold text-black text-xl">
						{user?.name || "Customer"}
					</span>
					<div className="flex flex-col mt-[5px] gap-2">
						<p className="font-sans font-normal text-black text-base mb-[10px]">
							{data.question}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="flex flex-row px-[20px] pt-[30px] items-start gap-2 w-full "
			onMouseEnter={() => {
				setShow(true);
			}}
			onMouseLeave={() => {
				setShow(false);
			}}
		>
			<div className="rounded-full min-w-[40px] h-[40px] bg-gray-200 border border-gray-200 flex items-center justify-center">
				<Image src={SmallLogoIcon} alt="Logo" className="w-[20px] h-[20px]" />
			</div>
			<div className="flex flex-col gap-4 mt-[7px] w-full">
				<span className="font-sans font-semibold text-black text-xl">Quiz</span>
				<div className="flex flex-col mt-[5px] gap-2">
					{/* <p className="font-sans font-normal text-black text-base mb-[10px]">
            {data.answer === "" ? "Not Found" : data.answer}
          </p> */}
					<p
						className="font-sans font-normal text-black text-base mb-[10px]"
						dangerouslySetInnerHTML={renderMarkdown(
							data.answer === "" ? "Not Found" : data.answer
						)}
					/>
				</div>
				{data.graph && data.graph.length > 0 && (
					<div
						className="flex h-[500px] w-full bg-slate-100 rounded-[4px]"
						ref={layoutRef}
					>
						{component}
					</div>
				)}
			</div>
		</div>
	);
};

export default ContentQuiz;
