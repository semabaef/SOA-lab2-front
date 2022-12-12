import styles from './VehiclesTable.module.css'
import {parseDate} from "../../utils/dateParser";
// import {useNavigate} from "react-router-dom";

export const VehiclesTable = ({ vehicles = [], editObject = () => {} }) => {

	// const navigate = useNavigate()

	return (
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>Название</th>
					<th>x</th>
					<th>y</th>
					<th>Дата создания</th>
					<th>Мощность двигателя (л.с.)</th>
					<th>Кол-во колес</th>
					<th>Пробег</th>
					<th>Тип</th>
				</tr>
			</thead>

			<tbody>
			{
				vehicles.map((item, index) => {
					return (
						<tr key={index} onClick={() => {editObject(item.id._text)}}>
						{/*<tr key={index} onClick={() => {navigate(`/edit-group/${group.id._text}`)}}>*/}
							<td>{item.id._text}</td>
							<td>{item.name._text}</td>
							<td>{item.coordinates.x._text}</td>
							<td>{item.coordinates.y._text}</td>
							<td>{parseDate(item.creationDate._text)}</td>
							<td>{item.enginePower._text}</td>
							<td>{item.numberOfWheels._text}</td>
							<td>{item.distanceTravelled._text}</td>
							<td>{item.type._text}</td>
						</tr>
					)
				})
			}
			</tbody>
		</table>
	)
}
