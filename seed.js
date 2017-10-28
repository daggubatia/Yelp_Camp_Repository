var mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment");
    
    var sampleData = [
            { 
                name: "Leo Carrillo State Beach 054", image: "https://www.campsitephotos.com/photo/camp/7501/Leo_Carrillo_State_Beach_054.jpg", description: "Etiam sit amet porttitor enim. Ut in nibh ut ante aliquet vehicula. Phasellus eleifend ipsum a posuere malesuada. Nulla quis tortor ut tellus sodales ullamcorper eu at erat. Maecenas consequat dolor id dolor vehicula, a fermentum arcu tincidunt. Curabitur ultricies tempus justo. Etiam a sem nec tellus dignissim malesuada."
            },
            {
                name: "El Capitan 001", image: "https://www.campsitephotos.com/photo/camp/7035/El_Capitan_001.jpg", description: "Phasellus libero libero, hendrerit eget diam eu, feugiat pretium elit. Curabitur auctor tristique orci nec tincidunt. Nulla ultricies convallis odio vel iaculis. Aenean tincidunt erat vitae neque tincidunt aliquet. Maecenas ullamcorper eros turpis, tristique ullamcorper sem maximus eu. Morbi porta, velit sit amet vehicula eleifend, libero turpis tincidunt ante, sit amet eleifend dolor quam ac augue. Cras dictum turpis elit, sed tincidunt est convallis nec. Proin a egestas tortor. Integer at eros rhoncus, efficitur diam a, sollicitudin purus."
                
            },
            { 
                name: "Carpinteria State Beach 109", image: "https://www.campsitephotos.com/photo/camp/7178/Carpinteria_State_Beach_109.jpg", description: "Vestibulum eget lacus nec est viverra ultrices. Morbi id scelerisque ante. Sed in efficitur nisl. Duis tempor nulla eget volutpat convallis. Morbi malesuada interdum arcu, non sodales mi tincidunt nec. Fusce eu ex vehicula, cursus velit nec, finibus quam. Mauris non fermentum lectus. Aliquam euismod lacinia turpis, non sodales dui mollis varius. Donec bibendum urna eget justo consequat, et porttitor neque lacinia. Fusce a metus ac urna posuere rutrum. Curabitur id mauris a sem blandit convallis non sit amet quam. Aliquam tincidunt, leo lacinia varius sagittis, ipsum sem consectetur arcu, et bibendum mauris sem et metus."
                
            }
        ];
    
function seedDB() {
    Campground.remove({}, function(err){
      if (err) {
          console.log(err);
      } else {
          console.log("All the existed CGs in the DB are deleted.");
          sampleData.forEach(function(seed){
              Campground.create(seed, function(err, campground){
                  if (err) {
                      console.log(err);
                  } else {
                      Comment.remove({}, function(err){
                          if (err) {
                              console.log(err);
                              console.log("Couldn't able to remove the existed comments");
                          } else {
                              Comment.create({
                                      text: "Beautiful Campgrounds shown by Daggubati Ajayakumar",
                                      author: "Ajay"
                                     }, function(err, comment){
                                              if (err) {
                                                  console.log(err);
                                              } else {
                                                  campground.comments.push(comment);
                                                  campground.save();
                                              }
                                        });
                            }
                      });
                      
                  }
              }); 
          });
           
      }
    });
    // Comment.remove({}, function(err){
    //     if (err){
    //         console.log(err);
    //     }
    // });
}

module.exports = seedDB;