import {parseXML, toXML} from "../utils/xmlParser";
import {request} from "./request";
import toast from "react-hot-toast";

export const fetchVehicles = async (data) => {

	// if (data !== undefined) {
		console.log(data)

		let url = `/vehicles?page=${data.page}&limit=${data.limit}`

		for (let key in data) {
			if (data[key] !== "") {
				if (key !== 'page' && key !== 'limit') {
					url = url + `&${key}=${data[key]}`
				}
			}
		}

		console.log('url', url)

		let response

		try {
			response = await request(url)
		} catch (e) {
			return []
		}

		// return response.VehiclesList.Vehicle

		if (response.VehiclesList.Vehicle === undefined) {
			return []
		} else if (response.VehiclesList.Vehicle.length !== undefined) {
			return response.VehiclesList.Vehicle
		} else {
			return [response.VehiclesList.Vehicle]
		}
	// } else return []

}

export const fetchVehicleById = async (id) => {

	const response = await request(`/vehicles/${id}`)

	console.log('fetchVehicleById', response.Vehicle)

	return response.Vehicle
}

export const addVehicle = async (data) => {
	console.log('addVehicle', toXML(data))
	request('/vehicles', 'POST', data).then((response) => {
		toast.success(`Транспортное средство ${response.Vehicle.name._text} добавлено`)
		return response
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const saveVehicle = async (data) => {
	console.log('saveVehicle', toXML(data))
	request('/vehicles', 'PUT', data).then((response) => {
		toast.success(`Транспортное средство ${response.Vehicle.name._text} обновлено`)
		return response
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const deleteVehicle = async (id) => {
	request(`/vehicles/${id}`, 'DELETE').then((response) => {
		toast.success(`Транспортное средство удалено`)
		return response
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const fetchCountByType = async (type) => {
	const response = await request(`/vehicles/count/type?type=${type}`)
	return response.VehiclesCount._text
}

export const fetchByName = async (name) => {
	let response
	try {
		response = await request(`/vehicles/name/like?nameLike=${name}`)
		return response.VehiclesList.Vehicle
	} catch (e) {
		toast.error(e.message)
		return []
	}
}

export const fetchByEnginePowerLessThan = async (enginePower) => {
	let response
	try {
		response = await request(`/vehicles/enginePowere/less?enginePower=${enginePower}`)
		return response.VehiclesList.Vehicle
	} catch (e) {
		toast.error(e.message)
		return []
	}
}

export const fetchByType = async (type) => {
	let response
	try {
		response = await request(`/search/by-type/${type}`,'GET', null, true)
		return response.List.item
	} catch (e) {
		toast.error(e.message)
		return []
	}
}

export const fetchByEnginePowerRange = async (from, to) => {
	let response
	try {
		response = await request(`/search/by-engine-power/${from}/${to}`,'GET', null, true)
		return response.List.item
	} catch (e) {
		toast.error(e.message)
		return []
	}
}

