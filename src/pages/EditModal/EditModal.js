import styles from './EditModal.module.css'
import {Layout} from "../../components/Layout/Layout";
import {Card} from "../../components/Card/Card";
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../components/Input/InputWrapper";
// import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
	addGroup,
	getStudentsByGroupId,
	fetchVehicleById,
	saveGroup,
	addVehicle,
	saveVehicle,
	deleteVehicle
} from "../../api/api";
import {toXML} from "../../utils/xmlParser";

export const EditModal = ({ close, id = null, updateVehicles = () => {} }) => {

	const [creationDate, setCreationDate] = useState(null)

	const { register, handleSubmit, formState: { errors }, setValue } = useForm()

	const onSubmit = async (data) => {
		if (id) {
			const dto = {
				Vehicle: {
					...data,
					coordinates: {
						x: data.x,
						y: data.y
					},
					creationDate: creationDate,
					id: id
				}
			}
			delete dto.Vehicle.x
			delete dto.Vehicle.y
			saveVehicle(dto).then(() => {
				setTimeout(() => {
					updateVehicles()
					getData()
				}, 1000)
			})
		} else {
			const dto = {
				Vehicle: {
					...data,
					coordinates: {
						x: data.x,
						y: data.y
					}
				}
			}
			delete dto.Vehicle.x
			delete dto.Vehicle.y
			addVehicle(dto).then(() => {
				setTimeout(() => {
					updateVehicles()
					getData()
					close()
				}, 1000)
			})
		}
	}

	const deleteHandler = () => {
		deleteVehicle(id).then(() => {
			setTimeout(() => {
				updateVehicles()
				close()
			}, 1000)
		})
	}

	const getData = async () => {
		if (id) {
				fetchVehicleById(id).then((vehicle) => {
					setValue("name", vehicle.name._text)
					// setValue("creationDate", vehicle.creationDate._text)
					setValue("x", vehicle.coordinates.x._text)
					setValue("y", vehicle.coordinates.y._text)
					setValue("enginePower", vehicle.enginePower._text)
					setValue("numberOfWheels", vehicle.numberOfWheels._text)
					setValue("distanceTravelled", vehicle.distanceTravelled._text)
					setValue("type", vehicle.type._text)
					setCreationDate(vehicle.creationDate._text)
				})
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<div className={styles.bg} onClick={close}/>
			<div className={styles.modal}>
				{/*<h1 className="title">???????????????? ????????????</h1>*/}
				<Card title="???????????????? ?????????????????????????? ????????????????">
					{ id && <h2 className={styles.itemId}>id {id}</h2> }
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<div className={styles.formInnerContainer}>
							<div className={styles.formColumn}>
								<InputWrapper title="????????????????">
									<input
										type="text"
										className={styles.input}
										placeholder="????????????????"
										{...register('name')}
									/>
								</InputWrapper>
								<InputWrapper title="???????????????????? X">
									<input
										type="text"
										className={styles.input}
										placeholder="x"
										{...register('x')}
									/>
								</InputWrapper>
								<InputWrapper title="???????????????????? Y">
									<input
										type="text"
										className={styles.input}
										placeholder="y"
										{...register('y')}
									/>
								</InputWrapper>
								<InputWrapper title="???????????????? (??.??.)">
									<input
										type="text"
										className={styles.input}
										placeholder="???????????????? (??.??.)"
										{...register('enginePower')}
									/>
								</InputWrapper>
							</div>
							<div className={styles.formColumn}>
								<InputWrapper title="??????-???? ??????????">
									<input
										type="text"
										className={styles.input}
										placeholder="???????????????????? ??????????"
										{...register('numberOfWheels')}
									/>
								</InputWrapper>
								<InputWrapper title="????????????">
									<input
										type="text"
										className={styles.input}
										placeholder="????????????"
										{...register('distanceTravelled')}
									/>
								</InputWrapper>
								<InputWrapper title="??????">
									<select {...register('type')}>
										<option value="CAR">
											????????????
										</option>
										<option value="PLANE">
											??????????????
										</option>
										<option value="HOVERBOARD">
											??????????????????
										</option>
									</select>
								</InputWrapper>
							</div>
						</div>
						<div className={styles.btnRow}>
							<button className="btn_filled" type="submit">??????????????????</button>
							<button className="btn_outlined" type="button" onClick={close}>????????????</button>
							{
								id && <>
									<button className="btn_outlined" type="button" onClick={deleteHandler}>??????????????</button>
								</>
							}

						</div>
					</form>
				</Card>
			</div>
		</>
	)
}
