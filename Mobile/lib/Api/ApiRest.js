const API_URL = process.env.EXPO_PUBLIC_API_URL || "192.168.1.47:3000"

const path = '/api/user/'

//********************************************************************************************
//*                                  GET                                                     *
//********************************************************************************************

export function tokenIsEnable(token) {
	const url = API_URL + path + 'tokenisenable';
	return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((response) => response.json()).catch((error) => console.error(error))
}

export function getMessages(token) {
	const url = API_URL + path + 'getmessages';
	return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((response) => response.json()).catch((error) => console.error(error))
}

//********************************************************************************************
//*                                      POST                                                *
//********************************************************************************************

export const signUp = async (userName) => {
	const url = API_URL + path + 'signup';
	return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName
                })
            }).then((response) => response.json()).catch((error) => console.error(error));
}

export const sendMessage = async (contenu, token) => {
	const url = API_URL + path + 'sendmessage';
	return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    contenu: contenu
                })
            }).then((response) => response.json()).catch((error) => console.error(error));
}
