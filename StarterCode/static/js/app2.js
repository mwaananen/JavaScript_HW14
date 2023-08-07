
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let data;
let selector;

function populateDropDownList() {
    let dropDownList = d3.select("#selDataset");

    dropDownList.selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .text(n => n)
        .attr("value", n => n);

}

function optionChanged(sel) {
    console.clear();
    console.log("SEL: ", sel);

    selector = sel;
    console.log("SELECTOR: ", selector);

    console.log("HERE IS SOME DATA:");
    let showData = data.metadata.filter(m => m.id == selector)[0];
    console.log(showData);
    buildchart(selector);

}

function init() {
    d3.json(url).then(d => {

    data = d;
    let names = data.names;
    selector = names[0];

    populateDropDownList();
    buildchart(selector);
    //bubblechart(selector);

    });
}

function buildchart(id) {
    d3.json(url).then(d => {

    let showData = d.samples.filter(m => m.id == id)[0];
    console.log(showData);
    otu_ids = showData.otu_ids
    otu_labels = showData.otu_labels
    sample_values = showData.sample_values

    var barchartdata = [{
        type: 'bar',
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.map(otu => `OTU ${otu}`).slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        orientation: 'h'
    
      }];
      //recycle line 55 to 65
      //change div for each chart
      Plotly.newPlot('bar', barchartdata);
   
    //bubblechart
    var bubbleChartdata = [{
        y: sample_values, //[0, 50, 100, 150, 200],
        x: otu_ids,//[0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,  
            size: sample_values
        }
    
      }];  
        Plotly.newPlot('bubble', bubbleChartdata);




        //Metadata NOT defined error
        let metadata = d.metadata.filter(m => m.id == id)[0];
        let demographicDatainfo = d3.select("#sample-metadata");
        demographicDatainfo.html(
            `id: ${metadata.id} <br>
            ethnicity: ${metadata.ethnicity} <br>
            gender: ${metadata.gender} <br>
            age: ${metadata.age} <br>
            location: ${metadata.location} <br>
            bbtype: ${metadata.bbtype} <br>
            wfreq: ${metadata.wfreq} <br>
            `
        );

    

    
    });
}


init();