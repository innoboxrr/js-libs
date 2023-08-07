import * as dayjs from 'dayjs'

const SEG = 1000;
const MIN = 60000;
const HOUR = 3600000;
const DAY = 86400000;

const unixTime = () => {

	return Date.now();

}

const subDays = (unix, days) => {

	return new Date(unix - (days * DAY));

}

const format = (date) => {


}

export const getPolicyFrequencyText = (unit, interval) => {
    let text = '';
    switch (unit) {
        case 'monthly':
            text = 'mensual';
            if (interval === 2) {
                text = 'bimestral';
            } else if (interval === 3) {
                text = 'trimestral';
            } else if (interval > 3) {
                text = 'cada ' + interval + ' meses';
            }
            break;
        case 'annual':
            text = 'anual';
            if (interval === 2) {
                text = 'bianual';
            } else if (interval === 3) {
                text = 'tri-anual';
            } else if (interval > 3) {
                text = 'cada ' + interval + ' años';
            }
            break;
        case 'quarterly':
            text = 'trimestral';
            if (interval > 1) {
                text = 'cada ' + interval + ' trimestres';
            }
            break;
        case 'biannual':
            text = 'bianual';
            if (interval > 1) {
                text = 'cada ' + interval + ' años';
            }
            break;
        case 'biennial':
            text = 'bianual';
            if (interval > 1) {
                text = 'cada ' + interval + ' años';
            }
            break;
        // Agrega más casos para otras unidades si es necesario.
        case 'weekly':
            text = 'semanal';
            if (interval > 1) {
                text = 'cada ' + interval + ' semanas';
            }
            break;
        case 'daily':
            text = 'diaria';
            if (interval > 1) {
                text = 'cada ' + interval + ' días';
            }
            break;
        default:
            text = 'frecuencia no especificada';
            break;
    }

    return text;
}


export {
	unixTime,
	subDays
}