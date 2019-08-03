import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (dateString, format) => {
	const datetime = moment.unix(dateString)

	switch (format.toLowerCase()) {
		case 'short':
			return datetime.format('YYYY-MM-DD')
			break
		case 'ago':
			return datetime.fromNow()
			break
	}
})
