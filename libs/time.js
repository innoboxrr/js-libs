/*
 *
 * Convierte un entero (tiempo en segundos) en un formato de hh:mm:ss
 * Tiene diferentes variantes como los divisores en entre los momentos
 * También un 4 parámetro que detemrina si se muestran los segundos
 *
 */
const formatSeconds = (sec, dh = ' : ', dm = ' : ', ds = '', show_seg = true) => {
    
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);

    seconds = Math.round(seconds * 100) / 100;

    var result = '';

    if(hrs > 0) result = (hrs < 10 ? "0" + hrs : hrs) + "" + dh;

    result += (min < 10 ? "0" + min : min) + "" + dm;

    if(show_seg) result += "" + (seconds < 10 ? "0" + seconds : seconds) + "" + ds;

    return result;

}

export {
	formatSeconds
}