import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {fetchByName} from "../../../../api/api";

export const LikeSearch = ({ setResult = () => {}, updateVehicles = () => {} }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		const result = await fetchByName(data.nameLike)
		setResult(result)
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Объекты, значение поля name которых содержит">
					<input
						type="text"
						className={styles.input}
						placeholder="Подстрока"
						{...register('nameLike')}
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
