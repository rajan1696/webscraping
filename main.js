let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595"

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

    let anchorrep=searchTool('a[data-hover="View All Results"]')

    let link=anchorrep.attr("href");

    let fullmatchPageLink=`https://www.espncricinfo.com${link}`

    console.log("match url="+fullmatchPageLink);

    request(fullmatchPageLink,allMatchPagecb);
}

function allMatchPagecb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }else if(response.statusCode==404)
    {
        console.log("page not found")
    }
    else{
       // console.log(html);

        getAllscorecardLink(html);
    }
}

function getAllscorecardLink(html){

    let cheerio$=cheerio.load(html);
    let allScorecardsArr= cheerio$("a[data-hover='Scorecard']");

    for(let i=0;i<allScorecardsArr.length;i++)
    {
        let link=cheerio$(allScorecardsArr[i]).attr("href");

        let fullmatchPageLink=`https://www.espncricinfo.com${link}`

        console.log(fullmatchPageLink)
    }
}