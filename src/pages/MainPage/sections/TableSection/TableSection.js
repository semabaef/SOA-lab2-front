import styles from './TableSection.module.css'
import {Card} from "../../../../components/Card/Card";
import {VehiclesTable} from "../../../../components/VehiclesTable/VehiclesTable";
// import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../../components/Pagination/Pagination";
import {useState} from "react";
import {EditModal} from "../../../EditModal/EditModal";

export const TableSection = ({vehicles, nextPage, prevPage, page, limit, setLimit, updateVehicles = () => {}}) => {


	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedObjectId, setSelectedObjectId] = useState(null)

	const openOpen = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedObjectId(null)
	}

	const editObject = (id) => {
		setSelectedObjectId(id)
		openOpen()
	}

	return (
		<section className={styles.section}>
			{ isModalOpen && <EditModal close={closeModal} id={selectedObjectId} updateVehicles={updateVehicles} /> }
			{/*<EditModal />*/}
			<Card title="Список транспортных средств">
				<div className={styles.header}>
					<Pagination onPrev={prevPage} onNext={nextPage} onChangeLimit={setLimit} actualPageNum={page}
					            limit={limit}/>
					<button className="btn_filled" onClick={openOpen}>Добавить
					</button>
				</div>
				<VehiclesTable vehicles={vehicles} editObject={editObject}/>
			</Card>
		</section>
	)
}
