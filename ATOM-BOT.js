//Initializing variables
var colorize = require('./colorize');
var cconsole = colorize.console;
var Bot = require('ttapi');
var AUTH = 'xxxx'; //AUTHORIZATION
var USERID = 'xxxx'; //USERID
var ROOMID = '50df8cb6eb35c1070b43cd9b'; //ROOMID
var USERNAME2 = "#blue[P0SIXNINJA]"; //BOTS USERNAME
var ROOMNAME = "Mix N' Match Anything Goes,"; //ROOM NAME 
var SPEAKVALUE = 0; //prototype dontfuckwith 
var VALUEOFONE = 1;
var SERVERUPTIME = 0;

var bot = new Bot(AUTH, USERID, ROOMID);
bot.debug = false;
cconsole.log('Turntable Bot Logged In: ' + USERNAME2 + ' Into the Room ' + ROOMNAME);
  

// Existing User Leaves the room
bot.on('deregistered', function (data) 
{ var user = data.user[0]; 
bot.speak('User: ' + user.name + 'Has Left Mix n Match, Anything Goes'); //EDIT THIS TO YOUR NEEDS
cconsole.log('#magenta[-1:]' + user.name + ': Has Left The Room ' + [ROOMNAME])
});

// New user enters the room
bot.on('registered', function (data) 
{ var user = data.user[0]; 
bot.speak('Welcome to ' + ROOMNAME + ' ' + user.name); 
cconsole.log('#green[+1:]' + user.name + ': Has Entered The Room ' + [ROOMNAME])
});


//When New Text Is Spoken into the Console
bot.on('speak', function (data) 
{  
cconsole.log('#purple[*: ]' + data.name + ' Said: ' + data.text)
});

//Server Commons Message
 setInterval(function() { 
	bot.speak('WELECOME TO MIX N MATCH <3');  //EDIT TO YOUR NEEDS
    cconsole.log('#blue[Welcome Message Announced]');
 }, 5*60*1000);
 
   //Determining how many minutes the server has been active.
   setInterval(function() {
   SERVERUPTIME = SERVERUPTIME + VALUEOFONE
   //Outputting the server uptime to the console
  cconsole.log('#magenta[Server Has Been Up For: ' + SERVERUPTIME + ' Minutes.]' );
   }, 60*1000);
   
    //Speaking to the turntable croud how long the bot and server has been active for, and alerting the console in red lettering that the croud has been notified
   setInterval(function() {
   bot.speak('This Turntable Bot And Server Has Been Running For: ' + SERVERUPTIME + ' Minutes');
   cconsole.log('#pink[Server Uptime Has Been Announced To The Croud At This Time]');
   }, 10*60*1000);
   
  


// endsong event function 
bot.on('endsong', function(data) {
  ups = data.room.metadata.upvotes;
  downs = data.room.metadata.downvotes;
  bot.speak('Up-votes: ' + ups + ', Down-votes: ' + downs);
});

   //newsong event function
   bot.on('newsong', function (data) { 
  var SPEAKVALUE = 0;
  var currentdj = data.room.metadata.current_dj;
  var song = data.room.metadata.current_song.metadata.song;
  var artist = data.room.metadata.current_song.metadata.artist;
  var album = data.room.metadata.current_song.metadata.album;
  var length = data.room.metadata.current_song.metadata.length;
  var song_id = data.room.metadata.current_song._id;
  var user = data.user;


  cconsole.log("[ NEW SONG ] : Started playing: "+song+" by "+artist+" "+length);
  });



       //Bot Bops The Song Up
  bot.on('update_votes', function(data) {
  ups = data.room.metadata.upvotes;
  console.log('votes updated : ' + ups);  
  if (ups == 2) {
    bot.bop();
  }
  });
  
  
  
bot.on('speak', function (data) {
   // Get the data
   var name = data.name;
   var text = data.text;
   
        // Respond to "/hello" command
   if (text.match(/^\/stepupbot$/)) {
      bot.addDj();
	  bot.speak('Im Stepping Up To Be DJ!');
	  cconsole.log('#blue[BOTNAME Is Stepping Up To Be DJ]'); //EDIT BOTNAME TO YOUR NEEDS
   
}
      if (text.match(/^\/botvoteup$/)) {
      bot.bop();
	  bot.speak('Voting Song Up!');

   }
   if (text.match(/^\/stepdownbot$/)) {
      bot.remDj();
	  bot.speak('Im Stepping Down From Being DJ!');
	  cconsole.log('#blue[BOTNAME Is Stepping Down From DJ position]'); //EDIT BOTNAME TO YOUR NEEDS
   }
	 


});

   