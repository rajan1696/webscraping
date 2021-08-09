let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard"

let request=require("request");

let cheerio=require("cheerio");

request(url,cb);

function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }else if(response.statusCode==404){
        console.log("page not found")
    }
    else
    {
        dataExtracter(html);
    }
}
function dataExtracter(html)
{
    let searchTool=cheerio.load(html);

    let bothInningArr=searchTool(".Collapsiable");
    for(let i=0;i<bothInningArr.length;i++)
    {
        let teamNameElem=searchTool(bothInningArr[i]).find("h5");

        let teamName=teamNameElem.text();

        teamName=teamName.split("INNINGS")[0];

        teamName=teamName.trim();

        console.log(teamName);
         
        let batsManTable=searchTool(bothInningArr[i]).find(".table.batsman tbody tr");

        for(let j=0;j<batsManTable.length;j++)
        {
            let numberofTds=searchTool(batsManTable[i]).find("td");

            if(numberofTds==8)
            {
                let playerName=searchTool(numberofTds[0]).text();

                console.log(playerName);
            }
        }

    }
}