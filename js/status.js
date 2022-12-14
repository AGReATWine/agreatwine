export function statusTable() {
  function cssTable(){
    //const allPercent = document.querySelectorAll(".status-table td:nth-child(6)")
    //for (const i of allPercent){
    //  if (i.textContent.includes("100")){
    //    const percentParent = i.parentElement
    //    const allTds = percentParent.querySelectorAll("td")
    //    for (const j of allTds){
    //      j.style.backgroundColor = "#4caf50"
    //      j.style.color = "white"
    //    }
    // }
    //}
    const allPercent = document.querySelectorAll(".summary-table td:nth-child(5)");
    for (const i of allPercent) {
      const percentValue = i.innerText
      if (window.innerWidth < 600) {
        i.setAttribute("width",((percentValue*98.5)/100) + "%")
      } else {
        i.setAttribute("width",((percentValue*90)/100) + "%")
      }
    }
  }
  //Checks
  const tables = document.querySelectorAll(".table-container")
  let tableIndexArray = []
  for (const i of tables){
    const tableIndex = i.getAttribute("tabindex")
    tableIndexArray.push(tableIndex)
  }
  let totalGrand = 0
  for (const i of tableIndexArray){ 
  d3.text(`/csv/status-${i}.csv`).then( function(data) {
     var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
    table = d3.select(`.table-container[tabindex="${i}"] .summary-table`)
        var titles = Object.keys(data[0]);
        var headers = table.append('thead').append('tr')
                    .selectAll('th')
                    .data(allheaders).enter()
                    .append('th')
                    .text(function (d) {
                        return d;
                      })
    var rows = table.append('tbody').selectAll('tr')
                .data(csv).enter()
                .append('tr');
    rows.selectAll('td')
      .data(function (d) {
        return allheaders.map(function (k) {
          return { 'value': d[k], 'name': k};
        });
      }).enter()
      .append('td')
      .attr('data-th', function (d) {
        return d.name;
      })
      .text(function (d) {
        return d.value;
      });
     const totalWines = document.querySelector(`.table-container[tabindex="${i}"] .summary-table tbody tr td[data-th="Wines"]:nth-of-type(3)`)
     //for (const i of totalWinesArray){
       totalGrand += Number(totalWines.innerText)
     //}
     return totalWines
  }).then(function(){
  //start dataTable
    const dataTable = new simpleDatatables.DataTable(`.table-container[tabindex="${i}"] .summary-table`, {
      layout: {
        top: "{search}",
        bottom: "{pager}",
      },
      labels: {
        placeholder: "Filter",
        perPage: "{select} results for page",
        noRows: "No results",
        info: "{start} to {end} of {rows} entries",
      },
    searchable: true,
      perPage: 10,
      columns: [
        { select: [2,3,4], type: "number"},
        { select: 2, type: "number", sort: "desc"}
      ],
      nextPrev: false
    })
    dataTable.on("datatable.sort", function(){
      cssTable()
    })
    dataTable.on("datatable.page", function(){
      cssTable()
    })
    dataTable.on("datatable.search", function(){
      cssTable()
    })
  }).then(function(){
      cssTable()
      document.querySelector(".ev-total").innerText = totalGrand
     })
  }
}
