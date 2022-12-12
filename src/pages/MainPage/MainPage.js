import styles from './MainPage.module.css'
import {Layout} from "../../components/Layout/Layout";
import {FiltersSection} from "./sections/FiltersSection/FiltersSection";
import {TableSection} from "./sections/TableSection/TableSection";
import {getStudentsAmount, fetchVehicles} from "../../api/api";
import {useEffect, useState} from "react";
import {ExtraFunctionsSection} from "./sections/ExtraFunctionsSection/ExtraFunctionsSection";

export const MainPage = () => {

	const [vehicles, setVehicles] = useState([])
	const [pageNum, setPageNum] = useState(1)
	const [pageLimit, setPageLimit] = useState(5)
	const [shouldUpdate, setShouldUpdate] = useState(false)

	const update = () => {
		console.log('trigger update')
		setShouldUpdate(prevState => !prevState)
	}

	const getVehicles = async () => {
		const response = await fetchVehicles({page: pageNum, limit: pageLimit, sortBy: "id", order: "ASC"})
		console.log('main data', response)
		setVehicles(response)
	}

	const setResult = (vehiclesList) => {
		if (vehiclesList === undefined) {
			setVehicles([])
		} else if (vehiclesList.length === undefined) {
			setVehicles([vehiclesList])
		} else setVehicles(vehiclesList)
	}

	const prevPageHandler = () => {
		if (pageNum > 1) {
			setPageNum(prevState => prevState - 1)
		}
	}

	const nextPageHandler = () => {
		setPageNum(prevState => prevState + 1)
	}

	const setFirstPage = () => {
		setPageNum(1)
	}

	useEffect(() => {
		getVehicles()
	}, [shouldUpdate])


	return (
		<Layout>
			<div className={styles.page}>
				<h1 className="title">Транспортные средства</h1>
				<FiltersSection setGroups={setVehicles} page={pageNum} limit={pageLimit} setFirstPage={setFirstPage}/>
				<ExtraFunctionsSection setResult={setResult} updateVehicles={update}/>
				<TableSection vehicles={vehicles} nextPage={nextPageHandler} prevPage={prevPageHandler} limit={pageLimit}
				              page={pageNum}
				              setLimit={setPageLimit}
				              updateVehicles={update}
				/>
			</div>
		</Layout>
	)
}
