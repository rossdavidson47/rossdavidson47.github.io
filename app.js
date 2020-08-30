//READ DATA
  // Code from 07-ins-github-pages
  // Use D3 fetch to read the JSON file
  d3.json("samples.json").then((importedData) => {
    // assign the data to a variable, and print to console.
    const data = importedData;
    console.log(data);
    // create a variable for the names, print to console
    const subjectNames = data.names
    console.log(subjectNames);
    // create a variable for the metadata, print to console
    const subjectMetadata = data.metadata
    console.log(subjectMetadata);
    // create a variable for the samples, print to console
    const subjectSamples = data.samples
    console.log(subjectSamples);
  
//CREATE A DROP DOWN MENU
  // select the html item
  let select = d3.select("#selDataset");
  //select all the option values (initially there are none, but you then append them)
  select.selectAll("option")
      .data(subjectNames)
      .enter()
      .append("option")
      .attr("value", i => i)
      .text(i => i);

//DRAW A BAR CHART FOR SINGLE ID
  // function for drawing a bar chart
  function draw_Bar_Chart(subjectID) {
    //code from 09-stu-event_final
    // Create an array of each country's numbers and print to console
    const usArray = subjectSamples.filter(d => d.id == subjectID);
    console.log(usArray);
    //find the indiviudal data in first index in the array and print to console
    const individualData = usArray[0];
    console.log(individualData);
    // find the top ten otuIDs (whatever they are) and print to console
    const otuIDs = individualData.otu_ids.slice(0,10);
    console.log(otuIDs);
    //find the x-axis vaules (top ten) and print to console
    const x_axis_values =  individualData.sample_values.slice(0,10);
    console.log(x_axis_values);
    // find the y-axis labels (top ten) and print to console
    const bacteriaNames =  individualData.otu_labels.slice(0,10);
    console.log (bacteriaNames);
    // code from 06-Evr_arrow_functions
    // Functions with more than one parameter still need the parenthesis
    // Need to split the names by ";" to isolate the genus only, print to console
    const y_axis_labels = bacteriaNames.map((item, index) => {
      const genusOnly = bacteriaNames[index].split(";").reverse()[0];
        return `${index}: ${genusOnly}`;});
    console.log (y_axis_labels); 

    //define horizontal bar chart // Code from 07-ins-github-pages
    const chart1 = {
      x: x_axis_values,
      y: y_axis_labels,
      name: "Not Greek",
      type: "bar",
      orientation: "h"}
    // Apply the group bar mode to the layout // Code from 07-ins-github-pages
    const chart_1_Layout = {
      title: "Top 10 Bacteria - Selected Subject",
      margin: {
        l: 150,
        r: 0,
        t: 100,
        b: 30}
    }
    // Render the plot to the div tag with id "bar1" // Code from 07-ins-github-pages
    Plotly.newPlot("bar1", [chart1], chart_1_Layout);
  }

draw_Bar_Chart("940");

//DRAW BAR CHART FOR AGGREGATE
  //here we go again, find all the ids and log to console
  //assign to a new array and flatten (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
  const totalIDsArr = subjectSamples.map(i => i.otu_ids).flat();
  console.log(totalIDsArr);
  //get all the sample vallues  and log to console
  const totalValuesArr = subjectSamples.map(i => i.sample_values).flat();
  console.log(totalValuesArr);
  //get all the labels and log to console
  const totalLabelsArr = subjectSamples.map(i => i.otu_labels).flat();
  console.log(totalLabelsArr);

  //loops
    //find unique ID's
    let uniqueIDs = [];
    totalIDsArr.forEach((entry) => {
      if (uniqueIDs.includes(entry)){ }
      else {
      uniqueIDs.push(entry)}
    });
    console.log(uniqueIDs);
    //create an array with all ids and values
    let mergeArr = {
      otu_ids: totalIDsArr,
      sample_values: totalValuesArr
    };
    console.log(mergeArr);
    //create a summary ID, populated with unique IDs
    let sumArr = {
      otu_ids: uniqueIDs,
      sample_values: []
    };
    // populate with summary array with zeros
    mergeArr.otu_ids.forEach((entry) => {
      let indexUse = sumArr.otu_ids.indexOf(entry);
      sumArr.sample_values[indexUse] = 0;
    });
    // where there are non-unqiue id's, add the values to each other
    i=0;
    mergeArr.otu_ids.forEach((entry) => {
      let indexUse = sumArr.otu_ids.indexOf(entry);
      sumArr.sample_values[indexUse] += parseInt(mergeArr.sample_values[i] );
      i=i+1; 
    });
   console.log(sumArr);
  // find x-axise values
    let x_axis_values3 = sumArr.sample_values;
    x_axis_values3.sort(function(a, b){return b - a});
    x_axis_values3 = x_axis_values3.slice(0,10).reverse();
    console.log(x_axis_values3);
  //look up y values
  y_axis_labels3 = [];
    x_axis_values3.forEach((entry) =>{
    let indexUse2 = sumArr.sample_values.indexOf(entry);
    y_axis_labels3.push(sumArr.otu_ids[indexUse2])
   });
   y_axis_labels3 =y_axis_labels3.toString()
   console.log(y_axis_labels3);
   
//DRAW THE SECOND BAR CHART
    //define horizontal bar chart // Code from 07-ins-github-pages
    const chart2 = {
      x: x_axis_values3,
      y: y_axis_labels3,
      name: "Not Greek",
      type: "bar",
      orientation: "h"}
    // Apply the group bar mode to the layout // Code from 07-ins-github-pages
    const chart_2_Layout = {
      title: "Top 10 Bacteria - All Subjects",
      margin: {
        l: 150,
        r: 0,
        t: 100,
        b: 30}
}
    // Render the plot to the div tag with id "bar1" // Code from 07-ins-github-pages
    Plotly.newPlot("bar2", [chart2], chart_2_Layout);



//DRAW A BUBBLE CHART FOR SINGLE ID
function draw_bubble_Chart(subjectID) {
  //data
  x_axis_values = [1];
  y_axis_labels = [1];
  bubble_size = [1];

  // varaibles
  //find the indiviudal data in first index in the array and print to console
  const individualData = subjectSamples.filter(d => d.id == subjectID)[0];
  console.log(individualData);  
 
 /// Siri, I know how I do this (simialar to the aggreate bar chart 2), but I've run out of time, sorry
 
    //define bubble chart // Code from 07-ins-github-pages
    const chart3 = {
      x: x_axis_values,
      y: y_axis_labels,
      mode: 'markers',
      marker: {
        size: bubble_size
        }
      }
    // Apply the group bar mode to the layout // Code from 07-ins-github-pages
    const chart_3_Layout = {
      title: "Count of Bacteria by Family",
      showlegend: false,
      autosize: true,
      margin: {
        l: 500,
        r: 100,
        }};
  // Render the plot to the div tag with id "bubble" // Code from 07-ins-github-pages
  Plotly.newPlot("bubble", [chart3], chart_3_Layout);      
  };
  
  draw_bubble_Chart("940");

//DRAW A TABLE
function draw_table(subjectID){
   //find the indiviudal data in first index in the array 
  const individualData = subjectMetadata.filter(d => d.id == subjectID)[0];
  console.log (individualData);

  //apply to the table htlm
  const tableSelect = d3.select("#sample-metadata");
  tableSelect.html("");
  div = tableSelect.append("div");
  div.append("p").text(`id: ${individualData.id}`);
  div.append("p").text(`ethnicity: ${individualData.ethnicity}`);
  div.append("p").text(`gender: ${individualData.gender}`);
  div.append("p").text(`age: ${individualData.age}`);
  div.append("p").text(`location: ${individualData.location}`);
  div.append("p").text(`wfreq: ${individualData.wfreq}`);
  div.append("p").text(`bbtype: ${individualData.bbtype}`);
///yah, should have done a loop there....

};

draw_table("940");

///LISTENER
/// don't know why I couldn't get the original optionChanged to work, it kept not recognizing
dropdownMenu = d3.select("#selDataset");
d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(){
  subjectID = dropdownMenu.property("value");
  //run function to update charts and tables
  draw_Bar_Chart(subjectID);
  draw_table(subjectID);
  draw_bubble_Chart(subjectID);
};


});


