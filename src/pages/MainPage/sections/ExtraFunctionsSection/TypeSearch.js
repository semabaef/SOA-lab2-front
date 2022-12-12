import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {fetchByType} from "../../../../api/api";

export const TypeSearch = ({ setResult = () => {}, updateVehicles = () => {} }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		const result = await fetchByType(data.type)
		setResult(result)
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Найти все транспортные средства заданного типа">
					<select {...register('type')}>
						{/*<option value="">*/}
						{/*	Все*/}
						{/*</option>*/}
						<option value="CAR">
							Машина
						</option>
						<option value="PLANE">
							Самолет
						</option>
						<option value="HOVERBOARD">
							Ховерборд
						</option>
					</select>
				</InputWrapper>
				<div className={styles.btnRow}>
					<button className="btn_filled" type="submit">Применить</button>
					<button className="btn_outlined" type="reset" onClick={() => {
						reset()
						updateVehicles()
					}}>Очистить</button>
				</div>
			</form>
		</div>
	)
}
