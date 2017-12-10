//APIs found @ https://developer.riotgames.com/api-methods/
//RGAPI-81006b95-13c5-4c76-949e-c14c6087dfcb - current API KEY (expires 10th Dec @ 7:42 am Pacific Time - new one to be requested then)
//To query any api it's https://euw1.api.riotgames.com/lol/(api name here) + (input required summoner name or ID etc) + "?api_key" + (api_key variable);

//Authors James Maguire x16114477, Armstrong Bekombo x16114451 and Aidan O'Byrne x16519036

//Code Reference http://Stackoverflow.com for a number of things. Some were used most were discarded.
// However, Line 55 was pulled from an answer to a question here. The rest of the code is my own!



//first function is a query to Summoner API (query by summoner name)


$(document).ready(function(){
  var s_toSearch = document.getElementById("summoner").value;
  var api_key = "key.dat"
  var URL = 'https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + s_toSearch + '?api_key=' + api_key;

$("#summonerSearch").click(function(){
  console.log(URL);
$.ajax({
  type: 'GET',
  url: URL,
  data: { id: 'value'},
  success: function(data){
    var name = data
    var leagues = {};
    var champList = {};
    var URL2 = 'https://euw1.api.riotgames.com/lol/league/v3/leagues/by-summoner/'+ data.id + '?api_key=' + api_key;
    var URL3 = 'http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/' + data.profileIconId + '.png'
    var URL4 = 'https://euw1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' + data.id + '?api_key=' + api_key;

    console.log(URL2);
    console.log(URL3);
    console.log(URL4);



    $("#details").append("<h1>" + data.name + "</h1>");
    $("#profileIMG").append('<img src=' + URL3 + '></img>');

//second query is to the leagues API by summoner ID this is the one I'm having a problem with

    $.ajax({
      type: 'GET',
      url: URL2,
      dataType: 'json',
      leagues: { id: 'value'},
      success: function(leagues){
        $("#rankList").click(function(){


        console.log (data);


              console.log(leagues["0"]);

              $("#leagueBreakDown").append("<br><br><ul><h2><font color='white'>Name:</font><br> " + JSON.stringify(leagues["0"].name + "<br><font color='white'>Tier:</font><br> " + leagues["0"].tier + "<br><font color='white'>Queue:</font><br> " + leagues["0"].queue + "</h2>", null));
      });
    }

  });

  //this was a third Query to add in the champion pool of the summoner, but the api's involved in pulling this data are far too vast.

      // $.ajax({
      //   type: 'GET',
      //   url: URL4,
      //   dataType: 'json',
      //   champList: {id: 'value'},
      //   success: function(champList){
      // $("#champs").click(function(){
      //   console.log("I've been clicked");
      //
      //       $("#champions").append("<ul>" + JSON.stringify(champList["0"].championId + " " + champList["0"].championLevel, null));
      //
      //     });
      //   }
      // });

}
    });
  });
});
