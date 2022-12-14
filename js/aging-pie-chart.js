export function agingPie(allVintagesArray, typeCounter){

  let agingTypeArray = []
  for (const i of allVintagesArray){
     if (i.AgingType.includes("+") && i.AgingType.includes("/")){
         const splitted = i.AgingType.split(/[+/]/)
         const splittedClean = splitted.filter(x => x !== "sur lie");
         agingTypeArray.push(splittedClean[0]) 
         agingTypeArray.push(splittedClean[1])   
     } else if (i.AgingType.includes("/")){
         const splitted = i.AgingType.split("/")
         const splittedClean = splitted.filter(x => x !== "sur lie");
         agingTypeArray.push(splittedClean[0]) 
         if (splittedClean[1]){
           agingTypeArray.push(splittedClean[1])
         }
     }  else if (i.AgingType.includes("+")){
         const splitted = i.AgingType.split("+")
         const splittedClean = splitted.filter(x => x !== "sur lie");
         agingTypeArray.push(splittedClean[0]) 
       if (splittedClean[1]){
         agingTypeArray.push(splittedClean[1])   
       }
     } else {
       if (i.AgingType !== "sur lie"){
         agingTypeArray.push(i.AgingType)
       }
     }
  }

  var counted = [];
  var result = {};
  agingTypeArray.forEach(type => {// refer to each item in this array with the parameter "answer"
  if(!counted.includes(type)){ // check if answer is not in counted array
      counted.push(type); // add the answer to counted [array]
      result[type] = 1; // add answer to result{object} as a key with a value of 1
  }else if(counted.includes(type)){// here we check if answer is in counted [array]
      result[type] += 1    // now, we just need to increment its value by 1
  }
})


const numOfOak = result["big oak"];

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);


//
//

let agingChartData = [];
for (var key in result) {
    if (key == '-'){
    agingChartData.push({name: key, value: result[key], color: 'lightgray'})
  } else if (key == 'amphora'){
    agingChartData.push({name: key, value: result[key], color: '#FEBD11'})
  } else if (key == 'big oak'){
    agingChartData.push({name: key, value: result[key], color: '#877366'})
  } else if (key == 'concrete'){
    agingChartData.push({name: key, value: result[key], color: 'gray'})
  } else if (key == 'medium oak'){
    agingChartData.push({name: key, value: result[key], color: '#958073'})
  } else if (key == 'oak'){
    agingChartData.push({name: key, value: result[key], color: '#a18e82'})
  } else if (key == 'small oak'){
    agingChartData.push({name: key, value: result[key], color: '#ac9c92'})
  } else if (key == 'steel'){
    agingChartData.push({name: key, value: result[key], color: '#84BAF0'})
  } else if (key == 'drying'){
    agingChartData.push({name: key, value: result[key], color: '#642F45'})
  } else {
    agingChartData.push({name: "unknown", value: result[key], color: 'black'})
  }
};
//agingChartData.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))  
agingChartData.sort((a,b) => b.value - a.value);



var arc = d3.arc().outerRadius(100).innerRadius(0);
var pie = d3.pie().value(function(d) {
return d.value
});
var svg = d3.select(`div[data-tab="${typeCounter}"] .appellation-aging svg`)
.append("g")
.attr("transform", "translate(100,100)")
.attr("class", "pie")  
svg.selectAll(null)
.data(pie(agingChartData))
.enter()
.append("path")
.attr("d", arc)
.style("fill", function(d) {
  return d.data.color
})
.style("stroke", "white")
.style("stroke-width", "0.5px")
//
  const legendContainer =  d3.select(`div[data-tab="${typeCounter}"] .appellation-aging svg`).append("g")
    .attr("class","legend-container")
  
  var legendG = legendContainer.selectAll(".legend")
  .data(pie(agingChartData))
  .enter()
  .append("g")
  .attr("transform", function(d,i){
      return "translate(" + (230) + "," + (i * 22 + 10) + ")";
  })
  .attr("class", "legend");  


    legendG.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill",  function(d) {
  return d.data.color
});
  
          legendG.append("text")
        .text(function(d){ 
            const percent = ((d.data.value * 100)/sumValues(result)).toFixed(0)
          return percent + "% " + d.data.name;
        })
        .style("font-size", 16)
        .style("font-family", "inherit")
        .attr("y", 10)
        .attr("x", 11);

}