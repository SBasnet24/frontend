import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import nationalities from "../utils/nationalities";
import education from "../utils/education_background";
import apiServices from "../services/apiServices";
import _ from "lodash";
import { toast } from "react-toastify";
import { toastConfig } from "../helper";
import Header from "../components/Header";

const UpdateClient = ({ history, match }) => {
	let id = match.params.id;
	const { register, handleSubmit, reset } = useForm();
	const [client, setClient] = useState({});

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getOneClient() {
			setLoading(true);
			let data = await apiServices.getOneClient(id);
			if (data.client) {
				setClient(data.client);
				setLoading(false);
			} else if (data.error) {
				setError(data.error);
				toast.error(error, toastConfig);
			}
		}
		getOneClient();
	}, [error, id]);

	useEffect(() => {
		if (client) {
			reset({
				name: client.name,
				gender: client.gender,
				phone: parseInt(client.phone),
				email: client.email,
				birthday: client.dob,
				address: client.address,
				nationality: client.nationality,
				education_background: client.education_background,
				preffered_mode: client.preffered_mode,
			});
		}
	}, [client, reset]);

	const onSubmit = async (data) => {
		let {
			name,
			gender,
			phone,
			email,
			address,
			nationality,
			birthday: dob,
			education_background,
			preffered_mode,
		} = data;
		let vError = false;
		if (_.isEmpty(name)) {
			vError = true;
			toast.error("Name is required", toastConfig);
		}
		if (_.isEmpty(gender)) {
			vError = true;
			toast.error("Gender is required", toastConfig);
		}
		if (_.isEmpty(phone.toString())) {
			vError = true;
			toast.error("Phone is required", toastConfig);
		}
		if (_.isEmpty(email)) {
			vError = true;
			toast.error("Email is required", toastConfig);
		}
		if (_.isEmpty(address)) {
			vError = true;
			toast.error("Address is required", toastConfig);
		}
		if (_.isEmpty(nationality)) {
			vError = true;
			toast.error("Nationality is required", toastConfig);
		}
		if (_.isEmpty(dob)) {
			vError = true;
			toast.error("Date of Birth is required", toastConfig);
		}
		if (_.isEmpty(education_background)) {
			vError = true;
			toast.error("Education Background is required", toastConfig);
		}
		if (_.isEmpty(preffered_mode)) {
			vError = true;
			toast.error("Preffered Mode is required", toastConfig);
		}

		if (!vError) {
			let addingData = {
				name,
				gender,
				phone,
				email,
				address,
				nationality,
				dob,
				education_background,
				preffered_mode,
			};
			const result = await apiServices.updateClient(id,addingData);
			if(result.isUpdated){
			    toast.success("Client updated successfully",toastConfig);
                history.push("/clients");
			}else if(result.error){
			    toast.error(result.error,toastConfig);
			}
		}
	};
	return (
		<>
			<section>
				<Header/>
				<div className="container mb-5">
					<div className="row">
						<div className="col-md-10">
							{loading ? (
								<h1>Loading......</h1>
							) : (
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="main__form mt-3"
								>
									<h3>Update Client</h3>
									<div className="row">
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Full Name</label>
												<input
													{...register("name")}
													type="name"
													className="form-control"
													placeholder="Name"
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Phone Number</label>
												<input
													type="number"
													{...register("phone")}
													className="form-control"
													placeholder="Phone Number"
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Email</label>
												<input
													type="email"
													{...register("email")}
													className="form-control"
													placeholder="Email"
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Date of Birth</label>
												<input
													type="date"
													{...register("birthday")}
													className="form-control"
													id="birthday"
													name="birthday"
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Address</label>
												<input
													type="name"
													{...register("address")}
													className="form-control"
													placeholder="Address"
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Nationality</label>
												<select
													className="form-select"
													{...register("nationality")}
													aria-label="Default select example"
													required
												>
													{nationalities.map((n) => {
														return <option value={n}>{n}</option>;
													})}
												</select>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Gender</label>
												<select
													className="form-select"
													{...register("gender")}
													aria-label="Default select example"
													required
												>
													<option selected>Female</option>
													<option value="male">Male</option>
												</select>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Preferred mode</label>
												<select
													className="form-select"
													{...register("preffered_mode")}
													aria-label="Default select example"
													required
												>
													<option defaultValue="none" selected>
														None
													</option>
													<option defaultValue="phone">Phone Number</option>
													<option defaultValue="email">Email</option>
												</select>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">
													Education Background
												</label>
												<select
													className="form-select"
													{...register("education_background")}
													aria-label="Default select example"
													required
												>
													{education.map((e) => {
														return <option value={e}>{e}</option>;
													})}
												</select>
											</div>
										</div>
										<div className="col-12">
											<input
												type="submit"
												value="Update"
												className="btn submit__btn "
											/>
										</div>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default UpdateClient;
