// write your code here!
const input = d3.select("input");
const phrase = d3.select("#phrase");
const count = d3.select("#count");
const letters = d3.select("#letters");

function howManyTimesRepeated(totalString, char) {
	let count = 0;
	totalString.split("").map((ch) => (ch === char ? count++ : null));
	return count;
}

function getFrequencies(str) {
	const strArr = str.split("");
	const setArr = Array.from(new Set(strArr));
	const data = setArr.map((each) => ({
		character: each,
		count: howManyTimesRepeated(str, each),
	}));
	return data;
}

d3.select("form").on("submit", function () {
	d3.event.preventDefault();

	const val = input.property("value");
	const data = getFrequencies(val);
	input.property("value", "");

	phrase.text("Analysis of: " + val);

	const lettersSelection = letters
		.selectAll("div.letter")
		.data(data, (d) => d.character);

	lettersSelection.classed("new", false).exit().remove();

	lettersSelection
		.enter()
		.append("div")
		.classed("letter", true)
		.classed("new", true)
		.text((d) => d.character)
		.style("height", (d) => d.count * 15 + "px");

	const newChars = lettersSelection.enter().nodes().length;

	count.text("New Characters: " + newChars);
});

d3.select('#reset').on('click', function(){
  d3.event.preventDefault();
  d3.selectAll('.letter').remove();
  count.text('');
  phrase.text('');
})
