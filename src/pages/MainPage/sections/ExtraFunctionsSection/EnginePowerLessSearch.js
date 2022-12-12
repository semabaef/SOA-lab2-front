import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {fetchByEnginePowerLessThan} from "../../../../api/api";

export const EnginePowerLessSearch = ({ setResult = () => {}, updateVehicles = () => {} }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		const result = await fetchByEnginePowerLessThan(data.enginePower)
		setResult(result)
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Объекты, значение поля enginePower которых меньше заданного">
					<input
						type="text"
						className={styles.input}
						placeholder="Мощность (л.с.)"
						{...register('enginePower')}
					/>
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
