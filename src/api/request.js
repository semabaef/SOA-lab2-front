import {ADDITIONAL_API_URL, BASE_API_URL} from "../config";
import {parseXML, toXML} from "../utils/xmlParser";

export const request = async (url, method = 'GET', body = null, secondService = false) => {
	let response
	let options = {
		method: method,
		headers: {
			'accept': 'application/xml',
			'content-type': 'application/xml'
		}
	}

	if (body) {
		console.log('body', toXML(body))
		options.body = toXML(body)
	}

	try {
		// response = await fetch(`${BASE_API_URL}${url}`, options)
		response = await fetch(`${secondService ? ADDITIONAL_API_URL : BASE_API_URL}${url}`, options)

		// console.log('request response', await response.text())

		if (response.ok) {
			let responseString = await response.text()
			let json
			try {
				json = parseXML(responseString)
			} catch (e) {
				responseString = responseString.split("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
				const editedResponseString = `<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response>${responseString[1]}</Response>`
				json = parseXML(editedResponseString)
			}
			return json
		} else {
			const responseString = await response.text()
			const responseJson = parseXML(responseString)
			console.error(responseJson.ExceptionDTO.message._text)
			throw new Error(responseJson.ExceptionDTO.message._text)
		}
	} catch (e) {
		throw e
	}
}
