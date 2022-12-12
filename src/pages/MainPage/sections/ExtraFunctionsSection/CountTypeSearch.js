import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {fetchCountByType} from "../../../../api/api";

export const CountTypeSearch = () => {

	const [count, setCount] = useState(0)

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		const response = await fetchCountByType(data.type)
		setCount(response)
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Количество объектов типа">
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
				<p>= {count}</p>
				<div className={styles.btnRow}>
					<button className="btn_filled" type="submit">Применить</button>
					<button className="btn_outlined" type="reset" onClick={() => {
						reset()
						setCount(0)
					}}>Очистить</button>
				</div>
			</form>
		</div>
	)
}
