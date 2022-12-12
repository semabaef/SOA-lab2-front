import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {fetchByEnginePowerRange} from "../../../../api/api";

export const EnginePowerRangeSearch = ({ setResult = () => {}, updateVehicles = () => {} }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		console.log(data)
		const result = await fetchByEnginePowerRange(data.from, data.to)
		setResult(result)
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Мощность двигателя от">
					<input
						type="text"
						className={styles.input}
						placeholder="Мощность (л.с.)"
						{...register('from')}
					/>
				</InputWrapper>
				<InputWrapper title="Мощность двигателя до">
					<input
						type="text"
						className={styles.input}
						placeholder="Мощность (л.с.)"
						{...register('to')}
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
