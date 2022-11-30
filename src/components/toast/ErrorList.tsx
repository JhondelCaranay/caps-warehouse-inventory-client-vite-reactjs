const ErrorList = ({ messages }: { messages: string[] }) => {
	if (typeof messages === "string") messages = [messages];
	else if (!Array.isArray(messages))
		messages = ["Something went wrong, our team is working on it"];
		

	return (
		<div>
			<ul
				style={{
					padding: "0",
					margin: "0",
					marginLeft: "13px",
				}}
			>
				{messages.map((err: any, index: number) => (
					// small text
					<li
						key={index}
						style={{
							fontSize: "0.8rem",
							color: "red",
						}}
					>
						{err}
					</li>
				))}
			</ul>
		</div>
	);
};
export default ErrorList;
