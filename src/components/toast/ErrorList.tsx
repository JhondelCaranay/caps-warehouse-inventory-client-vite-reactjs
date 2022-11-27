const ErrorList = ({ messages }: { messages: string[] }) => {
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
