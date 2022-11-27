import "./homepage.scss";
import { toast } from "react-toastify";

const Homepage = () => {
	return (
		<div>
			<button
				onClick={() => {
					toast.warn(
						<div>
							<ul>
								<li>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Necessitatibus
								</li>
								<li>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Necessitatibus
								</li>
							</ul>
						</div>
						// {
						// 	icon: false,
						// }
					);
				}}
			>
				Click
			</button>
		</div>
	);
};
export default Homepage;

{
	/* <div className="left">
	<h3 className="loginLogo">Spedi</h3>
	<span className="loginDesc">
		We strive to provide quality Construction Works to our clients and steadfastly advocate for
		the maintenance and promotion of health and safety of our employees and business partners
		and the communities wherein we operate, as well as the protection of their resources and the
		environment.
	</span>
</div>; */
}
