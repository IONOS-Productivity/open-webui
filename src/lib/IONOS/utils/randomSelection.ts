/** Select max picks from the array.
  *
  * @param {Array} array of someting
  * @param {Number} maxPicks max number of picks
  */
export default (array: Array<any>, maxPicks: number): Array<any> => {
	let pickedIndexes = { };
	let result = [];

	for (let index = 0, counter = 0; counter < Math.min(array.length, maxPicks);) {
		index = Math.floor(Math.random() * array.length);

		if (index in pickedIndexes) {
			continue;
		}

		counter++

		pickedIndexes[index] = true;

		result.push(array[index]);
	}

	return result;
}
