import axios from 'axios';

const agent = axios.create({
		baseURL: 'http://146.19.80.223:1337/api',
		headers: {
				'Content-Type': 'application/json',
		},
})

export default agent;