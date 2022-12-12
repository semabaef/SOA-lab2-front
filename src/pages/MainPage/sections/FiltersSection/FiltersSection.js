import styles from './FiltersSection.module.css'
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {Card} from "../../../../components/Card/Card";
import { useForm } from "react-hook-form";
import {fetchVehicles} from "../../../../api/api";
import {useEffect} from "react";

export const FiltersSection = ({ setGroups = () => {}, page, limit, setFirstPage }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		data.page = page
		data.limit = limit
		const response = await fetchVehicles(data)
		setGroups(response)
	}

	const filter = () => {
		if (page === 1) {
			handleSubmit(onSubmit)()
		} else {
			setFirstPage()
		}
	}

	useEffect(() => {
		handleSubmit(onSubmit)()
	}, [page, limit])


	return (
		<section>
			<Card title="фильтрация и сортировка">
				<form>
					<div className={styles.filtersContainer}>
						<div className={styles.filtersRow}>
							<InputWrapper title="ID">
								<input
									type="text"
									className={styles.input}
									placeholder="id"
									{...register('id')}
								/>
							</InputWrapper>
							<InputWrapper title="Название">
								<input
									type="text"
									className={styles.input}
									placeholder="Название"
									{...register('name')}
								/>
							</InputWrapper>
							<InputWrapper title="Координата X">
								<input
									type="text"
									className={styles.input}
									placeholder="x"
									{...register('x')}
								/>
							</InputWrapper>
							<InputWrapper title="Координата Y">
								<input
									type="text"
									className={styles.input}
									placeholder="y"
									{...register('y')}
								/>
							</InputWrapper>

						</div>
						<div className={styles.filtersRow}>
							<InputWrapper title="Дата создания">
								<input
									type="date"
									className={styles.input}
									placeholder="Дата создания"
									{...register('creation_date')}
								/>
							</InputWrapper>
							<InputWrapper title="Мощность (л.с.)">
								<input
									type="text"
									className={styles.input}
									placeholder="Мощность (л.с.)"
									{...register('enginePower')}
								/>
							</InputWrapper>
							<InputWrapper title="Кол-во колес">
								<input
									type="text"
									className={styles.input}
									placeholder="Количество колес"
									{...register('numberOfWheels')}
								/>
							</InputWrapper>
							<InputWrapper title="Пробег">
								<input
									type="text"
									className={styles.input}
									placeholder="Пробег"
									{...register('distanceTravelled')}
								/>
							</InputWrapper>
							<InputWrapper title="Тип">
								<select {...register('type')}>
									<option value="">
										Все
									</option>
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
						</div>
						<div className={styles.filtersRow}>
							<InputWrapper title="Сортировать по">
								<select {...register('sortBy')}>
									<option value="id">
										id
									</option>
									<option value="name">
										Названию
									</option>
									<option value="creationDate">
										Дате создания
									</option>
									<option value="x">
										Координате X
									</option>
									<option value="y">
										Координате Y
									</option>
									<option value="enginePower">
										Мощности (л.с.)
									</option>
									<option value="numberOfWheels">
										Кол-ву колес
									</option>
									<option value="distanceTravelled">
										Пробегу
									</option>
									<option value="type">
										Типу
									</option>
								</select>
							</InputWrapper>
							<InputWrapper title="Порядок сортировки">
								<select {...register('order')}>
									<option value="ASC">
										По возрастанию
									</option>
									<option value="DESC">
										По убыванию
									</option>
								</select>
							</InputWrapper>
							<div className={styles.btnRow}>
								<button className="btn_filled" type="button" onClick={filter}>Применить</button>
								<button className="btn_outlined" type="reset" onClick={() => {
									reset()
									filter()
								}}>Очистить</button>
							</div>
						</div>
					</div>
				</form>
			</Card>
		</section>
	)
}
